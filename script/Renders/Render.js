
// Info header
var infoHeader = document.getElementsByClassName('char-info')[0];

/**
 * Cria um cabeçalho com título e input de texto.
 * @param {string} title Título da seção do cabeçalho.
 * @param {any} changeFunction Função aplicado a mudança do input.
 * @param {any} value Valor inicial do item.
**/
function makeInfoHeader(title, changeFunction, value) {
    let titleHeader = document.createElement('div');
    titleHeader.className = 'char-info-item';
    let titleSpan = document.createElement('span');
    titleSpan.className = 'info-header';
    titleSpan.innerHTML = `${title}:`;
    let inputItem = document.createElement('input');
    inputItem.type = 'text';
    inputItem.className = "header-input";
    inputItem.value = value;
    inputItem.onchange = (e) => changeFunction(e.target.value);
    titleHeader.appendChild(titleSpan);
    titleHeader.appendChild(inputItem);
    
    return titleHeader;
}

/**
 * Cria um cabeçalho com título e um select..
 * @param {string} title Título da seção do cabeçalho.
 * @param {any} changeFunction Função aplicado a mudança do input.
 * @param {any} value Valor inicial do item.
 * @param  {...string} options As opções no select.
 */
function makeInfoHeaderSelect(title, changeFunction, value, ...options) {
    let optionElement;
    
    let titleHeader = document.createElement('div');
    titleHeader.className = 'char-info-item';
    let titleSpan = document.createElement('span');
    titleSpan.className = 'info-header';
    titleSpan.innerHTML = `${title}:`;
    let selectItem = document.createElement('select');
    selectItem.className = "header-input";
    selectItem.value = value;
    
    let selectInHeader = document.createElement('option');
    selectInHeader.value = '';
    selectInHeader.innerHTML = `Selecione o ${title}`;
    selectInHeader.disabled = true;
    selectInHeader.selected = (value === "") ? true : false;
    selectInHeader.hidden = true;
    
    selectItem.appendChild(selectInHeader);
    
    for(let i = 0; i < options.length; i++) {
        optionElement = document.createElement('option');
        optionElement.innerHTML = options[i];
        optionElement.value = options[i];
        selectItem.appendChild(optionElement);
    }
    selectItem.onchange = (e) => changeFunction(e.target.value);
    
    titleHeader.appendChild(titleSpan);
    titleHeader.appendChild(selectItem);
    
    return titleHeader;
}

function makeInfoNumber(title, changeFunction, value) {
    let titleHeader = document.createElement('div');
    titleHeader.className = 'char-info-item';
    let titleSpan = document.createElement('span');
    titleSpan.className = 'info-header';
    titleSpan.innerHTML = `${title}:`;
    let inputItem = document.createElement('input');
    inputItem.type = 'number';
    inputItem.className = "header-input";
    inputItem.value = value;
    inputItem.onchange = (e) => changeFunction(e.target.value);
    titleHeader.appendChild(titleSpan);
    titleHeader.appendChild(inputItem);
    
    return titleHeader;
}

/**
* Renderiza seção de informações do personagem.
* @param {Character} character Personagem
**/
function renderHeader(character) {
    let supTemplate = character.template;

    infoHeader.innerHTML = '';
    
    // Nome
    let nameHeader = makeInfoHeader('Nome', changeName, character.name);
    nameHeader.id = 'char-name';
    infoHeader.appendChild(nameHeader);
    
    // Jogador
    let playerHeader = makeInfoHeader('Jogador', changePlayer, character.player);
    playerHeader.id = 'char-player';
    infoHeader.appendChild(playerHeader);
    
    // Crônica
    let chronicleHeader = makeInfoHeader('Crônica', changeChronicle, character.chronicle);
    chronicleHeader.id = 'char-chronicle';
    infoHeader.appendChild(chronicleHeader);
    
    // Conceito
    let conceptHeader = makeInfoHeader('Conceito', changeConcept, character.concept);
    conceptHeader.id = 'char-concept';
    infoHeader.appendChild(conceptHeader);
    
    switch(supTemplate) {
        /**
        * Mudei a ordem para manter o padrão.
        * Mortal:
        *  Nome    - Virtude   - Idade
        *  Jogador - Vício     - Facção
        *  Crônica - Conceito  - Nome do Grupo
        **/
        case SupernaturalTemplates.Mortal:
            // Virtude
            let virtueHeader = makeInfoHeader('Virtude', changeVirtue, character.templateTraits.virtue);
            virtueHeader.className += ' char-trait1';
            infoHeader.appendChild(virtueHeader);
            
            // Idade
            let ageHeader = makeInfoNumber('Idade', changeAge, character.templateTraits.age);
            ageHeader.className += ' char-type1';
            infoHeader.appendChild(ageHeader);
            
            // Vício
            let viceHeader = makeInfoHeader('Vício', changeVice, character.templateTraits.vice);
            viceHeader.className += ' char-trait2';
            infoHeader.appendChild(viceHeader);

            // Facção
            let factionHeader = makeInfoHeader('Facção', changeFaction, character.templateTraits.faction);
            factionHeader.className += ' char-type2';
            infoHeader.appendChild(factionHeader);
            
            // Grupo
            let groupHeader = makeInfoHeader('Grupo', changeGroup, character.group);
            groupHeader.className += ' char-trait3';
            infoHeader.appendChild(groupHeader);
        break;
        
        /**
        * Vampiro:
        *  Nome    - Máscara   - Clã
        *  Jogador - Lamento   - Linhagem
        *  Crônica - Conceito  - Coalizão
        **/
        case SupernaturalTemplates.Vampire:
            // Máscara
            let maskHeader = makeInfoHeader('Máscara', changeMask, character.templateTraits.mask);
            maskHeader.className += ' char-trait1';
            infoHeader.appendChild(maskHeader);
            
            // Clã
            let clanHeader = makeInfoHeaderSelect('Clã', changeClan, character.templateTraits.clan, ...clanOptions);
            clanHeader.className += ' char-type1';
            clanHeader.id = 'clan-selection';
            clanHeader.className += (character.templateTraits.clan.length === 0) ? ' invalid-cell' : '';
            infoHeader.appendChild(clanHeader);
            
            // Lamento
            let dirge = makeInfoHeader('Lamento', changeDirge, character.templateTraits.dirge);
            dirge.className += ' char-trait2';
            infoHeader.appendChild(dirge);
            
            // Linhagem
            let bloodLine = makeInfoHeader('Linhagem', changeBloodline, character.templateTraits.bloodline);
            bloodLine.className += ' char-type2';
            infoHeader.appendChild(bloodLine);
            
            // Coalizão
            let covenantHeader = makeInfoHeader('Coalizão', changeCovenant, character.templateTraits.covenant);
            covenantHeader.className += ' char-trait3';
            infoHeader.appendChild(covenantHeader);
            
            renderVampireTraits(character);
        break;
        
        /**
        * Lobisomem:
        *  Nome    - Sangue    - Auspício
        *  Jogador - Osso      - Tribo
        *  Crônica - Conceito  - Casa
        **/
        case SupernaturalTemplates.Werewolf:
        break;
        
        /**
        * Mago:
        *  Nome    - Virtude   - Senda
        *  Jogador - Vício     - Ordem
        *  Crônica - Conceito  - Legado
        **/
        case SupernaturalTemplates.Mage:
        break;
        
        /** 
        * Promethean:
        *  Nome    - Elpis     - Estirpe
        *  Jogador - Tormento  - Refinamento
        *  Crônica - Conceito  - Função
        **/
        case SupernaturalTemplates.Promethean:
        break;
        
        /**
        * Changeling:
        *   Nome    - Agulha    - Feição
        *   Jogador - Linha     - Fratria
        *   Crônica - Conceito  - Corte
        **/
        case SupernaturalTemplates.Changeling:
        break;
        
        /**
        * Hunter:
        *  Nome    - Virtude   - Célula
        *  Jogador - Vício     - Compact (Ver tradução)
        *  Crônica - Conceito  - Conspiração
        **/
        case SupernaturalTemplates.Hunter:
        break;
        
        /**
        * Geist:
        *  Nome    - Raiz      - Arquétipo
        *  Geist   - Flor      - Fardo
        *  Crônica - Conceito  - Grêmio
        **/
        case SupernaturalTemplates.Geist:
        break;
        
        /**
        * Múmia:
        *  Nome    - Guilda        - Decreto
        *  Jogador - Equilíbrio    - Fardo
        *  Crônica - Conceito      - Meret
        **/
        case SupernaturalTemplates.Mummy:
        break;
        
        /**
        * Demônio:
        *  Nome    - Virtude   - Encarnação
        *  Idade   - Vício     - Agenda
        *  Jogador - Conceito  - Catalizador
        **/
        case SupernaturalTemplates.Demon:
        break;
        
        /**
        * Fera:
        *  Nome    - Lenda     - Família
        *  Idade   - Vida      - Fome
        *  Jogador - Conceito  - Horror
        **/
        case SupernaturalTemplates.Beast:
        break;
        
        /**
        * Desviante:
        *  Nome    - Convicção - Origem
        *  Idade   - Lealdade  - Clado
        *  Jogador - Conceito  - Ameaça
        **/
        case SupernaturalTemplates.Deviant:
        break;
        
    }
    
}

function renderAttributes(character) {
    let mentalBlock = document.getElementById('mental-attr');
    let physicalBlock = document.getElementById('physical-attr');
    let socialBlock = document.getElementById('social-attr');
    
    // Limpa os blocos
    mentalBlock.innerHTML = '';
    physicalBlock.innerHTML = '';
    socialBlock.innerHTML = '';
    
    let mentalAttr = character.mentalAttributes;
    let physicalAttr = character.physicalAttributes;
    let socialAttr = character.socialAttributes;

    let attributes = [mentalAttr, physicalAttr, socialAttr];
    let blockSection = [mentalBlock, physicalBlock, socialBlock];
    
    let attrTitle, attrBlock, attrRadio;
    
    // Cada seção de atributos
    for(let x = 0; x < attributes.length; x++) {
        // Cada atributo na seção
        for(let i = 0; i < attributes[x].length; i++) {
            attrTitle = document.createElement('span');
            attrTitle.innerHTML = attributes[x][i].name;
            blockSection[x].appendChild(attrTitle);
            attrBlock = document.createElement('div');
            attrBlock.className = 'attr-ranks';
            // Cada rank do Atributo
            for(let j = 0; j < 5; j++) {
                attrRadio = document.createElement('input');
                attrRadio.type = 'radio';
                attrRadio.className = `rank-${attributes[x][i].class}`;
                if(j === 0) attrRadio.checked = true;
                attrBlock.appendChild(attrRadio);
            }
            // Adiciona ao div de cada seção
            blockSection[x].appendChild(attrBlock);
            setAttrRank(attributes[x][i].rank, attributes[x][i].class);
        }
    }
}

function renderSkills(character) {
    let mentalBlock = document.getElementById('mental-skills');
    let physicalBlock = document.getElementById('physical-skills');
    let socialBlock = document.getElementById('social-skills');
    
    // Limpa os blocos
    mentalBlock.innerHTML = '';
    physicalBlock.innerHTML = '';
    socialBlock.innerHTML = '';
    
    let mentalSkills = character.mentalSkills;
    let physicalSkills = character.physicalSkills;
    let socialSkills = character.socialSkills;

    let skills = [mentalSkills, physicalSkills, socialSkills];
    let blockSection = [mentalBlock, physicalBlock, socialBlock];
    
    let skillTitle, skillBlock, skillRadio;
    
    // Cada seção de atributos
    for(let x = 0; x < skills.length; x++) {
        // Cada atributo na seção
        for(let i = 0; i < skills[x].length; i++) {
            skillTitle = document.createElement('span');
            skillTitle.innerHTML = skills[x][i].name;
            blockSection[x].appendChild(skillTitle);
            skillBlock = document.createElement('div');
            skillBlock.className = 'attr-ranks';
            // Cada rank do Atributo
            for(let j = 0; j < 5; j++) {
                skillRadio = document.createElement('input');
                skillRadio.type = 'radio';
                skillRadio.className = `rank-${skills[x][i].class}`;
                skillBlock.appendChild(skillRadio);
            }
            // Adiciona ao div de cada seção
            blockSection[x].appendChild(skillBlock);
            setSkillRank(skills[x][i].rank, skills[x][i].class);
        }
    }
}

/**
 * Renderiza a Característica com pontuação.
 * @param {Merit} trait Característica com pontuação a ser renderizada.
**/
function createTraitBlock(trait, idPath) {
    if(!trait) throw new Error("Vantagem não encaminhada.")
    let traitElement = document.createElement('div');
    traitElement.id = trait.id;
    traitElement.className = 'merit-block';

    // Encaixar o Evidente se for Deviant
    if(globalChar.template === SupernaturalTemplates.Deviant) {
        let overCheckbox = document.createElement('input');
        overCheckbox.type = 'checkbox';
        overCheckbox.checked = trait.overt;
        overCheckbox.addEventListener('change', () => {} /** checkOvertAdv(id) */);
        traitElement.appendChild(overCheckbox);
    }
    else {
        // Append um div vazio para encaixar a conta no CSS
        traitElement.appendChild(document.createElement('div'));
    }

    // Campo nome de Vantagem
    let meritNameInput = document.createElement('input');
    meritNameInput.value = trait.name;
    meritNameInput.placeholder = 'Digite nome da Vantagem...';
    meritNameInput.addEventListener('blur', (event) => changeMeritName(trait.id, event.target.value));

    // Campo círculos inputs
    let meritRanksElement = document.createElement('div');
    let meritRankRadio;
    for(let i = 0; i < 5; i++) {
        meritRankRadio = document.createElement('input');
        meritRankRadio.type = 'radio';
        meritRankRadio.className = `merit-rank-${trait.id}`;
        meritRankRadio.addEventListener('click', () => changeTraitRank(trait.id, i+1));
        if(i === 0) meritRankRadio.checked = true;
        meritRanksElement.appendChild(meritRankRadio);
    }
    
    // Botão de deleção
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'X';
    delBtn.addEventListener('click', () => removeMerit(trait.id));
    
    // Descrição
    let descriptionElement = document.createElement('textarea');
    descriptionElement.value = trait.description;
    descriptionElement.className = 'gridC_span4';
    descriptionElement.placeholder = "Adicione descrição e informações da sua vantagem."
    descriptionElement.addEventListener('blur', () => changeMeritDescription(trait.id, event.target.value));
    
    // Append.    
    traitElement.appendChild(meritNameInput);
    traitElement.appendChild(meritRanksElement);
    traitElement.appendChild(delBtn);
    traitElement.appendChild(descriptionElement);
    
    let pathBlock = document.getElementById(idPath);
    if(!pathBlock) throw new Error('Caminho para adição da Característica inválido. Encontrado '+idPath);
    
    pathBlock.appendChild(traitElement);
 
    changeTraitRank(trait.id, trait.rank);
}

/**
 * Faz chamada para renderizar as Vantagens do personagem.
 * @param {Character} character Personagem a ser coletado as vantagens.
**/
function renderMerits(character) {
    document.getElementById('cofd-character-merits').innerHTML = '';
    character.merits.forEach(merit => { createTraitBlock(merit, 'cofd-character-merits'); });
}

/**
 * Faz o render da Vitalidade.
 * @param {Character} character Personagem.
**/
function renderHealth(character) {
    let healthElement = document.getElementById('char-health');
    healthElement.innerHTML = '';
    
    let healthBlock;
    let health = character.healthPoints;

    for(let i = 0; i < health; i++) {
        healthBlock = document.createElement('img');
        healthBlock.id = `health-block-${i}`;
        switch(character.health[i].state) {
            default:
            case 0: healthBlock.src = 'assets/health/empty-square-icon.png'; break;
            case 1: healthBlock.src = 'assets/health/bar-square-icon.png'; break;
            case 2: healthBlock.src = 'assets/health/x-square-icon.png'; break;
            case 3: healthBlock.src = 'assets/health/asterisk-square-icon.png'; break;
        }
        healthBlock.alt = 'Vitalidade';
        healthBlock.className = 'health-block';
        healthBlock.addEventListener('click', () => changeHealthState(i));
        healthElement.appendChild(healthBlock);
    }
}

/**
 * Renderiza Força de Vontade.
 * @param {Character} character Personagem com Força de Vontade.
**/
function renderWillpower(character) {
    let willpowerElement = document.getElementById('char-willpower');
    willpowerElement.innerHTML = '';
    
    let willpowerBlock;

    for(let i = 0; i < character.willpowerPoints; i++) {
        willpowerBlock = document.createElement('input');
        willpowerBlock.type = "checkbox";
        willpowerBlock.id = `willpower-block-${i}`;
        if(character.willpower[i].state) willpowerBlock.checked = true;
        else willpowerBlock.checked = false;
        willpowerBlock.alt = 'Força de Vontade';
        willpowerBlock.className = 'willpower-block';
        willpowerBlock.addEventListener('change', () => changeWillpowerState(i));
        willpowerElement.appendChild(willpowerBlock);
    }
}

/**
 * 
 * @param {Character} character 
**/
function renderDefense(character) {
    let defense = character.defense;
    let defenseBlock = document.getElementById('char-defense');
    defenseBlock.innerHTML = defense;
}

/**
 * 
 * @param {Character} character 
**/
function renderInitiative(character) {
    let initiative = character.initiative;
    let initiativeBlock = document.getElementById('char-initiative');
    initiativeBlock.innerHTML = initiative;
}

/**
 * 
 * @param {Character} character 
**/
function renderSpeed(character) {
    let speed = character.speed;
    let speedBlock = document.getElementById('char-speed');
    speedBlock.innerHTML = speed;
}

/**
 * Renderização de itens complementares, como Tamanho, Vitalidade,
 * Força de Vontade, etc.
 * @param {Character} character 
**/
function renderTraits(character) {
    let sizeInput = document.getElementById('char-size');
    sizeInput.value = character.size;

    renderHealth(character);
    renderWillpower(character);
    renderDefense(character);
    renderInitiative(character);
    renderSpeed(character);
}

function renderCharacter(character) {
    // Set Template
    let supernaturalTemp = document.getElementById('supernatural-selection');
    supernaturalTemp.value = character.template;
    renderHeader(character)
    renderAttributes(character);
    renderSkills(character);
    renderMerits(character);
    renderTraits(character);
}

function loadNewCharacter() {
    renderCharacter(globalChar);
    addSheetListeners(globalChar);
}
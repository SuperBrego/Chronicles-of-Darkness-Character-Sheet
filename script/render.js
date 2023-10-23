
// Info header
var infoHeader = document.getElementsByClassName('char-info')[0];

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
    
    selectItem.appendChild(selectInHeader);

    for(let i = 0; i < options.length; i++) {
        optionElement = document.createElement('option');
        optionElement.innerHTML = options[i];
        optionElement.value = i;
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
* @param {Character} character Personagem
**/
function renderHeader(character) {
    let supTemplate = character.template;
    
    // Nome
    let nameHeader = makeInfoHeader('Nome', changeName, character.name);
    
    // Jogador
    let playerHeader = makeInfoHeader('Jogador', changePlayer, character.player);
    
    // Crônica
    let chronicleHeader = makeInfoHeader('Crônica', changeChronicle, character.chronicle);
    
    // Conceito
    let conceptHeader = makeInfoHeader('Conceito', changeConcept, character.concept);
    
    console.log(`E o template agora é: ${supTemplate}`)
    
    switch(supTemplate) {
        /**
        * Mudei a ordem para manter o padrão.
        * Mortal:
        *  Nome    - Virtude   - Idade
        *  Jogador - Vício     - Facção
        *  Crônica - Conceito  - Nome do Grupo
        **/
        case SupernaturalTemp.Mortal:
            // Nome
            infoHeader.appendChild(nameHeader);
            // Virtude
            let virtueHeader = makeInfoHeader('Virtude', changeVirtue, character.templateInfo.virtue);
            infoHeader.appendChild(virtueHeader);
            // Idade
            let ageHeader = makeInfoNumber('Idade', changeAge, character.templateInfo.age);
            infoHeader.appendChild(ageHeader);
            
            // Jogador
            infoHeader.appendChild(playerHeader);
            // Vício
            let viceHeader = makeInfoHeader('Vício', changeVice, character.templateInfo.vice);
            infoHeader.appendChild(viceHeader);
            // Facção
            let factionHeader = makeInfoHeader('Facção', changeVice, character.templateInfo.faction);
            infoHeader.appendChild(factionHeader);
            
            // Crônica
            infoHeader.appendChild(chronicleHeader);
            // Conceito 
            infoHeader.appendChild(conceptHeader);
            // Grupo
            let groupHeader = makeInfoHeader('Grupo', changeVice, character.templateInfo.group);
            infoHeader.appendChild(groupHeader);
        
        break;
        
        /**
        * Vampiro:
        *  Nome    - Máscara   - Clã
        *  Jogador - Lamento   - Linhagem
        *  Crônica - Conceito  - Coalizão
        **/
        case SupernaturalTemp.Vampire:
            // Nome
            infoHeader.appendChild(nameHeader);
            // Máscara
            let maskHeader = makeInfoHeader('Máscara', changeMask, character.templateInfo.mask);
            infoHeader.appendChild(maskHeader);
            // Clã
            let clanHeader = makeInfoHeaderSelect('Clã', changeClan, character.templateInfo.clan, ...clanOptions);
            infoHeader.appendChild(clanHeader);
            
            // Jogador
            infoHeader.appendChild(playerHeader);
            // Lamento
            let dirge = makeInfoHeader('Lamento', changeDirge, character.templateInfo.dirge);
            infoHeader.appendChild(dirge);
            // Linhagem
            let bloodLine = makeInfoHeader('Linhagem', changeBloodline, character.templateInfo.bloodline);
            infoHeader.appendChild(bloodLine);
            
            // Crônica
            infoHeader.appendChild(chronicleHeader);
            // Conceito 
            infoHeader.appendChild(conceptHeader);
            // Coalizão
            let covenantHeader = makeInfoHeader('Coalizão', changeCovenant, character.templateInfo.covenant);
            infoHeader.appendChild(covenantHeader);
        break;
        
        /**
        * Lobisomem:
        *  Nome    - Sangue    - Auspício
        *  Jogador - Osso      - Tribo
        *  Crônica - Conceito  - Casa
        **/
        case SupernaturalTemp.Werewolf:
        break;
        
        /**
        * Mago:
        *  Nome    - Virtude   - Senda
        *  Jogador - Vício     - Ordem
        *  Crônica - Conceito  - Legado
        **/
        case SupernaturalTemp.Mage:
        break;
        
        /** 
        * Promethean:
        *  Nome    - Elpis     - Estirpe
        *  Jogador - Tormento  - Refinamento
        *  Crônica - Conceito  - Função
        **/
        case SupernaturalTemp.Promethean:
        break;
        
        /**
        * Changeling:
        *   Nome    - Agulha    - Feição
        *   Jogador - Linha     - Fratria
        *   Crônica - Conceito  - Corte
        **/
        case SupernaturalTemp.Changeling:
        break;
        
        /**
        * Hunter:
        *  Nome    - Virtude   - Célula
        *  Jogador - Vício     - Compact (Ver tradução)
        *  Crônica - Conceito  - Conspiração
        **/
        case SupernaturalTemp.Hunter:
        break;
        
        /**
        * Geist:
        *  Nome    - Raiz      - Arquétipo
        *  Geist   - Flor      - Fardo
        *  Crônica - Conceito  - Grêmio
        **/
        case SupernaturalTemp.Geist:
        break;
        
        /**
        * Múmia:
        *  Nome    - Guilda        - Decreto
        *  Jogador - Equilíbrio    - Fardo
        *  Crônica - Conceito      - Meret
        **/
        case SupernaturalTemp.Mummy:
        break;
        
        /**
        * Demônio:
        *  Nome    - Virtude   - Encarnação
        *  Idade   - Vício     - Agenda
        *  Jogador - Conceito  - Catalizador
        **/
        case SupernaturalTemp.Demon:
        break;
        
        /**
        * Fera:
        *  Nome    - Lenda     - Família
        *  Idade   - Vida      - Fome
        *  Jogador - Conceito  - Horror
        **/
        case SupernaturalTemp.Beast:
        break;
        
        /**
        * Desviante:
        *  Nome    - Convicção - Origem
        *  Idade   - Lealdade  - Clado
        *  Jogador - Conceito  - Ameaça
        **/
        case SupernaturalTemp.Deviant:
        break;
        
    }
    
}

function renderCharacter() {
    renderHeader(character)
}
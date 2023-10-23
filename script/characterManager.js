const character = new Character();

const templatesPile = [];

function changeTemplate(event) {
    var oldTemplateInfo;
    let tempIndex = Number(event.value)

    switch(tempIndex) {
        // Mortal
        case SupernaturalTemp.Mortal:
            character.template = SupernaturalTemp.Mortal;
            oldTemplateInfo = character.templateInfo;
            character.templateInfo = getTemplateInfo(tempIndex);
            infoHeader.innerHTML = '';
            renderHeader(character);
        break;
        // Vampire
        case SupernaturalTemp.Vampire:
            character.template = SupernaturalTemp.Vampire;
            oldTemplateInfo = character.templateInfo;
            character.templateInfo = getTemplateInfo(tempIndex);
            infoHeader.innerHTML = '';
            renderHeader(character);
        break;
        // Ghoul
        case SupernaturalTemp.Ghoul:

        break;
        // Werewolf
        case SupernaturalTemp.Werewolf:

        break;
        // Changeling
        case SupernaturalTemp.Changeling:

        break;
        // Mage
        case SupernaturalTemp.Mage:

        break;
        // Promethean
        case SupernaturalTemp.Promethean:

        break;
        // Hunter
        case SupernaturalTemp.Hunter:

        break;
        // Geist
        case SupernaturalTemp.Geist:

        break;
        // Mummy
        case SupernaturalTemp.Mummy:

        break;
        // Demon
        case SupernaturalTemp.Demon:

        break;
        // Beast
        case SupernaturalTemp.Beast:

        break;
        // Deviant
        case SupernaturalTemp.Deviant:

        break;
    }
}

/**
 * Troca o nome do personagem.
 * @param {string} charName Novo nome de personagem.
**/
function changeName(charName) { character.name = charName; }

/**
 * Troca o nome do jogador.
 * @param {string} playerName Novo nome do jogador.
**/
function changePlayer(playerName) { character.player = playerName; }
function changeChronicle(chronicleName) { character.chronicle = chronicleName; }
function changeConcept(conceptName) { character.concept = conceptName; }
function changeGroup(groupName) { character.group = groupName; }

// **********************************
// * Mortal
// **********************************
function changeAge(age) { character.templateInfo.age = Number(age); }
function changeFaction(factionName) { character.templateInfo.factionName = factionName; }

// **********************************
// * Mortal, Caçador, Demônio, Mago
// **********************************
function changeVirtue(virtueName) { character.templateInfo.virtue = virtueName; }
function changeVice(viceName) { character.templateInfo.vice = viceName; }

// **************************
// * Vampiro
// **************************
function changeClan(clanName) { character.templateInfo.clan = clanName; }
function changeMask(maskName) { character.templateInfo.mask = maskName; }
function changeDirge(dirgeName) { character.templateInfo.dirge = dirgeName; }
function changeBloodline(bloodlineName) { character.templateInfo.bloodline = bloodlineName; }
function changeCovenant(covenantName) { character.templateInfo.covenant = covenantName; }

/**
 * Altera o valor do Atributo.
 * @param {number} type Tipo de Atributo.
 * @param {number} index Index do Atributo.
 * @param {number} rank Novo valor para o Atributo.
 */
function setCharAttrRank(type, index, rank) {
    let attribute = undefined;
    index = Number(index);

    switch(type) {
        default:
        case 0: 
            attribute = character.mentalAttributes[index];
            if(!attribute) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
        case 1: 
            attribute = character.physicalAttributes[index];
            if(!attribute) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
        case 2: 
            attribute = character.socialAttributes[index];
            if(!attribute) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
    }
}

/**
 * Realiza a marcação dos inputs radio conforme o novo valor de graduação.
 * @param {number} rank Graduação nova do Atributo.
 * @param {string} attr Atributo (Classe do Atributo em inglês) qual deve ser marcado os círculos.
 */
function setAttrRank(rank, attr) {
    // let rankList = document.querySelectorAll(`.rank-${attr}`);
    let rankList = document.getElementsByClassName(`rank-${attr}`);
    for(let i = 0; i < rankList.length; i++) {
        if(i < rank) rankList[i].checked = true;
        else rankList[i].checked = false;
    }
}

/**
 * Altera o valor de graduação da Habilidade.
**/
function setCharSkillRank(type, index, rank) {
    let skill = undefined;
    let firstRank;

    switch(type) {
        case 0: 
            skill = character.mentalSkills[index];
            if(!skill) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            if(rank === 1 && skill.rank === 1) {
                skill.rank = 0;
                firstRank = document.querySelector(`.rank-${skill.class}`);
                firstRank.checked = false;
            }
            else {
                skill.rank = rank;
                setSkillRank(rank, skill.class);
            }
        break;
        case 1: 
            skill = character.physicalSkills[index];
            if(!skill) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            if(rank === 1 && skill.rank === 1) {
                skill.rank = 0;
                firstRank = document.querySelector(`.rank-${skill.class}`);
                firstRank.checked = false;
            }
            else {
                skill.rank = rank;
                setSkillRank(rank, skill.class);
            }
        break;
        case 2: 
            skill = character.socialSkills[index];
            if(!skill) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            if(rank === 1 && skill.rank === 1) {
                skill.rank = 0;
                firstRank = document.querySelector(`.rank-${skill.class}`);
                firstRank.checked = false;
            }
            else {
                skill.rank = rank;
                setSkillRank(rank, skill.class);
            }
        break;
    }
}

/**
 * Realiza a marcação dos inputs radio conforme o novo valor de graduação.
 * @param {number} rank Graduação nova da Habilidade.
 * @param {string} attr Habilidade (Classe da Habilidade em inglês) qual deve ser marcado os círculos.
**/
function setSkillRank(rank, attr) {
    let rankList = document.querySelectorAll(`.rank-${attr}`);
    for(let i = 0; i < rankList.length; i++) {
        if(i < rank) rankList[i].checked = true;
        else rankList[i].checked = false;
    }
}

// ****************************************************
// Vantagens
// ****************************************************
let meritBlock = document.getElementById('cofd-character-merits');

/**
 * Adiciona uma nova vantagem para o Personagem.
**/
function addAdvantage() {
    let advantage = { 
        id: idSeed(), 
        name: 'Digite nome da Vantagem...', 
        rank: 1, 
        description: '',
        overt: false,
    };
    character.merits.push(advantage);

    let advElement = document.createElement('div');
    advElement.id = advantage.id;
    advElement.className = 'adv-block';

    // Encaixar o Evidente se for Deviant
    if(character.template === SupernaturalTemp.Deviant) {
        let overCheckbox = document.createElement('input');
        overCheckbox.type = 'checkbox';
        overCheckbox.checked = advantage.overt;
        overCheckbox.addEventListener('change', () => {} /** checkOvertAdv(id) */);
        advElement.appendChild(overCheckbox);
    }
    else {
        // Append um div vazio para encaixar a conta no CSS
        advElement.appendChild(document.createElement('div'));
    }

    // Campo nome de Vantagem
    let advNameInput = document.createElement('input');
    advNameInput.value = advantage.name;
    advNameInput.placeholder = 'Digite nome da Vantagem...';
    advNameInput.addEventListener('blur', (event) => renameAdvantage(advantage.id, event.target.value));

    // Campo círculos inputs
    let advRanksElement = document.createElement('div');
    let advRankRadio;
    for(let i = 0; i < 5; i++) {
        advRankRadio = document.createElement('input');
        advRankRadio.type = 'radio';
        advRankRadio.className = `adv-rank-${advantage.id}`;
        advRankRadio.addEventListener('click', () => changeAdvRank(advantage.id, i+1));
        if(i === 0) advRankRadio.checked = true;
        advRanksElement.appendChild(advRankRadio);
    }

    // Botão de deleção
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'X';
    delBtn.addEventListener('click', () => removeAdvantage(advantage.id));

    // Descrição
    let descriptionElement = document.createElement('textarea');
    descriptionElement.value = advantage.description;
    descriptionElement.className = 'gridC_span4';
    descriptionElement.placeholder = "Adicione descrição e informações da sua vantagem."

    // Append.    
    advElement.appendChild(advNameInput);
    advElement.appendChild(advRanksElement);
    advElement.appendChild(delBtn);
    advElement.appendChild(descriptionElement);
    meritBlock.appendChild(advElement);
}

/**
 * Renomeia a Vantagem.
 * @param {number} id ID da Vantagem.
 * @param {string} name Novo nome para Vantagem.
**/
function renameAdvantage(id, name) {
    let adv = character.merits.find(elem => elem.id === id);
    if(adv) adv.name = name;
    else throw console.error("Não foi encontrada a Vantagem");
}

/**
 * Realiza a marcação dos inputs radio conforme o novo valor de graduação.
 * @param {number} rank Graduação nova da Habilidade.
 * @param {string} attr Habilidade (Classe da Habilidade em inglês) qual deve ser marcado os círculos.
**/
function changeAdvRank(id, rank) {
    let adv = character.merits.find(elem => elem.id === id);
    if(adv) adv.rank = rank;
    else throw console.error("Não foi encontrada a Vantagem");

    let rankList = document.getElementsByClassName(`adv-rank-${id}`);
    for(let i = 0; i < rankList.length; i++) {
        if(i < rank) rankList[i].checked = true;
        else rankList[i].checked = false;
    }
}

/**
 * Altera a descrição da Vantagem.
 * @param {number} id ID da Vantagem
 * @param {string} description Descrição da Vantagem
 */
function changeAdvDescription(id, description) {
    let adv = character.merits.find(elem => elem.id === id);
    if(adv) adv.description = description;
    else throw console.error("Não foi encontrada a Vantagem");
}

/**
 * Remove específica vantagem do personagem.
 * @param {string | number} id ID da Vantagem.
**/
function removeAdvantage(id) {
    let index = character.merits.findIndex(elem => elem.id === id);
    character.merits.splice(index, 1);
    document.getElementById(`${id}`).outerHTML = "";
}

function printCharacter() {
    let str = JSON.stringify(character, null, 4);
    console.log(str);
}
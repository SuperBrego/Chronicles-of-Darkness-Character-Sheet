const templatesPile = [];

function changeTemplate(event) {
    var oldTemplateInfo;
    let tempIndex = Number(event.value)

    switch(tempIndex) {
        // Mortal
        case SupernaturalTemp.Mortal:
            globalChar.template = SupernaturalTemp.Mortal;
            oldTemplateInfo = globalChar.templateInfo;
            globalChar.templateInfo = getTemplateInfo(tempIndex);
            infoHeader.innerHTML = '';
            renderHeader(globalChar);
        break;
        // Vampire
        case SupernaturalTemp.Vampire:
            globalChar.template = SupernaturalTemp.Vampire;
            oldTemplateInfo = globalChar.templateInfo;
            globalChar.templateInfo = getTemplateInfo(tempIndex);
            infoHeader.innerHTML = '';
            renderHeader(globalChar);
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
function changeName(charName) { globalChar.name = charName; }

/**
 * Troca o nome do jogador.
 * @param {string} playerName Novo nome do jogador.
**/
function changePlayer(playerName) { globalChar.player = playerName; }
function changeChronicle(chronicleName) { globalChar.chronicle = chronicleName; }
function changeConcept(conceptName) { globalChar.concept = conceptName; }
function changeGroup(groupName) { globalChar.group = groupName; }

// **********************************
// * Mortal
// **********************************
function changeAge(age) { globalChar.templateInfo.age = Number(age); }
function changeFaction(factionName) { globalChar.templateInfo.factionName = factionName; }

// **********************************
// * Mortal, Caçador, Demônio, Mago
// **********************************
function changeVirtue(virtueName) { globalChar.templateInfo.virtue = virtueName; }
function changeVice(viceName) { globalChar.templateInfo.vice = viceName; }

// **************************
// * Vampiro
// **************************
function changeClan(clanName) { 
    let clanSelect = document.getElementById('clan-selection');
    if(clanName.length === 0) clanSelect.className += ' invalid-cell';
    else clanSelect.className = clanSelect.className.replace(' invalid-cell', '');
    globalChar.templateInfo.clan = clanName;

}
function changeMask(maskName) { globalChar.templateInfo.mask = maskName; }
function changeDirge(dirgeName) { globalChar.templateInfo.dirge = dirgeName; }
function changeBloodline(bloodlineName) { globalChar.templateInfo.bloodline = bloodlineName; }
function changeCovenant(covenantName) { globalChar.templateInfo.covenant = covenantName; }

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
            attribute = globalChar.mentalAttributes[index];
            if(!attribute) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
        case 1: 
            attribute = globalChar.physicalAttributes[index];
            if(!attribute) throw console.error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
        case 2: 
            attribute = globalChar.socialAttributes[index];
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
            skill = globalChar.mentalSkills[index];
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
            skill = globalChar.physicalSkills[index];
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
            skill = globalChar.socialSkills[index];
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
    globalChar.merits.push(advantage);
    
    createAdvantageBlock(advantage);
}

/**
 * Renomeia a Vantagem.
 * @param {number} id ID da Vantagem.
 * @param {string} name Novo nome para Vantagem.
**/
function renameAdvantage(id, name) {
    let adv = globalChar.merits.find(elem => elem.id === id);
    if(adv) adv.name = name;
    else throw console.error("Não foi encontrada a Vantagem");
}

/**
 * Realiza a marcação dos inputs radio conforme o novo valor de graduação.
 * @param {number} rank Graduação nova da Habilidade.
 * @param {string} attr Habilidade (Classe da Habilidade em inglês) qual deve ser marcado os círculos.
**/
function changeAdvRank(id, rank) {
    let adv = globalChar.merits.find(elem => elem.id === id);
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
    let adv = globalChar.merits.find(elem => elem.id === id);
    if(adv) adv.description = description;
    else throw console.error("Não foi encontrada a Vantagem");
}

/**
 * Remove específica vantagem do personagem.
 * @param {string | number} id ID da Vantagem.
**/
function removeAdvantage(id) {
    let index = globalChar.merits.findIndex(elem => elem.id === id);
    globalChar.merits.splice(index, 1);
    document.getElementById(`${id}`).outerHTML = "";
}

function printCharacter() {
    let str = JSON.stringify(globalChar, null, 4);
    console.log(str);
}
const templatesStack = [];

function appendTemplate(template) {
    if(templatesStack.find(elem => elem.index === template.index)) return;
    templatesStack.push(template);
}

function searchTemplate(index) {
    let template = templatesStack.find(elem => elem.index === index);
    if(template) return template;
    return getTemplateTraits(index);
}

function changeTemplate(event) {
    appendTemplate(globalChar.templateTraits);
    let tempIndex = Number(event.value)

    switch(tempIndex) {
        // Mortal
        case SupernaturalTemplates.Mortal:
            globalChar.template = SupernaturalTemplates.Mortal;
            globalChar.templateTraits = searchTemplate(tempIndex);
            infoHeader.innerHTML = '';
            renderHeader(globalChar);
        break;
        // Vampire
        case SupernaturalTemplates.Vampire:
            globalChar.template = SupernaturalTemplates.Vampire;
            globalChar.templateTraits = searchTemplate(tempIndex);
            infoHeader.innerHTML = '';
            renderHeader(globalChar);
        break;
        // Ghoul
        case SupernaturalTemplates.Ghoul:

        break;
        // Werewolf
        case SupernaturalTemplates.Werewolf:

        break;
        // Changeling
        case SupernaturalTemplates.Changeling:

        break;
        // Mage
        case SupernaturalTemplates.Mage:

        break;
        // Promethean
        case SupernaturalTemplates.Promethean:

        break;
        // Hunter
        case SupernaturalTemplates.Hunter:

        break;
        // Geist
        case SupernaturalTemplates.Geist:

        break;
        // Mummy
        case SupernaturalTemplates.Mummy:

        break;
        // Demon
        case SupernaturalTemplates.Demon:

        break;
        // Beast
        case SupernaturalTemplates.Beast:

        break;
        // Deviant
        case SupernaturalTemplates.Deviant:

        break;
    }
}

/**
 * Troca o nome do personagem.
 * @param {string} charName Novo nome de personagem.
**/
function changeName(charName) { globalChar.name = charName; }
function changeHealthState(index) {
    let healthBlock = globalChar.health[index];
    
    if(!healthBlock) throw console.error("Index inválido para campo de Vitalidade. Index encontrado: "+index);
    if(healthBlock.state === 3) healthBlock.state = 0;
    else healthBlock.state += 1;
    renderHealth(globalChar);
}

function changeWillpowerState(index) {
    let willBlock = globalChar.willpower[index];
    
    if(!willBlock) throw console.error("Index inválido para campo de Força de Vontade. Index encontrado: "+index);
    if(willBlock.state) willBlock.state = false;
    else willBlock.state = true;
    renderWillpower(globalChar);
}

function changeSize(nSize) {
    globalChar.size = nSize;
    // Atualizar Vitalidade:
    renderHealth(globalChar);
}

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
function changeAge(age) { globalChar.templateTraits.age = Number(age); }
function changeFaction(factionName) { globalChar.templateTraits.factionName = factionName; }

// **********************************
// * Mortal, Caçador, Demônio, Mago
// **********************************
function changeVirtue(virtueName) { globalChar.templateTraits.virtue = virtueName; }
function changeVice(viceName) { globalChar.templateTraits.vice = viceName; }

/**
 * Retorna ao valor padrão dos campos de Vitalidade.
 * Atualmente, não funcionando bem, pois está limpando todos itens.
 * @param {Character} character 
**/
function cleanHealth(character) {
    let stamina = character.physicalAttributes[2].rank;
    let health = Number(stamina) + Number(character.size);
    for(let i = health-1; i < character.health.length; i++) {
        character.health[i].state = 0;
    }
}

/**
 * Retorna ao valor padrão dos campos de Vontade.
 * @param {Character} character 
**/
function cleanWill(character) {
    let resolve = character.mentalAttributes[2].rank;
    let composure = character.socialAttributes[2].rank;
    let willpower = resolve + composure;
    for(let i = willpower-1; i < character.willpower.length; i++) {
        character.willpower[i].state = true;
    }
}

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
            globalChar.setMentalAttr(index, rank);
            setAttrRank(rank, globalChar.getMentalAttrClass(index));

            // Atualizando Defesa
            if(index === 1) { renderDefense(globalChar); }
            // Atualizando Força de Vontade
            if(index === 2) {
                renderWillpower(globalChar);
                cleanWill(globalChar);
            }
        break;
        case 1: 
            globalChar.setPhysicalAttr(index, rank);
            setAttrRank(rank, globalChar.getPhysicalAttrClass(index));
            
            // Atualizando Força
            if(index === 0) renderSpeed(globalChar);
            // Atualizando Defesa, Iniciativa e Velocidade
            if(index === 1) {
                renderDefense(globalChar);
                renderInitiative(globalChar);
                renderSpeed(globalChar);
            }
            // Atualizando Vitalidade
            if(index === 2) {
                renderHealth(globalChar);
                // cleanHealth(globalChar);
            }
        break;
        case 2: 
            globalChar.setSocialAttr(index, rank);
            setAttrRank(rank, globalChar.getSocialAttrClass(index));
            // Atualizando Força de Vontade
            if(index === 2) {
                renderWillpower(globalChar);
                renderInitiative(globalChar);
                cleanWill(globalChar);
            }
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
            // Atualizar Defesa
            if(index === 5) renderDefense(globalChar);
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
function addTrait(traitName, traitList) {
    let trait = { 
        id: idSeed(), 
        name: `Digite nome para ${traitName}...`, 
        rank: 1, 
        description: '',
        overt: false,
    };
    traitList.push(trait);
    return trait;
}

function addMerit() {
    let trait = addTrait('a Vantagem', globalChar.merits);
    let meritBlock = createTraitBlock(trait, 'Vantagem', 'merit');
    document.getElementById('cofd-character-merits').appendChild(meritBlock);
}

/**
 * Renomeia a Vantagem.
 * @param {number} id ID da Vantagem.
 * @param {string} name Novo nome para Vantagem.
**/
function changeMeritName(id, name) {
    let merit = globalChar.merits.find(elem => elem.id === id);
    if(merit) merit.name = name;
    else throw console.error("Não foi encontrada a Vantagem");
}

/**
 * Realiza a marcação dos inputs radio conforme o novo valor de graduação.
 * @param {number} rank Graduação nova da Habilidade.
 * @param {string} attr Habilidade (Classe da Habilidade em inglês) qual deve ser marcado os círculos.
**/
function changeTraitRank(id, rank, traitClass, traitList) {
    let trait = traitList.find(elem => elem.id === id);
    if(trait) trait.rank = rank;
    else throw console.error("Não foi encontrada a Vantagem");

    let rankList = document.getElementsByClassName(`${traitClass}-rank-${id}`);
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
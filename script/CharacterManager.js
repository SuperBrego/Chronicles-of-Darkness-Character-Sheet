const templatesStack = [];

function printCharacter() {
    let str = JSON.stringify(globalChar, null, 4);
    console.log(str);
}

/**
 * Limpa todas as características do personagem, iniciando-o do zero.
**/
function clearCharacter() {
    if(!confirm(`Você tem certeza?
    Isso apagará todos os dados da ficha abaixo.
    Baixe antes caso deseje acessá-la novamente.`)) {
        return;
    }
    let globalChar = new Character();
    renderCharacter(globalChar);
    addSheetListeners(globalChar);
}

/**
 * Limpa todas as características do modelo sobrenatural do personagem, iniciando-o do zero.
**/
function clearTemplate() {
    if(!confirm(`Você tem certeza?\nIsso apagará todos os dados do modelo sobrenatural.`)) return;
    globalChar.templateTraits = getTemplateTraits(globalChar.template);
    renderCharacter(globalChar);
    addSheetListeners(globalChar);
}

function appendTemplate(template) {
    if(templatesStack.find(elem => elem.index === template.index)) return;
    templatesStack.push(template);
}

/**
 * 
 * @param {number} index 
 * @returns 
**/
function searchTemplate(index) {
    let template = templatesStack.find(elem => elem.index === index);
    if(template) return template;
    return getTemplateTraits(index);
}

/**
 * Altera o modelo sobrenatural.
 * @param {*} event Evento da troca de índice de evento.
**/
function changeTemplate(event) {
    appendTemplate(globalChar.templateTraits);
    let tempIndex = Number(event.value)

    switch(tempIndex) {
        // Mortal
        case SupernaturalTemplates.Mortal:
            globalChar.template = SupernaturalTemplates.Mortal;
            globalChar.templateTraits = searchTemplate(tempIndex);
            infoHeader.innerHTML = '';
            renderCharacter(globalChar);
        break;
        // Vampire
        case SupernaturalTemplates.Vampire:
            globalChar.template = SupernaturalTemplates.Vampire;
            globalChar.templateTraits = searchTemplate(tempIndex);
            infoHeader.innerHTML = '';
            renderCharacter(globalChar);
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
    
    if(!healthBlock) throw new Error("Index inválido para campo de Vitalidade. Index encontrado: "+index);
    if(healthBlock.state === 3) healthBlock.state = 0;
    else healthBlock.state += 1;
    renderHealth(globalChar);
}

function changeWillpowerState(index) {
    let willBlock = globalChar.willpower[index];
    
    if(!willBlock) throw new Error("Index inválido para campo de Força de Vontade. Index encontrado: "+index);
    willBlock.state = !willBlock.state;
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
            if(!skill) throw new Error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
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
            if(!skill) throw new Error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
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
            if(!skill) throw new Error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
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

/**
 * Altera o valor da moralidade (Integridade para Mortais, Humanidade para Vampiros, etc.) do personagem.
 * @param {number} rank 
**/
function changeMoralityRank(rank) {
    globalChar.templateTraits.morality = rank;
    renderMorality(globalChar);
}

/**
 * Altera o texto de condição aplicada ao nível de Moralidade.
 * @param {number} index Index da Moralidade.
 * @param {string} text Novo texto para graduação da Moralidade.
 */
function changeMoralityRankText(index, text) {
    globalChar.templateTraits.moralityTrait[index] = text;
    renderMorality(globalChar);
}

/**
 * Adiciona uma nova Condição/Estado no personagem.
**/
function addCondition() {
    globalChar.conditions.push({id: idSeed(), text: ''});
    renderConditions(globalChar);
}

/**
 * Muda o texto da Condição/Estado.
 * @param {number} id ID da Condição.
 * @param {string} text Texto/Nome da Condição/Estado.
**/
function changeCondition(id, text) {
    let condition = globalChar.conditions.find(elem => elem.id === id);
    if(!condition) throw new Error('Falha em encontrar condição');
    condition.text = text;
    renderConditions(globalChar);
}

/**
 * Remove a Condição/Estado.
 * @param {number} id ID da Condição/Estado.
**/
function deleteCondition(id) {
    let index = globalChar.conditions.findIndex(elem => elem.id === id);
    if(index === -1) throw new Error('Falha em encontrar condição');

    globalChar.conditions.splice(index, 1);
    document.getElementById(`condition-${id}`).outerHTML = ''; 
    renderConditions(globalChar);
}


/**
 * Adiciona uma nova Condição/Estado no personagem.
**/
function addAspiration() {
    globalChar.aspirations.push({id: idSeed(), text: ''});
    renderAspirations(globalChar);
}

/**
 * Muda o texto da Condição/Estado.
 * @param {number} id ID da Condição.
 * @param {string} text Texto/Nome da Condição/Estado.
**/
function changeAspiration(id, text) {
    let aspiration = globalChar.aspirations.find(elem => elem.id === id);
    if(!aspiration) throw new Error('Falha em encontrar condição');
    aspiration.text = text;
    renderAspirations(globalChar);
}

/**
 * Remove a Condição/Estado.
 * @param {number} id ID da Condição/Estado.
**/
function deleteAspiration(id) {
    let index = globalChar.aspirations.findIndex(elem => elem.id === id);
    if(index === -1) throw new Error('Falha em encontrar condição');

    globalChar.aspirations.splice(index, 1);
    document.getElementById(`aspiration-${id}`).outerHTML = ''; 
    renderAspirations(globalChar);
}

/**
 * Cria uma característica genérica. Será usado especialmente para Disicplinas, Dons e Endowments.
 * @param {string} traitName Nome da característica.
 * @param {any[]} traitList Lista onde característica será adicionada.
**/
function createTrait(traitName, traitList) {
    let trait = {
        id: idSeed(), 
        name: `Digite nome ${traitName}...`, 
        rank: 1, 
        description: '',
        overt: false,
    };
    traitList.push(trait);
    return trait;
}

/**
 * Renomeia Característica.
 * @param {number} id ID da Característica.
 * @param {string} text Texto para substituir o nome.
**/
function changeTraitName(id, text) {
    let trait;

    switch(globalChar.template) {
        default: throw new Error("Característica não encontrada");
        case SupernaturalTemplates.Vampire:
            trait = globalChar.templateTraits.disciplines.find(elem => elem.id === id);
            if(trait) trait.name = text;
            else throw new Error("Característica não encontrada.")
        break;
    }
}

/**
 * Altera o valor de uma Característica.
 * @param {number} id ID da Característica.
 * @param {number} rank Novo valor da característica.
 * @param {string} traitClass Classe da característica. Por padrão, é trait.
 */
function changeTraitRank(id, rank, traitClass = 'trait') {
    let trait, rankList;

    switch(globalChar.template) {
        default: throw new Error("Característica não encontrada");
        case SupernaturalTemplates.Vampire:
            trait = globalChar.templateTraits.disciplines.find(elem => elem.id === id);
            if(trait) {
                trait.rank = rank;

                rankList = document.getElementsByClassName(`${traitClass}-rank-${id}`);
                for(let i = 0; i < rankList.length; i++) {
                    if(i < rank) rankList[i].checked = true;
                    else rankList[i].checked = false;
                }
            }
            else throw new Error("Característica não encontrada.")
        break;
    }
}

/**
 * Edita a descrição da Característica.
 * @param {number} id ID da Característica.
 * @param {string} text Texto para descrição.
**/
function changeTraitDescription(id, text) {
    let trait;

    switch(globalChar.template) {
        default: throw new Error("Característica não encontrada");
        case SupernaturalTemplates.Vampire:
            trait = globalChar.templateTraits.disciplines.find(elem => elem.id === id);
            if(trait) trait.description = text;
            else throw new Error("Característica não encontrada.")
        break;
    }
}

/**
 * Remove a Característica em questão.
 * @param {number} id ID da característica.
**/
function removeTrait(id) {
    let index;
    switch(globalChar.template) {
        default: throw new Error("Característica não encontrada");
        case SupernaturalTemplates.Vampire:
            index = globalChar.templateTraits.disciplines.findIndex(elem => elem.id === id);
            if(index != -1) {
                if(confirm('Você tem certeza?\nEssa escolha não pode ser desfeita.')) {
                    globalChar.templateTraits.disciplines.splice(index, 1);
                    document.getElementById(`${id}`).outerHTML = "";
                }
            }
        break;
    }
}

// ****************************************************
// Vantagens
// ****************************************************
/**
 * Adiciona uma nova vantagem para o Personagem.
**/
function addMerit() {
    let merit = { 
        id: idSeed(), 
        name: 'Digite nome da Vantagem...', 
        rank: 1, 
        description: '',
        overt: false,
    };
    globalChar.merits.push(merit);
    
    createMeritBlock(merit);
    changeMeritRank(merit.id, merit.rank);
}

/**
 * Renomeia a Vantagem.
 * @param {number} id ID da Vantagem.
 * @param {string} name Novo nome para Vantagem.
**/
function changeMeritName(id, name) {
    let merit = globalChar.merits.find(elem => elem.id === id);
    if(merit) merit.name = name;
    else throw new Error("Não foi encontrada a Vantagem");
}

/**
 * Realiza a marcação dos inputs radio conforme o novo valor de graduação.
 * @param {number} rank Graduação nova da Habilidade.
 * @param {string} attr Habilidade (Classe da Habilidade em inglês) qual deve ser marcado os círculos.
**/
function changeMeritRank(id, rank) {
    let merit = globalChar.merits.find(elem => elem.id === id);
    if(merit) merit.rank = rank;
    else throw new Error("Não foi encontrada a Vantagem");

    let rankList = document.getElementsByClassName(`merit-rank-${id}`);
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
function changeMeritDescription(id, description) {
    let merit = globalChar.merits.find(elem => elem.id === id);
    if(merit) merit.description = description;
    else throw new Error("Não foi encontrada a Vantagem");
}

/**
 * Remove específica vantagem do personagem.
 * @param {string | number} id ID da Vantagem.
**/
function removeMerit(id) {
    let index = globalChar.merits.findIndex(elem => elem.id === id);
    if(confirm('Você tem certeza?\nEssa escolha não pode ser desfeita.')) {
        globalChar.merits.splice(index, 1);
        document.getElementById(`${id}`).outerHTML = "";
    }
}

/**
 * Altera o texto da aparência do personagem.
 * @param {string} text Novo texto para aparência.
**/
function changeAppearance(text) {
    if(!text) return;
    globalChar.appearance = text;
    renderPersonalTraits(globalChar);
}

/**
 * Altera a história do personagem.
 * @param {string} text Novo texto para história.
**/
function changeStory(text) {
    if(!text) return;
    globalChar.story = text;
    renderPersonalTraits(globalChar);
}
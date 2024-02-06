// **************************
// * Vampiro
// **************************
function changeClan(clanName) { 
    let clanSelect = document.getElementById('clan-selection');
    if(clanName.length === 0) clanSelect.className += ' invalid-cell';
    else clanSelect.className = clanSelect.className.replace(' invalid-cell', '');
    globalChar.templateTraits.clan = clanName;

}

/**
 * Adiciona/Edita a Máscara do personagem vampiro.
 * @param {string} maskName Nova Máscara para o vampiro.
 */
function changeMask(maskName) { globalChar.templateTraits.mask = maskName; }

/**
 * Adiciona/Edita o Lamento do personagem vampiro.
 * @param {string} dirgeName Novo Lamento para o vampiro.
 */
function changeDirge(dirgeName) { globalChar.templateTraits.dirge = dirgeName; }

/**
 * Adiciona/Edita a Linhagem do personagem vampiro.
 * @param {string} bloodlineName Nova Linhagem para o vampiro.
 */
function changeBloodline(bloodlineName) { globalChar.templateTraits.bloodline = bloodlineName; }

/**
 * Adiciona/Edita a Coalização do personagem vampiro.
 * @param {string} covenantName Nova Coalizão para o vampiro.
 */
function changeCovenant(covenantName) { globalChar.templateTraits.covenant = covenantName; }

/**
 * Altera a Potência de sangue do personagem vampiro.
 * @param {number} value Novo valor da Potência de Sangue.
 */
function changeBloodPotency(value) {
    globalChar.templateTraits.bloodPotency = value;
    renderBloodPotency(value);
}

/**
 * Adiciona um campo de disciplina.
 */
function addDiscipline() {
    let disciplinesBlock = document.getElementById('vampire-disciplines');
    let disciplineList = globalChar.templateTraits.disciplines;
    if(disciplinesBlock) {
        let discipline = createTrait('Disciplina', disciplineList, 'VD');
        createTraitBlock(discipline, 'vampire-disciplines', 'Disciplina', changeDisciplineName, changeDisciplineRank, changeDisciplineDescription, deleteDiscipline);
        
        document.querySelector('#select-disciplines').disabled = (disciplineList.length > 0) ? false : true;
        document.querySelector('#delete-disciplines').disabled = (disciplineList.length > 0) ? false : true;
    }
    else throw new Error('Bloco de Disciplinas não renderizado.')

}

/**
 * Altera nome da disciplina.
 * @param {number} id ID da Disciplina.
 * @param {string} text Texto para novo nome da descrição.
 */
function changeDisciplineName(id, text) {
    trait = globalChar.templateTraits.disciplines.find(elem => elem.id === id);
    if(trait) trait.name = text;
    else throw new Error("Característica não encontrada.")
}

/**
 * Altera o nível da Disciplina.
 * @param {number} id ID da Disciplina.
 * @param {number} rank Novo nível da disciplina.
 */
function changeDisciplineRank(id, rank) {
    trait = globalChar.templateTraits.disciplines.find(elem => elem.id === id);
    if(trait) {
        trait.rank = rank;
        rankList = document.getElementsByClassName(`trait-rank-${id}`);
        for(let i = 0; i < rankList.length; i++) {
            if(i < rank) rankList[i].checked = true;
            else rankList[i].checked = false;
        }
    }
    else throw new Error("Característica não encontrada.")
}

/**
 * Altera a descrição da disciplina.
 * @param {number} id ID da Disciplina.
 * @param {string} text Descrição da disciplina.
 */
function changeDisciplineDescription(id, text) {
    let trait;
    trait = globalChar.templateTraits.disciplines.find(elem => elem.id === id);
    if(trait) trait.description = text;
    else throw new Error("Disciplina não encontrada.");
}

/**
 * Deleta a disciplina da listagem.
 * @param {number} id ID da disciplina.
 */
function deleteDiscipline(id) {
    let index;
    index = globalChar.templateTraits.disciplines.findIndex(elem => elem.id === id);
    if(index != -1) {
        if(confirm('Você tem certeza?\nEssa escolha não pode ser desfeita.')) {
            globalChar.templateTraits.disciplines.splice(index, 1);
            document.getElementById(`${id}`).outerHTML = "";
        }
    }
}

/**
 * Adiciona uma disciplina já pronta.
 * @param {number} disciplineID ID da Disciplina listada.
**/
function addStandardDiscipline(disciplineID) {

}

/**
 * Atualiza o valor do index do Vitae.
 * @param {number} index Index do Vitae.
**/
function changeVitaeState(index) {
    let vitae = globalChar.templateTraits.vitae;
    if(vitae[index]) vitae[index].state = !vitae[index].state;
}

/**
 * Adiciona uma Fraqueza.
 */
function addBane() {
    let baneList = globalChar.templateTraits.banes;
    baneList.push({id: idSeed(), text: ''});
    renderBanes(baneList);
}

/**
 * Edita a fraqueza.
 * @param {number} id ID da Fraqueza.
 * @param {string} text Novo texto da fraqueza.
 */
function renameBane(id, text) {
    let bane;
    let baneList = globalChar.templateTraits.banes;
    bane = baneList.find(elem => elem.id === id);
    if(bane) bane.text = text; 
    else throw new Error("Fraqueza não encontrada.");
    renderBanes(baneList);
}

/**
 * Remove Fraqueza do personagem vampiro.
 * @param {number} id ID da Fraqueza
 */
function deleteBane(id) {
    let index;
    let baneList = globalChar.templateTraits.banes;
    index = baneList.findIndex(elem => elem.id === id);
    if(index != -1) {
        baneList.splice(index, 1);
        document.getElementById(`${id}`).outerHTML = "";
    }
    renderBanes(baneList);
}

/**
 * Adiciona uma nova Devoção.
 */
function addDevotion() {
    let devotions = globalChar.templateTraits.devotions;
    createRanklessTrait('Devoção', devotions, 'VDD');
    renderDevotions(devotions);
}

/**
 * Renomea Devoção.
 * @param {number} id ID da Devoção.
 * @param {string} text Novo nome.
 */
function renameDevotion(id, text) {
    let devotion;
    let devotions = globalChar.templateTraits.devotions;
    devotion = devotions.find(elem => elem.id === id);
    if(devotion) devotion.name = text; 
    else throw new Error("Devoção não encontrada.");
    renderDevotions(devotions);
}

/**
 * Altera a descrição da Devoção.
 * @param {number} id ID da Devoção.
 * @param {string} text Novo texto de descrição.
 */
function changeDevotionDescription(id, text) {
    let devotion;
    let devotions = globalChar.templateTraits.devotions;
    devotion = devotions.find(elem => elem.id === id);
    if(devotion) devotion.description = text; 
    else throw new Error("Devoção não encontrada.");
    renderDevotions(devotions);
}

/**
 * Remove a Devoção do personagem vampiro.
 * @param {number} id ID da Devoção.
 */
function deleteDevotion(id) {
    let index;
    let devotions = globalChar.templateTraits.devotions;
    index = devotions.findIndex(elem => elem.id === id);
    if(index != -1) {
        devotions.splice(index, 1);
        document.getElementById(`${id}`).outerHTML = "";
    }
    renderDevotions(devotions);
}

/**
 * Adiciona um campo de Ritual.
 */
function addRitual() {
    let ritualBlock = document.getElementById('vampire-ritualMiracle');
    let ritesMiraclesList = globalChar.templateTraits.ritesMiracles;
    if(ritualBlock) {
        let discipline = createTrait('Ritual', ritesMiraclesList, 'VD');
        createTraitBlock(discipline, 'vampire-ritualMiracle', 'Ritual', changeDisciplineName, changeDisciplineRank, changeDisciplineDescription, deleteDiscipline);
        
        document.querySelector('#select-ritualMiracle').disabled = (ritesMiraclesList.length > 0) ? false : true;
        document.querySelector('#delete-ritualMiracle').disabled = (ritesMiraclesList.length > 0) ? false : true;
    }
    else throw new Error('Bloco de Rituals não renderizado.')

}

/**
 * Altera nome da Ritual.
 * @param {number} id ID da Ritual.
 * @param {string} text Texto para novo nome da descrição.
 */
function changeRitualMiracleName(id, text) {
    trait = globalChar.templateTraits.ritesMiracles.find(elem => elem.id === id);
    if(trait) trait.name = text;
    else throw new Error("Característica não encontrada.")
}

/**
 * Altera o nível da Ritual.
 * @param {number} id ID da Ritual.
 * @param {number} rank Novo nível da Ritual.
 */
function changeRitualMiracleRank(id, rank) {
    trait = globalChar.templateTraits.ritesMiracles.find(elem => elem.id === id);
    if(trait) {
        trait.rank = rank;
        rankList = document.getElementsByClassName(`trait-rank-${id}`);
        for(let i = 0; i < rankList.length; i++) {
            if(i < rank) rankList[i].checked = true;
            else rankList[i].checked = false;
        }
    }
    else throw new Error("Característica não encontrada.")
}

/**
 * Altera a descrição da Ritual.
 * @param {number} id ID da Ritual.
 * @param {string} text Descrição da Ritual.
 */
function changeRitualMiracleDescription(id, text) {
    let trait;
    trait = globalChar.templateTraits.ritesMiracles.find(elem => elem.id === id);
    if(trait) trait.description = text;
    else throw new Error("Ritual não encontrada.");
}

/**
 * Deleta a Ritual da listagem.
 * @param {number} id ID da Ritual.
 */
function deleteRitualMiracle(id) {
    let index;
    index = globalChar.templateTraits.ritesMiracles.findIndex(elem => elem.id === id);
    if(index != -1) {
        if(confirm('Você tem certeza?\nEssa escolha não pode ser desfeita.')) {
            globalChar.templateTraits.ritesMiracles.splice(index, 1);
            document.getElementById(`${id}`).outerHTML = "";
        }
    }
}

// vinculum: [],
// havens: [],
// **************************
// * Vampiro
// **************************
function changeClan(clanName) { 
    let clanSelect = document.getElementById('clan-selection');
    if(clanName.length === 0) clanSelect.className += ' invalid-cell';
    else clanSelect.className = clanSelect.className.replace(' invalid-cell', '');
    globalChar.templateTraits.clan = clanName;

}
function changeMask(maskName) { globalChar.templateTraits.mask = maskName; }
function changeDirge(dirgeName) { globalChar.templateTraits.dirge = dirgeName; }
function changeBloodline(bloodlineName) { globalChar.templateTraits.bloodline = bloodlineName; }
function changeCovenant(covenantName) { globalChar.templateTraits.covenant = covenantName; }

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


function addBane() {
    let baneList = globalChar.templateTraits.banes;
    baneList.push({id: idSeed(), text: ''});
    renderBanes(baneList);
}

function editBane(id, text) {
    let bane;
    let baneList = globalChar.templateTraits.banes;
    bane = baneList.find(elem => elem.id === id);
    if(bane) bane.text = text; 
    else throw new Error("Fraqueza não encontrada.");
    renderBanes(baneList);

}

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

const DevotionsC = {

    add() {
        let devotions = globalChar.templateTraits.devotions;
        createRanklessTrait('Devoção', devotions, 'VDD');
        renderDevotions(devotions);
    },
    
    rename(id, text) {
        let devotion;
        let devotions = globalChar.templateTraits.devotions;
        devotion = devotions.find(elem => elem.id === id);
        if(devotion) devotion.name = text; 
        else throw new Error("Devoção não encontrada.");
        console.log(id, text)
        renderDevotions(devotions);
    },

    changeDescription(id, text) {
        let devotion;
        let devotions = globalChar.templateTraits.devotions;
        devotion = devotions.find(elem => elem.id === id);
        if(devotion) devotion.description = text; 
        else throw new Error("Devoção não encontrada.");
        console.log(id, text)
        renderDevotions(devotions);
    },

    delete(id) {
        let index;
        let devotions = globalChar.templateTraits.devotions;
        index = devotions.findIndex(elem => elem.id === id);
        if(index != -1) {
            devotions.splice(index, 1);
            document.getElementById(`${id}`).outerHTML = "";
        }
        console.log(id)
        renderDevotions(devotions);
    }
}

// ritesMiracles: [],
// vinculum: [],
// havens: [],
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

function addDiscipline() {

    let disciplinesBlock = document.getElementById('vampire-disciplines');
    let disciplineList = globalChar.templateTraits.disciplines;
    if(disciplinesBlock) {
        let discipline = createTrait('Disciplina', disciplineList);
        createTraitBlock(discipline, 'vampire-disciplines', 'Disciplina');
        
        document.querySelector('#select-disciplines').disabled = (disciplineList.length > 0) ? false : true;
        document.querySelector('#delete-disciplines').disabled = (disciplineList.length > 0) ? false : true;
    }
    else throw new Error('Bloco de Disciplinas não renderizado.')

}

function changeVitaeState(index) {
    let vitae = globalChar.templateTraits.vitae;
    if(vitae[index]) vitae[index].state = !vitae[index].state;
}

function addBane() {

}
function editBane() {

}
function removeBane() {

}

// banes: [],
// devotions: [],
// ritesMiracles: [],
// vinculum: [],
// havens: [],
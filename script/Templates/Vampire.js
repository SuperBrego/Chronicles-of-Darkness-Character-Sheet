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
    // renderVampireTraits(character);
}

function addDiscipline() { }
function changeDisciplineName(id, text) {}
function changeDisciplineDescription(id, text) {}
function changeDisciplineRank(id, value) {}
function removeDiscipline(id) {}

// disciplines: [],
// banes: [],
// devotions: [],
// ritesMiracles: [],
// vinculum: [],
// havens: [],
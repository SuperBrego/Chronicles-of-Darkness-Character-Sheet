function addWeapon() {
    globalChar.weapons.push({
        id: idSeed(),
        name: '',
        damage: '',
        range: '',
        clip: '',
        initiative: 0,
        strength: 0,
        size: 0,
        description: '',
        dicePool: 0
    });
    renderWeapons(globalChar);
}

function changeWeaponName(id, text) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.name = text;
    renderWeapons(globalChar);
}
function changeWeaponDamage(id, text) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.damage = text;
    renderWeapons(globalChar);
}
function changeWeaponRange(id, text) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.range = text;
    renderWeapons(globalChar);
}
function changeWeaponClip(id, text) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.clip = text;
    renderWeapons(globalChar);
}
function changeWeaponInitiative(id, value) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.initiative = value;
    renderWeapons(globalChar);
}
function changeWeaponStrength(id, value) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.strength = value;
    renderWeapons(globalChar);
}
function changeWeaponSize(id, value) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.size = value;
    renderWeapons(globalChar);
}
function changeWeaponDescription(id, text) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.description = text;
    renderWeapons(globalChar);
}
function deleteWeapon(id) {
    let index = globalChar.weapons.findIndex(elem => elem.id === id);
    if(index === -1) throw new Error('Arma não encontrada.');
    globalChar.weapons.splice(index, 1);
    document.getElementById(`equip-weapon-${id}`).outerHTML = ''; 
    renderWeapons(globalChar);
}
function addWeapon() {
    globalChar.weapons.push({
        id: idSeed(),
        name: '',
        damage: 0,
        range: '',
        clip: 0,
        initiative: 0,
        strength: 0,
        size: 0,
        description: '',
        attribute: '',
        skill: '',
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

function changeWeaponAttribute(id, text) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.attribute = text;
    renderWeapons(globalChar);
}

function changeWeaponSkill(id, text) {
    let weapon = globalChar.weapons.find(elem => elem.id === id);
    if(!weapon) throw new Error('Arma não encontrada.');
    weapon.skill = text;
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

/******************************* */
/** Armadura **/
/******************************* */
function addArmor() {
    globalChar.armors.push({
        id: idSeed(),
        name: '',
        generalRank: 0,
        ballisticRank: 0,
        strength: 0,
        defense: 0,
        speed: 0,
        description: ''
    });
    renderArmors(globalChar);
}

function changeArmorName(id, text) {
    let armor = globalChar.armors.find(elem => elem.id === id);
    if(!armor) throw new Error('Armadura não encontrada.');
    armor.name = text;
    renderArmors(globalChar);
}

function changeArmorGeneralRank(id, text) {
    let armor = globalChar.armors.find(elem => elem.id === id);
    if(!armor) throw new Error('Armadura não encontrada.');
    armor.generalRank = text;
    renderArmors(globalChar);
}

function changeArmorBallisticRank(id, text) {
    let armor = globalChar.armors.find(elem => elem.id === id);
    if(!armor) throw new Error('Armadura não encontrada.');
    armor.ballisticRank = text;
    renderArmors(globalChar);
}

function changeArmorDefense(id, text) {
    let armor = globalChar.armors.find(elem => elem.id === id);
    if(!armor) throw new Error('Armadura não encontrada.');
    armor.defense = text;
    renderArmors(globalChar);
}

function changeArmorSpeed(id, text) {
    let armor = globalChar.armors.find(elem => elem.id === id);
    if(!armor) throw new Error('Armadura não encontrada.');
    armor.speed = text;
    renderArmors(globalChar);
}

function changeArmorStrength(id, value) {
    let armor = globalChar.armors.find(elem => elem.id === id);
    if(!armor) throw new Error('Armadura não encontrada.');
    armor.strength = value;
    renderArmors(globalChar);
}

function changeArmorDescription(id, text) {
    let armor = globalChar.armors.find(elem => elem.id === id);
    if(!armor) throw new Error('Armadura não encontrada.');
    armor.description = text;
    renderArmors(globalChar);
}

function deleteArmor(id) {
    let index = globalChar.armors.findIndex(elem => elem.id === id);
    if(index === -1) throw new Error('Armadura não encontrada.');
    globalChar.armors.splice(index, 1);
    document.getElementById(`equip-armor-${id}`).outerHTML = ''; 
    renderArmors(globalChar);
}

/******************************* */
/** Genéricos **/
/******************************* */
function addEquipment() {
    globalChar.equipments.push({ id: idSeed(), name: '', description: '' });
    renderGenericEquip(globalChar);
}

function changeEquipName(id, text) {
    let equipment = globalChar.equipments.find(elem => elem.id === id);
    if(!equipment) throw new Error('Armadura não encontrada.');
    equipment.name = text;
    renderGenericEquip(globalChar);
}

function changeEquipDescription(id, text) {
    let equipment = globalChar.equipments.find(elem => elem.id === id);
    if(!equipment) throw new Error('Armadura não encontrada.');
    equipment.description = text;
    renderGenericEquip(globalChar);
}

function deleteEquip(id) {
    let index = globalChar.equipments.findIndex(elem => elem.id === id);
    if(index === -1) throw new Error('Armadura não encontrada.');
    globalChar.equipments.splice(index, 1);
    document.getElementById(`equip-generic-${id}`).outerHTML = ''; 
    renderGenericEquip(globalChar);
}
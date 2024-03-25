/**
 * Adiciona uma nova Pedra de Toque.
 */
function addTouchstone() {
    let touchstones = globalChar.touchstones;
    createRanklessTrait('Pedra de Toque', touchstones, 'TS');
    renderTouchstones(touchstones);
}

/**
 * Renomea Pedra de Toque.
 * @param {number} id ID da Pedra de Toque.
 * @param {string} text Novo nome.
 */
function renameTouchstone(id, text) {
    let touchstone;
    let touchstones = globalChar.touchstones;
    touchstone = touchstones.find(elem => elem.id === id);
    if(touchstone) touchstone.name = text; 
    else throw new Error("Pedra de Toque não encontrada.");
    renderTouchstones(touchstones);
}

/**
 * Altera a descrição da Pedra de Toque.
 * @param {number} id ID da Pedra de Toque.
 * @param {string} text Novo texto de descrição.
 */
function changeTouchstoneDescription(id, text) {
    let touchstone;
    let touchstones = globalChar.touchstones;
    touchstone = touchstones.find(elem => elem.id === id);
    if(touchstone) touchstone.description = text; 
    else throw new Error("Pedra de Toque não encontrada.");
    renderTouchstones(touchstones);
}

/**
 * Remove a Pedra de Toque do personagem vampiro.
 * @param {number} id ID da Pedra de Toque.
 */
function deleteTouchstone(id) {
    let index;
    let touchstones = globalChar.touchstones;
    index = touchstones.findIndex(elem => elem.id === id);
    if(index != -1) {
        touchstones.splice(index, 1);
        document.getElementById(`${id}`).outerHTML = "";
    }
    renderTouchstones(touchstones);
}
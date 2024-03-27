/**
 * Adiciona um novo Personagem de Apoio.
 */
function addNPC() {
    let npcCasts = globalChar.npcs;
    createRanklessTrait('Personagem de Apoio', npcCasts, 'TS');
    renderNPCs(npcCasts);
}

/**
 * Renomea Personagem de Apoio.
 * @param {number} id ID da Personagem de Apoio.
 * @param {string} text Novo nome.
 */
function renameNPC(id, text) {
    let npcChar;
    let npcCasts = globalChar.npcs;
    npcChar = npcCasts.find(elem => elem.id === id);
    if(npcChar) npcChar.name = text; 
    else throw new Error("Personagem de Apoio não encontrada.");
    renderNPCs(npcCasts);
}

/**
 * Altera a descrição da Personagem de Apoio.
 * @param {number} id ID da Personagem de Apoio.
 * @param {string} text Novo texto de descrição.
 */
function changeNPCDescription(id, text) {
    let npcChar;
    let npcCasts = globalChar.npcs;
    npcChar = npcCasts.find(elem => elem.id === id);
    if(npcChar) npcChar.description = text; 
    else throw new Error("Personagem de Apoio não encontrada.");
    renderNPCs(npcCasts);
}

/**
 * Remove a Personagem de Apoio do personagem vampiro.
 * @param {number} id ID da Personagem de Apoio.
 */
function deleteNPC(id) {
    let index;
    let npcCasts = globalChar.npcs;

    if(confirm('Deseja deletar essa Personagem de Apoio?\nEssa ação não pode ser desfeita.')) {
        index = npcCasts.findIndex(elem => elem.id === id);
        if(index != -1) {
            npcCasts.splice(index, 1);
            document.getElementById(`npc-${id}`).outerHTML = "";
        }
        renderNPCs(npcCasts);
    }
}
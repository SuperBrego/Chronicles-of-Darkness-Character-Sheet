
/* **********************************  */
/** Render **/
/* **********************************  */
/**
 * Cria um elemento rápido.
 * @param {string} tag Tag do Elemento.
 * @param {string} className Classe(s) do Elemento.
 * @param {string} id ID do elemento.
 * @param {string} content Conteúdo/innerHTML do Elemento.
 * @param {string} type Tipo do Elemento (especialmente para inputs).
 * @param {string} listenEvent Evento a ser prestado atenção
 * @param {any} callback Função
 * @returns Elemento novo.
**/
function quickElement(tag, className, id = '', content = '', type = '', listenEvent = '', callback = () => {}) {
    let quickElement = document.createElement(tag);
    if(className) quickElement.className = className;
    if(id) quickElement.id = id;
    quickElement.innerHTML = content;
    quickElement.type = type;
    if(listenEvent) quickElement.addEventListener(listenEvent, callback);
    return quickElement;
}

/**
 * Cria novo elemento de Input.
 * @param {string} type Tipo de input.
 * @param {number | string} value Valor para o input.
 * @param {any} callback Função para troca do input.
 * @param {string} className Classes para o input.
 * @param {string} id ID do input.
 * @param {string} placeholder Valor de texto para ocupar o espaço.
 * @returns {Element}
**/
function quickInput(type, value, callback, className, id = '', placeholder = '') {
    let quickInput = document.createElement('input');
    quickInput.value = value;
    quickInput.type = type;
    if(className) quickInput.className = className;
    if(id) quickInput.id = id;
    quickInput.placeholder = placeholder;
    quickInput.addEventListener('blur', callback);
    return quickInput;
}

function quickElementBtn(className, id = '', content = '', callback = () => {}) {
    let quickBtn = document.createElement('button');
    if(className) quickBtn.className = className;
    if(id) quickBtn.id = id;
    quickBtn.innerHTML = content;
    quickBtn.addEventListener('click', callback);
    return quickBtn;
}

/**
 * Cria um novo elemento de Input Number.
 * @param {number} value Valor do Input Number.
 * @param {any} callback Função para troca do input.
 * @param {string} className Classes para o input number.
 * @param {string} id ID para o Input number.
 * @param {number} min Valor mínimo para o Input Number.
 * @param {number} max Valor máximo para o Input Number.
 * @returns {Element}
**/
function quickNumberInput(value, callback, className, id, min, max) {
    let quickInput = document.createElement('input');
    quickInput.type = 'number';
    quickInput.value = Number(value);
    if(className) quickInput.className = className;
    if(id) quickInput.id = id;
    // quickInput.onkeydown = () => {return event.charCode >= 48 && event.charCode <= 57};
    if(min) quickInput.min = min;
    if(max) quickInput.max = max;
    quickInput.addEventListener('blur', callback);
    return quickInput;
}

/**
 * Cria um novo elemento de Select.
 * @param {string} className Classes para o Select.
 * @param {string} id ID do Select.
 * @param {any} callback Função para troca do Select.
 * @param {number | string} initialValue Valor inicial do Select.
 * @param  {...any} options Lista de Opções.
 * @returns {Element}
**/
function quickSelect(className, id, callback, initialValue, ...options) {
    let quickSelect = document.createElement('select');
    quickSelect.value = Number(initialValue);
    if(className) quickSelect.className = className;
    if(id) quickSelect.id = id;
    
    let optionElement;
    for(let option of options) {
        optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.innerHTML = option.text;
        quickSelect.appendChild(optionElement);
    }
    quickSelect.addEventListener('select', callback);
    return quickSelect;
}

/**
 * Cria e anexa uma nova característica.
 * @param {string} trait Nome da característica.
 * @param {string} traitPath ID do destino da característica.
 * @param {string} traitName Nome da característica.
 * @param {string} traitClass Classe para característica.
**/
function createTraitBlock(trait, traitPath, traitName, traitClass = 'trait') {
    if(!trait) throw new Error("Característica não encaminhada.")
    let traitElement = document.createElement('div');
    traitElement.id = trait.id;
    traitElement.className = `${traitClass}-block`;
    
    // Encaixar o Evidente se for Deviant
    if(globalChar.template === SupernaturalTemplates.Deviant) {
        let overCheckbox = document.createElement('input');
        overCheckbox.type = 'checkbox';
        overCheckbox.checked = trait.overt;
        overCheckbox.addEventListener('change', () => {} /** checkOvertTrait(id) */);
        traitElement.appendChild(overCheckbox);
    }
    else {
        // Append um div vazio para encaixar a conta no CSS
        traitElement.appendChild(document.createElement('div'));
    }
    
    // Campo nome de Característica
    let traitNameInput = document.createElement('input');
    traitNameInput.value = trait.name;
    traitNameInput.placeholder = `Digite nome ${traitName}...`;
    traitNameInput.addEventListener('blur', (event) => changeTraitName(trait.id, event.target.value));
    
    // Campo círculos inputs
    let traitRanksElement = document.createElement('div');
    let traitRankRadio;
    for(let i = 0; i < 5; i++) {
        traitRankRadio = document.createElement('input');
        traitRankRadio.type = 'radio';
        traitRankRadio.className = `${traitClass}-rank-${trait.id}`;
        traitRankRadio.addEventListener('click', () => changeTraitRank(trait.id, i+1));
        if(i === 0) traitRankRadio.checked = true;
        traitRanksElement.appendChild(traitRankRadio);
    }
    
    // Botão de deleção
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'X';
    delBtn.addEventListener('click', () => removeTrait(trait.id));
    
    // Descrição
    let descriptionElement = document.createElement('textarea');
    descriptionElement.value = trait.description;
    descriptionElement.className = 'gridC_span4';
    descriptionElement.placeholder = "Adicione descrição e informações..."
    descriptionElement.addEventListener('blur', () => changeTraitDescription(trait.id, event.target.value));

    // ************************************
    // BOTÃO DE SELEÇÃO
    // ************************************
    let selectBtnBlock =  document.createElement('div');
    selectBtnBlock.className = 'trait-select-block';

    let selectBlockTitle = document.createElement('small');
    selectBlockTitle.innerHTML = 'Selecionar';
    selectBtnBlock.appendChild(selectBlockTitle);

    let selectBtn = document.createElement('input');
    selectBtn.type = 'checkbox';
    selectBtn.addEventListener('change', () => {}); // setSelectedMerit(merit.id)
    selectBtnBlock.appendChild(selectBtn);
    
    // Append.    
    traitElement.appendChild(traitNameInput);
    traitElement.appendChild(traitRanksElement);
    traitElement.appendChild(delBtn);
    traitElement.appendChild(selectBtnBlock);
    traitElement.appendChild(descriptionElement);
    
    let pathBlock = document.getElementById(traitPath);
    if(!pathBlock) throw new Error('Caminho para adição da Característica inválido. Encontrado '+idPath);
    
    pathBlock.appendChild(traitElement);
}

/**
 * Seleciona ou desseleciona todas as Vantagens do Personagem.
 * @returns {void}
**/
function selectAllTrait(blockID) {
    let sectionContainer = document.getElementById(blockID);
    let blockElements = Array.from(sectionContainer.querySelectorAll(`.trait-select-block`));
    let blockInput;
    
    let selectedCC = blockElements.reduce((total, elem) => { return total + ((elem.querySelector('input').checked) ? 1 : 0); }, 0);
    let allSelected = (selectedCC === blockElements.length);

    for(let blockDiv of blockElements) {
        blockInput = blockDiv.querySelector('input');
        blockInput.checked = (!allSelected);
    }
}

/**
 * Remove Vantagens selecionadas do personagem.
 * @returns {void}
**/
function deleteSelectedTrait(blockID, location, traitName) {
    let sectionContainer = document.getElementById(blockID);
    let blockElements = Array.from(sectionContainer.querySelectorAll(`.trait-select-block`));
    let blockInput;
    let idList = [];
    
    for(let i = 0; i < blockElements.length; i++) {
        blockInput = blockElements[i].querySelector('input');
        if(blockInput.checked) idList.push(location[i].id);
    }
    
    idList = idList.sort((a, b) => { return a - b; });      
    if(idList.length === 0) {
        alert('Nenhum item selecionado');
        return;
    }

    deleteMultipleTraits(idList, location, traitName);
}

function deleteMultipleTraits(idList, location, traitName) {
    let index;
    if(confirm(`Você tem certeza que quer deletar todos itens selecionados?\nEssa escolha não pode ser desfeita.`)) {
        for(let id of idList) {
            index = location.findIndex(elem => elem.id === id)
            location.splice(index, 1);
            document.getElementById(`${id}`).outerHTML = "";
        }
    }
    
    // Ativar ou desativar botão de seleção de vários itens.
    document.querySelector(`#select-${traitName}`).disabled = (location.length > 0) ? false : true;
    // Ativar ou desativar botão de deleção de vários itens.
    document.querySelector(`#delete-${traitName}`).disabled = (location.length > 0) ? false : true;
}
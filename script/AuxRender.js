/* **********************************  */
/** Render **/
/* **********************************  */
/**
 * 
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
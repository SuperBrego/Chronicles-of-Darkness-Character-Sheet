
var scripts = [
    "Database/Traits.js",
    "classes/Character.js",
    "script/Equipment.js",
    "script/AuxRender.js",
    "script/CharacterManager.js",
    "script/Templates/Vampire.js",
    "script/Renders/RenderVampire.js",
    "script/Renders/Render.js"
];

/**.
 * Adiciona dinamicamente os scripts. 
 * OBS: Isso só será efetivamente adicionado ao criar uma página 
 * inicial de "Novo Personagem", pois, do contrário, há erros de 
 * referência.
**/
function addScripts() {
    let toAddScript;
    for(let script of scripts) {
        toAddScript = document.createElement('script');
        toAddScript.setAttribute('src', script);        
        document.head.appendChild(toAddScript);
    }
}

window.onload = () => {
    // addScripts();
    renderCharacter(globalChar);
    addSheetListeners(globalChar);
}

function idSeed() { return (Date.now() * Math.random());  }

function addAttrListerners(character) {
    let attributes = [character.mentalAttributes, character.physicalAttributes, character.socialAttributes];
    let itemList;
    
    // Seções de Atributos
    for(let x = 0; x < attributes.length; x++) {
        // Atributos da seção
        for(let i = 0; i < attributes[x].length; i++){
            itemList = document.getElementsByClassName(`rank-${attributes[x][i].class}`);
            // Cada input radio do atributo
            for(let j = 0; j < itemList.length; j++) {
                itemList[j].removeEventListener('click', setCharAttrRank);
                itemList[j].addEventListener('click', () => setCharAttrRank(x, i, j+1));
            }
        }
    }    
}

function addSkillsListerners(character) {
    let skills = [character.mentalSkills, character.physicalSkills, character.socialSkills];
    let itemList;
    
    // Seções de Habilidades
    for(let x = 0; x < skills.length; x++) {
        // Habilidades da seção
        for(let i = 0; i < skills[x].length; i++){
            itemList = document.getElementsByClassName(`rank-${skills[x][i].class}`);
            // Cada input radio da Habilidade
            for(let j = 0; j < itemList.length; j++) {
                itemList[j].removeEventListener('click', setCharSkillRank);
                itemList[j].addEventListener('click', () => setCharSkillRank(x, i, j+1));
            }
        }
    }
}

function addMoralityListeners() {
    let textList = document.getElementsByClassName('morality-text');
    let rankList = document.getElementsByClassName('morality-rank');
    for(let i = 0; i < textList.length; i++) {
        textList[i].removeEventListener('click', changeMoralityRankText);
        textList[i].addEventListener('blur', () => changeMoralityRankText(i, event.target.value));
    }
    
    for(let i = 0; i < rankList.length; i++) {
        rankList[i].removeEventListener('click', changeMoralityRank);
        rankList[i].addEventListener('blur', () => changeMoralityRank(i));
    }
}

function addPersonalTraitsListeners() {
    let appearance = document.getElementById('cofd-character-appearance');
    let story = document.getElementById('cofd-character-story');
    appearance.removeEventListener('blur', changeAppearance);
    appearance.addEventListener('blur', () => changeAppearance(event.target.value));
    story.removeEventListener('blur', changeStory);
    story.addEventListener('blur', () => changeStory(event.target.value));
}

function addEquipmentListeners() {}

function loadCharacter(event) {
    if(!event) return;
    var file = event.target.files[0];
    var reader = new FileReader();
    var contents;
    
    reader.onload = function(e) {
        contents = e.target.result;
        newChar = JSON.parse(contents);
        globalChar = new Character();
        globalChar.setCharacterFromCharacter(newChar);
        
        renderCharacter(globalChar);
        addSheetListeners(globalChar);
    };
    
    reader.readAsText(file);
    
    // Reset input value to allow uploading the same file again
    this.value = '';
}

function downloadCharacter() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalChar));
    var dlAnchorElem = document.getElementById('download-character');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "CofD-Character.json");
    dlAnchorElem.click();
}

function addSheetListeners() {
    addAttrListerners(globalChar);
    addSkillsListerners(globalChar);
    addMoralityListeners();
    addPersonalTraitsListeners();
    
    let fileUpload = document.getElementById("sheet-upload");
    fileUpload.removeEventListener('change', loadCharacter);
    fileUpload.addEventListener('change', loadCharacter);
}
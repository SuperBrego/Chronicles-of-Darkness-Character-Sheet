var vampireSection = document.getElementById('vampire-section');

/**
 * Renderiza a potência de sangue do vampiro.
 * @param {number} bloodPotency Potência de Sangue do vampiro.
**/
function renderBloodPotency(bloodPotency) {
    let bloodDiv = document.getElementById('vampire-bloodPotency');
    if(!bloodDiv) {
        bloodDiv = document.createElement('div');
    }
    else bloodDiv.innerHTML = '';
    bloodDiv.id = 'vampire-bloodPotency';

    let bloodPotencyTitle = document.createElement('header');
    bloodPotencyTitle.innerHTML = '<h2>Potência de Sangue</h2>';
    bloodDiv.appendChild(bloodPotencyTitle);
    
    let bloodBlock = document.createElement('div');
    bloodBlock.className = 'flex';
    let potencyRadio;
    for(let i = 0; i < 10; i++) {
        potencyRadio = document.createElement('input');
        potencyRadio.type = 'radio';
        if((bloodPotency - 1) >= i) potencyRadio.checked = true;
        potencyRadio.addEventListener('click', () => changeBloodPotency(i+1));
        bloodBlock.appendChild(potencyRadio);
    }

    bloodDiv.appendChild(bloodBlock);

    vampireSection.appendChild(bloodDiv);
}

/**
 * Renderiza as disciplinas do vampiro.
 * @param {Trait} disciplines Lista de Disciplinas.
**/
function renderDisciplines(disciplines) {

    // Lista de Disciplinas
    let disciplineList = globalChar.templateTraits.disciplines;


    let disciplinesBlock = document.getElementById('vampire-disciplines');
    if(!disciplinesBlock) {
        disciplinesBlock =  document.createElement('div');
        disciplinesBlock.id = 'vampire-disciplines';
    }
    else disciplinesBlock.innerHTML = '';

    // Título
    let disciplinesTitle = document.createElement('header');
    disciplinesTitle.innerHTML = '<h2>Disciplinas</h2>';

    // Adicionar Disciplina
    let addDiscBtn = document.createElement('button');
    addDiscBtn.innerHTML = 'Adicionar Disciplina';
    addDiscBtn.addEventListener('click', () => addDiscipline());

    // Selecionar Disciplina
    let selectAllBtn = document.createElement('button');
    selectAllBtn.innerHTML = 'Selecionar/Deselecionar Todos';
    selectAllBtn.id = "select-disciplines";
    selectAllBtn.addEventListener('click', () => selectAllTrait('vampire-disciplines', 'disciplines'));

    // Deletar Disciplina
    let deleteSelectedBtn = document.createElement('button');
    deleteSelectedBtn.innerHTML = 'Deletar Selecionados';
    deleteSelectedBtn.id = "delete-disciplines";
    deleteSelectedBtn.addEventListener('click', () => deleteSelectedTrait('vampire-disciplines', disciplineList, 'disciplines'));

    // Adicionar ao bloco.
    disciplinesBlock.append(disciplinesTitle, addDiscBtn, selectAllBtn, deleteSelectedBtn);

    // Desabilitar botões.
    selectAllBtn.disabled = (disciplineList.length > 0) ? false : true;
    deleteSelectedBtn.disabled = (disciplineList.length > 0) ? false : true;
    
    // Adicionar à seção.
    vampireSection.appendChild(disciplinesBlock);
    
    for(let discipline of disciplines) {
        createTraitBlock(discipline, 'vampire-disciplines', 'Disciplina', changeDisciplineName, changeDisciplineRank, changeDisciplineDescription, deleteDiscipline);
    }
}

/**
 * 
 * @param {*} vitae 
**/
function renderVampireVitae(vitae) {
    let vitaeBlock = document.getElementById('vampire-vitae');
    if(!vitaeBlock) {
        vitaeBlock =  document.createElement('div');
        vitaeBlock.id = 'vampire-vitae';
    }
    else vitaeBlock.innerHTML = '';

    let vitaeTitle = document.createElement('header');
    vitaeTitle.innerHTML = '<h2>Vitae</h2>';

    vitaeBlock.appendChild(vitaeTitle);

    let vitaeCheck;
    for(let i = 0; i < vitae.length; i++) {
        vitaeCheck = document.createElement('input');
        vitaeCheck.type = 'checkbox';
        if(vitae[i].state) vitaeCheck.checked = true;
        vitaeCheck.addEventListener('click', () => changeVitaeState(i));
        vitaeBlock.appendChild(vitaeCheck);
    }

    vampireSection.appendChild(vitaeBlock);
}

/**
 * Renderiza as fraquezas do vampiro.
 */
function renderBanes(baneList) {
    let baneBlock = document.getElementById('vampire-banes');
    if(!baneBlock) {
        baneBlock =  document.createElement('div');
        baneBlock.id = 'vampire-banes';
        // Adicionar à seção.
        vampireSection.appendChild(baneBlock);
    }
    else baneBlock.innerHTML = '';

    createTextList('vampire-banes', baneList, 'Fraquezas', addBane, renameBane, deleteBane);    
}

function renderDevotions(devotions) {
    let devotionBlock = document.getElementById('vampire-devotions');
    if(!devotionBlock) {
        devotionBlock =  document.createElement('div');
        devotionBlock.id = 'vampire-devotions';
        // Adicionar à seção.
        vampireSection.appendChild(devotionBlock);
    }
    else devotionBlock.innerHTML = '';

    createRanklessTraitList('vampire-devotions', devotions, 'Devoções', addDevotion, renameDevotion, changeDevotionDescription, deleteDevotion);
}

/**
 * Chamada para renderizar as características do Vampiro.
 * @param {Character} character 
 */
function renderVampireTraits(character) {
    vampireSection.innerHTML = '';

    let vampireTraits = character.templateTraits;

    renderDisciplines(vampireTraits.disciplines);
    renderBloodPotency(vampireTraits.bloodPotency);
    renderVampireVitae(vampireTraits.vitae);
    renderBanes(vampireTraits.banes);
    renderDevotions(vampireTraits.devotions);
}
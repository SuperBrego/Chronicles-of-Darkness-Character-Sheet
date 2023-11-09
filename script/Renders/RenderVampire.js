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
 * @param {Trait} disciplines 
**/
function renderDisciplines(disciplines) {

    let disciplinesBlock = document.getElementById('vampire-disciplines');
    if(!disciplinesBlock) {
        disciplinesBlock =  document.createElement('div');
        disciplinesBlock.id = 'vampire-disciplines';
    }
    else disciplinesBlock.innerHTML = '';

    let disciplinesTitle = document.createElement('header');
    disciplinesTitle.innerHTML = '<h2>Disciplinas</h2>';

    let addDiscBtn = document.createElement('button');
    addDiscBtn.innerHTML = 'Adicionar Disciplina';
    addDiscBtn.addEventListener('click', () => addDiscipline());

    disciplinesBlock.append(disciplinesTitle, addDiscBtn);
    
    vampireSection.appendChild(disciplinesBlock);
    
    for(let discipline of disciplines) createTraitBlock(discipline, 'vampire-disciplines', 'Disciplina'); 
}

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
 * Chamada para renderizar as características do Vampiro.
 * @param {Character} character 
 */
function renderVampireTraits(character) {
    vampireSection.innerHTML = '';

    let vampireTraits = character.templateTraits;

    renderDisciplines(vampireTraits.disciplines);
    renderBloodPotency(vampireTraits.bloodPotency);
    renderVampireVitae(vampireTraits.vitae);
}
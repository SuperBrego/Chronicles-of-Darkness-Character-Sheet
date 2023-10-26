
function renderVampireTraits(character) {
    // renderBloodPotency

    // renderDisciplines

    // Append Div das Disciplinas.
    let disciplinesBlock = document.createElement('div');
    disciplinesBlock.id = 'vampire-disciplines';

    let disciplinesTitle = document.createElement('header');
    disciplinesTitle.innerHTML = '<h2>Disciplinas</h2>';

    let addDiscBtn = document.createElement('button');
    addDiscBtn.innerHTML = 'Adicionar Disciplina';
    addDiscBtn.addEventListener('click', () => addDiscipline());

    disciplinesBlock.append(disciplinesTitle, addDiscBtn);


    document.querySelector('.cofd-sheet').appendChild(disciplinesBlock);
}
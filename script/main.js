const character = new Character();

function setCharAttrRank(type, index, rank) {
    let attribute = undefined;

    switch(type) {
        default:
        case 0: 
            attribute = character.mentalAttributes[index];
            if(!attribute) throw console.error("Não foi possível encontrar Index.");
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
        case 1: 
            attribute = character.physicalAttributes[index];
            if(!attribute) throw console.error("Não foi possível encontrar Index.");
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
        case 2: 
            attribute = character.socialAttributes[index];
            if(!attribute) throw console.error("Não foi possível encontrar Index.");
            attribute.rank = rank;
            setAttrRank(rank, attribute.class);
        break;
    }
}

/**
 * Realiza a marcação dos inputs radio conforme o novo valor de graduação.
 * @param {number} rank Graduação nova do Atributo.
 * @param {string} attr Atributo (Classe do Atributo em inglês) qual deve ser marcado os círculos.
 */
function setAttrRank(rank, attr) {
    let rankList = document.querySelectorAll(`.rank-${attr}`);
    for(let i = 0; i < rankList.length; i++) {
        if(i < rank) rankList[i].checked = true;
        else rankList[i].checked = false;
    }
}

/**
 * Altera o valor de graduação da Habilidade.
**/
function setCharSkillRank(type, index, rank) {
    let skill = undefined;
    let firstRank;

    switch(type) {
        case 0: 
            skill = character.mentalSkills[index];
            if(!skill) throw console.error("Não foi possível encontrar Index.");
            if(rank === 1 && skill.rank === 1) {
                skill.rank = 0;
                firstRank = document.querySelector(`.rank-${skill.class}`);
                firstRank.checked = false;
            }
            else {
                skill.rank = rank;
                setSkillRank(rank, skill.class);
            }
        break;
        case 1: 
            skill = character.physicalSkills[index];
            if(!skill) throw console.error("Não foi possível encontrar Index.");
            if(rank === 1 && skill.rank === 1) {
                skill.rank = 0;
                firstRank = document.querySelector(`.rank-${skill.class}`);
                firstRank.checked = false;
            }
            else {
                skill.rank = rank;
                setSkillRank(rank, skill.class);
            }
        break;
        case 2: 
            skill = character.socialSkills[index];
            if(!skill) throw console.error("Não foi possível encontrar Index.");
            if(rank === 1 && skill.rank === 1) {
                skill.rank = 0;
                firstRank = document.querySelector(`.rank-${skill.class}`);
                firstRank.checked = false;
            }
            else {
                skill.rank = rank;
                setSkillRank(rank, skill.class);
            }
        break;
    }
}

function setSkillRank(rank, attr) {
    let rankList = document.querySelectorAll(`.rank-${attr}`);
    for(let i = 0; i < rankList.length; i++) {
        if(i < rank) rankList[i].checked = true;
        else rankList[i].checked = false;
    }
}

function printCharacter() {
    console.log(character);
}
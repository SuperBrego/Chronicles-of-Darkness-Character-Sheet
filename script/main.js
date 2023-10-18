const character = new Character();

function setCharAttrRank(type, index, rank) {
    let attribute = undefined;

    switch(type) {
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

function setAttrRank(rank, attr) {
    let rankList = document.querySelectorAll(`.rank-${attr}`);
    for(let i = 0; i < rankList.length; i++) {
        if(i < rank) rankList[i].checked = true;
        else rankList[i].checked = false;
    }
}


function setCharSkillRank(type, index, rank) {
    let skill = undefined;

    switch(type) {
        case 0: 
            skill = character.mentalSkills[index];
            if(!skill) throw console.error("Não foi possível encontrar Index.");
            skill.rank = rank;
            setSkillRank(rank, skill.class);
        break;
        case 1: 
            skill = character.physicalSkills[index];
            if(!skill) throw console.error("Não foi possível encontrar Index.");
            skill.rank = rank;
            setSkillRank(rank, skill.class);
        break;
        case 2: 
            skill = character.socialSkills[index];
            if(!skill) throw console.error("Não foi possível encontrar Index.");
            skill.rank = rank;
            setSkillRank(rank, skill.class);
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
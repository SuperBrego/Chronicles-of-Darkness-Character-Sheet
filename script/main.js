
window.onload = () => {
    renderCharacter();
    addAttrListerners();
}

function addAttrListerners() {
    let mentalAttr = character.mentalAttributes;
    let itemList;
        
    // Mental
    for(let i = 0; i < mentalAttr.length; i++){
        itemList = document.getElementsByClassName(`rank-${mentalAttr[i].class}`);
        for(let j = 0; j < itemList.length; j++) {
            itemList[j].addEventListener('click', () => setCharAttrRank(0, i, j+1));
        }
    }
    
}

function idSeed() { return (Date.now() * Math.random());  }
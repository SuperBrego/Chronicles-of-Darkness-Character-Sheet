const SupernaturalTemp = {
    Mortal: 0,
    Vampire: 1,
    Ghoul: 2,
    Werewolf: 3,
    Changeling: 4,
    Mage: 5,
    Promethean: 6,
    Hunter: 7,
    Geist: 8,
    Mummy: 9,
    Demon: 10,
    Beast: 11,
    Deviant: 12
}

class Character {
    constructor(name = "Personagem") {
        this.name = name;
        this.template = SupernaturalTemp.Mortal;

        // Atributos Mentais
        this.mentalAttributes = [
            { index: 0, name: "Inteligência", rank: 1, class: "intelligence" },
            { index: 1, name: "Raciocínio", rank: 1, class: "wits" },
            { index: 2, name: "Perseverança", rank: 1, class: "resolve" },
        ];

        // Atributos Físicos
        this.physicalAttributes = [
            { index: 0, name: "Força", rank: 1, class: "strength" },
            { index: 1, name: "Destreza", rank: 1, class: "dexterity" },
            { index: 2, name: "Vigor", rank: 1, class: "stamina" },
        ];

        // Atributos Sociais
        this.socialAttributes = [
            { index: 0, name: "Presença", rank: 1, class: "presence" },
            { index: 1, name: "Manipulação", rank: 1, class: "manipulation" },
            { index: 2, name: "Autocontrole", rank: 1, class: "composure" },
        ];

        // Habilidades Mentais
        this.mentalSkills = [
            { index: 0, name: "Ciências", rank: 0, class: "science" },
            { index: 1, name: "Erudição", rank: 0, class: "academics" },
            { index: 2, name: "Informática", rank: 0, class: "computer" },
            { index: 3, name: "Investigação", rank: 0, class: "investigation" },
            { index: 4, name: "Medicina", rank: 0, class: "medicine" },
            { index: 5, name: "Ocultismo", rank: 0, class: "occult" },
            { index: 6, name: "Ofícios", rank: 0, class: "crafts" },
            { index: 7, name: "Política", rank: 0, class: "politics" },
        ];

        // Habilidades Físicas
        this.physicalSkills = [
            { index: 0, name: "Armamento", rank: 0, class: "weaponry" },
            { index: 1, name: "Armas de Fogo", rank: 0, class: "firearms" },
            { index: 2, name: "Briga", rank: 0, class: "brawl" },
            { index: 3, name: "Condução", rank: 0, class: "drive" },
            { index: 4, name: "Dissimulação", rank: 0, class: "stealth" },
            { index: 5, name: "Esportes", rank: 0, class: "athletics" },
            { index: 6, name: "Furto", rank: 0, class: "larceny" },
            { index: 7, name: "Sobrevivência", rank: 0, class: "survival" },
        ];

        // Habilidades Sociais
        this.socialSkills = [
            { index: 0, name: "Astúcia", rank: 0, class: "subterfuge" },
            { index: 1, name: "Empatia", rank: 0, class: "empathy" },
            { index: 2, name: "Expressão", rank: 0, class: "expression" },
            { index: 3, name: "Intimidação", rank: 0, class: "intimidation" },
            { index: 4, name: "Manha", rank: 0, class: "streetwise" },
            { index: 5, name: "Persuasão", rank: 0, class: "persuasion" },
            { index: 6, name: "Socialização", rank: 0, class: "socialize" },
            { index: 7, name: "Tratar Animais", rank: 0, class: "animalKen" },
        ];

        // Modelo Sobrenatural
        function getSupernaturalTemplate() { return this.template; }
        function setSupernaturalTemplate(template) { this.template = template; }

        // Get Atributos
        function getMentalAttr(index)   { return this.mentalAttributes.find(elem => elem.index === index); }
        function getPhysicalAttr(index) { return this.physicalAttributes.find(elem => elem.index === index); }
        function getSocialAttr(index)   { return this.socialAttributes.find(elem => elem.index === index); }

        // Set Atributos
        function setMentalAttr(index, rank) {
            let mentalAttr = this.mentalAttributes.find(elem => elem.index === index); 
            if(mentalAttr) mentalAttr.rank = rank;
        }

        function setPhysicalAttr(index, rank) {
            let physicAttr = this.physicalAttributes.find(elem => elem.index === index); 
            if(physicAttr) physicAttr.rank = rank;
        }
        
        function setSocialAttr(index, rank) {
            let socialAttr = this.socialAttributes.find(elem => elem.index === index); 
            if(socialAttr) socialAttr.rank = rank;
        }

        // Get Atributos Mentais
        function getIntelligence()  { return this.mentalAttributes[0].rank; }
        function getWits()          { return this.mentalAttributes[1].rank; }
        function getResolve()       { return this.mentalAttributes[2].rank; }
        
        // Get Atributos Físicos
        function getStrength()      { return this.physicalAttributes[0].rank; }
        function getDexterity()     { return this.physicalAttributes[1].rank; }
        function getStamina()       { return this.physicalAttributes[2].rank; }
        
        // Get Atributos Sociais
        function getPresence()      { return this.socialAttributes[0].rank; }
        function getManipulation()  { return this.socialAttributes[1].rank; }
        function getComposure()     { return this.socialAttributes[2].rank; }

        // ***************************************************************** //
        // Get Habilidades
        function getMentalSkill(index)   { return this.mentalSkills.find(elem => elem.index === index); }
        function getPhysicalSkill(index) { return this.physicalSkills.find(elem => elem.index === index); }
        function getSocialSkill(index)   { return this.socialSkills.find(elem => elem.index === index); }

        // Set Habilidades
        function setMentalSkill(index, rank) {
            let mentalSkill = this.mentalSkills.find(elem => elem.index === index); 
            if(mentalSkill) mentalSkill.rank = rank;
        }

        function setPhysicalSkill(index, rank) {
            let physicSkill = this.physicalSkills.find(elem => elem.index === index); 
            if(physicSkill) physicSkill.rank = rank;
        }

        function setSocialSkill(index, rank) {
            let socialSkill = this.socialSkills.find(elem => elem.index === index); 
            if(socialSkill) socialSkill.rank = rank;
        }

        // Get Habilidades Mentais
        function getScience()       { return this.mentalSkills[0].rank; }
        function getAcademics()     { return this.mentalSkills[1].rank; }
        function getComputer()      { return this.mentalSkills[2].rank; }
        function getInvestigation() { return this.mentalSkills[3].rank; }
        function getMedicine()      { return this.mentalSkills[4].rank; }
        function getOccult()        { return this.mentalSkills[5].rank; }
        function getCrafts()        { return this.mentalSkills[6].rank; }
        function getPolitics()      { return this.mentalSkills[7].rank; }

        // Get Habilidades Físicas
        function getWeaponry()      { return this.physicalSkills[0].rank; }
        function getFirearms()      { return this.physicalSkills[1].rank; }
        function getBrawl()         { return this.physicalSkills[2].rank; }
        function getDrive()         { return this.physicalSkills[3].rank; }
        function getStealth()       { return this.physicalSkills[4].rank; }
        function getAthletics()     { return this.physicalSkills[5].rank; }
        function getLarceny()       { return this.physicalSkills[6].rank; }
        function getSurvival()      { return this.physicalSkills[7].rank; }

        // Get Habilidades Sociais
        function getSubterfuge()    { return this.socialSkills[0].rank; }
        function getEmpathy()       { return this.socialSkills[1].rank; }
        function getExpression()    { return this.socialSkills[2].rank; }
        function getIntimidation()  { return this.socialSkills[3].rank; }
        function getStreetwise()    { return this.socialSkills[4].rank; }
        function getPersuasion()    { return this.socialSkills[5].rank; }
        function getSocialize()     { return this.socialSkills[6].rank; }
        function getAnimalKen()     { return this.socialSkills[7].rank; }

        // Get Classe Habilidades Mentais
        function getScienceClass()       { return this.mentalSkills[0].class; }
        function getAcademicsClass()     { return this.mentalSkills[1].class; }
        function getComputerClass()      { return this.mentalSkills[2].class; }
        function getInvestigationClass() { return this.mentalSkills[3].class; }
        function getMedicineClass()      { return this.mentalSkills[4].class; }
        function getOccultClass()        { return this.mentalSkills[5].class; }
        function getCraftsClass()        { return this.mentalSkills[6].class; }
        function getPoliticsClass()      { return this.mentalSkills[7].class; }
        
        // Get Classe Habilidades Físicas
        function getWeaponryClass()      { return this.physicalSkills[0].class; }
        function getFirearmsClass()      { return this.physicalSkills[1].class; }
        function getBrawlClass()         { return this.physicalSkills[2].class; }
        function getDriveClass()         { return this.physicalSkills[3].class; }
        function getStealthClass()       { return this.physicalSkills[4].class; }
        function getAthleticsClass()     { return this.physicalSkills[5].class; }
        function getLarcenyClass()       { return this.physicalSkills[6].class; }
        function getSurvivalClass()      { return this.physicalSkills[7].class; }
        
        // Get Classe Habilidades Sociais
        function getSubterfugeClass()    { return this.socialSkills[0].class; }
        function getEmpathyClass()       { return this.socialSkills[1].class; }
        function getExpressionClass()    { return this.socialSkills[2].class; }
        function getIntimidationClass()  { return this.socialSkills[3].class; }
        function getStreetwiseClass()    { return this.socialSkills[4].class; }
        function getPersuasionClass()    { return this.socialSkills[5].class; }
        function getSocializeClass()     { return this.socialSkills[6].class; }
        function getAnimalKenClass()     { return this.socialSkills[7].class; }

        // Set Habilidades Mentais
        function setScience(rank)       { this.mentalSkills[0].rank = rank; }
        function setAcademics(rank)     { this.mentalSkills[1].rank = rank; }
        function setComputer(rank)      { this.mentalSkills[2].rank = rank; }
        function setInvestigation(rank) { this.mentalSkills[3].rank = rank; }
        function setMedicine(rank)      { this.mentalSkills[4].rank = rank; }
        function setOccult(rank)        { this.mentalSkills[5].rank = rank; }
        function setCrafts(rank)        { this.mentalSkills[6].rank = rank; }
        function setPolitics(rank)      { this.mentalSkills[7].rank = rank; }

        // Set Habilidades Físicas
        function setWeaponry(rank)      { this.physicalSkills[0].rank = rank; }
        function setFirearms(rank)      { this.physicalSkills[1].rank = rank; }
        function setBrawl(rank)         { this.physicalSkills[2].rank = rank; }
        function setDrive(rank)         { this.physicalSkills[3].rank = rank; }
        function setStealth(rank)       { this.physicalSkills[4].rank = rank; }
        function setAthletics(rank)     { this.physicalSkills[5].rank = rank; }
        function setLarceny(rank)       { this.physicalSkills[6].rank = rank; }
        function setSurvival(rank)      { this.physicalSkills[7].rank = rank; }

        // Set Habilidades Sociais
        function setSubterfuge(rank)    { this.socialSkills[0].rank = rank; }
        function setEmpathy(rank)       { this.socialSkills[1].rank = rank; }
        function setExpression(rank)    { this.socialSkills[2].rank = rank; }
        function setIntimidation(rank)  { this.socialSkills[3].rank = rank; }
        function setStreetwise(rank)    { this.socialSkills[4].rank = rank; }
        function setPersuasion(rank)    { this.socialSkills[5].rank = rank; }
        function setSocialize(rank)     { this.socialSkills[6].rank = rank; }
        function setAnimalKen(rank)     { this.socialSkills[7].rank = rank; }

    }
}
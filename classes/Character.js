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

const clanOptions = ['Daeva', 'Gangrel', 'Mekhet', 'Nosferatu', 'Ventrue'];

function getTemplateInfo(supernaturalTemplate) {

    switch(supernaturalTemplate) {
        default:
        case SupernaturalTemp.Mortal: return { 
            templateIndex: SupernaturalTemp.Mortal,
            virtue: "", 
            vice: "", 
            age: 30, 
            faction: "",
            integrity: 7 
        };
        case SupernaturalTemp.Vampire: return {
            templateIndex: SupernaturalTemp.Vampire,
            clan: '',
            mask: '',
            dirge: '',
            bloodline: '',
            covenant: '',
        }
        case SupernaturalTemp.Deviant: return {
            templateIndex: SupernaturalTemp.Deviant,
            convictions: [],
            loyalty: [],
            scars: [],
            variations: [],
            stability: []
        };

    }
}

class Character {

    constructor(name = "Personagem") {
        this.name = name;
        this.player = '';
        this.concept = '';
        this.chronicle = '';
        this.group = '';

        this.template = SupernaturalTemp.Mortal;
        this.templateInfo = getTemplateInfo(this.template);

        this.health = () => {
            let x = [];
            for(let i = 0; i < 20; i++) x.push({index: i, state: 0});
            return x;
        };
          
        // = [
        //     {index: 0, state: 0},
        //     {index: 1, state: 0},
        //     {index: 2, state: 0},
        //     {index: 3, state: 0},
        //     {index: 4, state: 0},
        //     {index: 5, state: 0},
        //     {index: 6, state: 0},
        //     {index: 7, state: 0},
        //     {index: 8, state: 0},
        //     {index: 9, state: 0},
        //     {index: 10, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        //     {index: 11, state: 0},
        // ];

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

        this.stamina = this.physicalAttributes[2].rank;

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

        this.size = 5;
        this.merits = [];

        // ******************************************************************** //
        // ******************************************************************** //
        // Modelo Sobrenatural
        this.getSupernaturalTemplate = ()  => { return this.template; }
        this.setSupernaturalTemplate = (template) => { 
            this.template = template; 
            this.templateInfo = this.getTemplateInfo(template);
        }

        // Get Atributos
        this.getMentalAttr = (index) => { return this.mentalAttributes.find(elem => elem.index === index); }
        this.getPhysicalAttr = (index) => { return this.physicalAttributes.find(elem => elem.index === index); }
        this.getSocialAttr = (index) => { return this.socialAttributes.find(elem => elem.index === index); }

        // Set Atributos
        this.setMentalAttr = (index, rank) => {
            let mentalAttr = this.mentalAttributes.find(elem => elem.index === index); 
            if(mentalAttr) mentalAttr.rank = rank;
        }

        this.setPhysicalAttr = (index, rank) => {
            let physicAttr = this.physicalAttributes.find(elem => elem.index === index); 
            if(physicAttr) physicAttr.rank = rank;
        }
        
        this.setSocialAttr = (index, rank) => {
            let socialAttr = this.socialAttributes.find(elem => elem.index === index); 
            if(socialAttr) socialAttr.rank = rank;
        }

        // Get Atributos Mentais
        this.getIntelligence = () => { return this.mentalAttributes[0].rank; }
        this.getWits = () => { return this.mentalAttributes[1].rank; }
        this.getResolve = () => { return this.mentalAttributes[2].rank; }
        
        // Get Atributos Físicos
        this.getStrength = () => { return this.physicalAttributes[0].rank; }
        this.getDexterity = () => { return this.physicalAttributes[1].rank; }
        this.getStamina = () => { return this.physicalAttributes[2].rank; }
        
        // Get Atributos Sociais
        this.getPresence = () => { return this.socialAttributes[0].rank; }
        this.getManipulation = () => { return this.socialAttributes[1].rank; }
        this.getComposure = () => { return this.socialAttributes[2].rank; }

        // ***************************************************************** //
        // Get Habilidades
        this.getMentalSkill = (index) => { return this.mentalSkills.find(elem => elem.index === index); }
        this.getPhysicalSkill = (index) => { return this.physicalSkills.find(elem => elem.index === index); }
        this.getSocialSkill = (index) => { return this.socialSkills.find(elem => elem.index === index); }

        // Set Habilidades
        this.setMentalSkill = (index, rank) => {
            let mentalSkill = this.mentalSkills.find(elem => elem.index === index); 
            if(mentalSkill) mentalSkill.rank = rank;
        }

        this.setPhysicalSkill = (index, rank) => {
            let physicSkill = this.physicalSkills.find(elem => elem.index === index); 
            if(physicSkill) physicSkill.rank = rank;
        }

        this.setSocialSkill = (index, rank) => {
            let socialSkill = this.socialSkills.find(elem => elem.index === index); 
            if(socialSkill) socialSkill.rank = rank;
        }

        // Get Habilidades Mentais
        this.getScience         = () => { return this.mentalSkills[0].rank; }
        this.getAcademics       = () => { return this.mentalSkills[1].rank; }
        this.getComputer        = () => { return this.mentalSkills[2].rank; }
        this.getInvestigation   = () => { return this.mentalSkills[3].rank; }
        this.getMedicine        = () => { return this.mentalSkills[4].rank; }
        this.getOccult          = () => { return this.mentalSkills[5].rank; }
        this.getCrafts          = () => { return this.mentalSkills[6].rank; }
        this.getPolitics        = () => { return this.mentalSkills[7].rank; }

        // Get Habilidades Físicas
        this.getWeaponry    = () => { return this.physicalSkills[0].rank; }
        this.getFirearms    = () => { return this.physicalSkills[1].rank; }
        this.getBrawl       = () => { return this.physicalSkills[2].rank; }
        this.getDrive       = () => { return this.physicalSkills[3].rank; }
        this.getStealth     = () => { return this.physicalSkills[4].rank; }
        this.getAthletics   = () => { return this.physicalSkills[5].rank; }
        this.getLarceny     = () => { return this.physicalSkills[6].rank; }
        this.getSurvival    = () => { return this.physicalSkills[7].rank; }

        // Get Habilidades Sociais
        this.getSubterfuge      = () => { return this.socialSkills[0].rank; }
        this.getEmpathy         = () => { return this.socialSkills[1].rank; }
        this.getExpression      = () => { return this.socialSkills[2].rank; }
        this.getIntimidation    = () => { return this.socialSkills[3].rank; }
        this.getStreetwise      = () => { return this.socialSkills[4].rank; }
        this.getPersuasion      = () => { return this.socialSkills[5].rank; }
        this.getSocialize       = () => { return this.socialSkills[6].rank; }
        this.getAnimalKen       = () => { return this.socialSkills[7].rank; }

        // Get Classe Habilidades Mentais
        this.getScienceClass        = () => { return this.mentalSkills[0].class; }
        this.getAcademicsClass      = () => { return this.mentalSkills[1].class; }
        this.getComputerClass       = () => { return this.mentalSkills[2].class; }
        this.getInvestigationClass  = () => { return this.mentalSkills[3].class; }
        this.getMedicineClass       = () => { return this.mentalSkills[4].class; }
        this.getOccultClass         = () => { return this.mentalSkills[5].class; }
        this.getCraftsClass         = () => { return this.mentalSkills[6].class; }
        this.getPoliticsClass       = () => { return this.mentalSkills[7].class; }
        
        // Get Classe Habilidades Físicas
        this.getWeaponryClass   = () => { return this.physicalSkills[0].class; }
        this.getFirearmsClass   = () => { return this.physicalSkills[1].class; }
        this.getBrawlClass      = () => { return this.physicalSkills[2].class; }
        this.getDriveClass      = () => { return this.physicalSkills[3].class; }
        this.getStealthClass    = () => { return this.physicalSkills[4].class; }
        this.getAthleticsClass  = () => { return this.physicalSkills[5].class; }
        this.getLarcenyClass    = () => { return this.physicalSkills[6].class; }
        this.getSurvivalClass   = () => { return this.physicalSkills[7].class; }
        
        // Get Classe Habilidades Sociais
        this.getSubterfugeClass     = () => { return this.socialSkills[0].class; }
        this.getEmpathyClass        = () => { return this.socialSkills[1].class; }
        this.getExpressionClass     = () => { return this.socialSkills[2].class; }
        this.getIntimidationClass   = () => { return this.socialSkills[3].class; }
        this.getStreetwiseClass     = () => { return this.socialSkills[4].class; }
        this.getPersuasionClass     = () => { return this.socialSkills[5].class; }
        this.getSocializeClass      = () => { return this.socialSkills[6].class; }
        this.getAnimalKenClass      = () => { return this.socialSkills[7].class; }

        // Set Habilidades Mentais
        this.setScience         = (rank) => { this.mentalSkills[0].rank = rank; }
        this.setAcademics       = (rank) => { this.mentalSkills[1].rank = rank; }
        this.setComputer        = (rank) => { this.mentalSkills[2].rank = rank; }
        this.setInvestigation   = (rank) => { this.mentalSkills[3].rank = rank; }
        this.setMedicine        = (rank) => { this.mentalSkills[4].rank = rank; }
        this.setOccult          = (rank) => { this.mentalSkills[5].rank = rank; }
        this.setCrafts          = (rank) => { this.mentalSkills[6].rank = rank; }
        this.setPolitics        = (rank) => { this.mentalSkills[7].rank = rank; }

        // Set Habilidades Físicas
        this.setWeaponry    = (rank) => { this.physicalSkills[0].rank = rank; }
        this.setFirearms    = (rank) => { this.physicalSkills[1].rank = rank; }
        this.setBrawl       = (rank) => { this.physicalSkills[2].rank = rank; }
        this.setDrive       = (rank) => { this.physicalSkills[3].rank = rank; }
        this.setStealth     = (rank) => { this.physicalSkills[4].rank = rank; }
        this.setAthletics   = (rank) => { this.physicalSkills[5].rank = rank; }
        this.setLarceny     = (rank) => { this.physicalSkills[6].rank = rank; }
        this.setSurvival    = (rank) => { this.physicalSkills[7].rank = rank; }

        // Set Habilidades Sociais
        this.setSubterfuge      = (rank) => { this.socialSkills[0].rank = rank; }
        this.setEmpathy         = (rank) => { this.socialSkills[1].rank = rank; }
        this.setExpression      = (rank) => { this.socialSkills[2].rank = rank; }
        this.setIntimidation    = (rank) => { this.socialSkills[3].rank = rank; }
        this.setStreetwise      = (rank) => { this.socialSkills[4].rank = rank; }
        this.setPersuasion      = (rank) => { this.socialSkills[5].rank = rank; }
        this.setSocialize       = (rank) => { this.socialSkills[6].rank = rank; }
        this.setAnimalKen       = (rank) => { this.socialSkills[7].rank = rank; }

        this.willpower  = this.getResolve() + this.getComposure();
        this.defense    = Math.min(this.getWits(), this.getDexterity()) + this.getAthletics();
        this.initiative = this.getDexterity() + this.getComposure();
        this.speed      = this.getStrength() + this.getDexterity() + 5;
    }
}
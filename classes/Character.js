

function createStateTrack(qtn, state = true) {
    let x = [];
    for(let i = 0; i < qtn; i++) x.push({state: state});
    return x;
}

function getTemplateTraits(supernaturalTemplate) {
    
    switch(supernaturalTemplate) {
        default:
        case SupernaturalTemplates.Mortal: return { 
            index: SupernaturalTemplates.Mortal,
            book: 'CotD',
            virtue: "", 
            vice: "", 
            age: 30, 
            faction: "",
            moralityType: 'Integridade',
            moralityTrait: ['','','','','','','','','','',''],
            morality: 7,
        };
        case SupernaturalTemplates.Vampire: return {
            index: SupernaturalTemplates.Vampire,
            book: 'VtR',
            bloodPotency: 1,
            moralityType: 'Humanidade',
            moralityTrait: ['','','','','','','','','','',''],
            morality: 7,
            clan: '',
            mask: '',
            dirge: '',
            bloodline: '',
            covenant: '',
            vitae: createStateTrack(75, false), // [state: x]
            disciplines: [], // • Nome e descrições
            banes: [], // Array de strings
            devotions: [], // Name • Cost • Discipline • Dice Pool • Book (trocar por descrição)
            ritesMiracles: [], // Name • Level
            vinculum: [], // Bounded To • Stage
            havens: [], // Location • Description
        };
        case SupernaturalTemplates.Werewolf: return {
            index: SupernaturalTemplates.Werewolf,
            book: 'WtF',
            primalUrge: 0,
            essense: [],
            renown: {
                purity: 0,
                glory: 0,
                honor: 0,
                wisdom: 0,
                cunning: 0
            },
            triggers: {
                passive: '',
                common: '',
                specific: ''
            },
            gifts: {
                moon: [],
                shadow: [],
                wolf: []
            },
            rites: [],
            totem: {
                name: '',
                power: 1,
                finesse: 1,
                resistance: 1,
                willpower: [],
                essence: [],
                initiative: 0, 
                defense: 0,
                speed: 0,
                size: 0,
                corpus: 0,
                influences: [], // texto e círculo
                aspiration: '',
                numina: '',
                bonuses: '',
                ban: '',
                bane: ''
            }, 
            // Permitir copiar totem para outras fichas.
        }
        case SupernaturalTemplates.Deviant: return {
            index: SupernaturalTemplates.Deviant,
            book: 'DtR',
            convictions: [],
            loyalty: [],
            scars: [],
            variations: [], 
            stability: [],
        };
        
    }
}

function makeHealth() {
    let x = [];
    for(let i = 0; i < 20; i++) x.push({state: 0});
    return x;
}

class Character {
    
    constructor(name = "Personagem") {
        this.name = name;
        this.player = '';
        this.concept = '';
        this.chronicle = '';
        this.group = '';
        
        this.template = SupernaturalTemplates.Vampire//Mortal;
        this.templateTraits = getTemplateTraits(this.template);
        
        this.health = makeHealth();
        this.willpower = createStateTrack(15);
        
        this.size = 5;
        this.merits = [];
        
        // Vitalidade Extra?
        this.extraVitality = 0;
        
        this.conditions = [];
        this.aspirations = [];
        // Armadura
        // Armadura Extra?
        this.story = '';
        this.appearance = '';

        this.touchstones = []; // Nome • Descrição.
        
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
        
        this.equipments = [];
        this.weapons = [];
        this.armors = [];
    }
    
    setCharacterFromCharacter(character) {
        this.name = character.name;
        this.player = character.player;
        this.concept = character.concept;
        this.chronicle = character.chronicle;
        this.group = character.group;
        this.health = character.health;
        this.willpower = character.willpower;
        this.size = character.size;
        this.merits = character.merits;
        this.mentalAttributes = character.mentalAttributes;
        this.physicalAttributes = character.physicalAttributes;
        this.socialAttributes = character.socialAttributes;
        this.mentalSkills = character.mentalSkills;
        this.physicalSkills = character.physicalSkills;
        this.socialSkills = character.socialSkills;
        this.extraVitality = character.extraVitality;
        this.conditions = character.conditions;
        this.aspirations = character.aspirations;
        this.story = character.story;
        this.appearance = character.appearance;
        
        this.template = character.template;
        this.templateTraits = character.templateTraits;
        this.touchstones = character.touchstones;
    }
    
    // Vitalidade: Tamanho + Vigor
    get healthPoints() { return Number(this.size) + Number(this.physicalAttributes[2].rank); }
    
    // Força de Vontade: Perseverança + Autocontrole.
    get willpowerPoints() {
        return Number(this.mentalAttributes[2].rank) + Number(this.socialAttributes[2].rank);
    }
    // Defesa: Menor entre Raciocínio e Destreza + Esportes.
    get defense() { 
        return Math.min(this.mentalAttributes[1].rank, this.physicalAttributes[1].rank) + this.physicalSkills[5].rank; 
    }
    // Initiativa: Destreza + Autocontrole.
    get initiative() { return this.physicalAttributes[1].rank + this.socialAttributes[2].rank; }
    
    // Força 0 + Destreza 1 + 5
    get speed() { return this.physicalAttributes[0].rank + this.physicalAttributes[1].rank + 5; }
    
    // ******************************************************************** //
    // ******************************************************************** //
    // Modelo Sobrenatural
    get supernaturalTemplate() { return this.template; }
    set supernaturalTemplate (template) { 
        this.template = template; 
        this.templateTraits = this.getTemplateInfo(template);
    }
    
    // Get Atributos
    getMentalAttr(index)   { return this.mentalAttributes.find(elem => elem.index === index); }
    getPhysicalAttr(index) { return this.physicalAttributes.find(elem => elem.index === index); }
    getSocialAttr(index)   { return this.socialAttributes.find(elem => elem.index === index); }
    
    getMentalAttrClass(index)   { 
        let attr = this.getMentalAttr(index);
        if(attr) return attr.class;
        else throw new Error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
    }
    getPhysicalAttrClass(index) { 
        let attr = this.getPhysicalAttr(index);
        if(attr) return attr.class;
        else throw new Error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
    }
    getSocialAttrClass(index)   { 
        let attr = this.getSocialAttr(index);
        if(attr) return attr.class;
        else throw new Error(`Não foi possível encontrar Index. Index encontrado: ${index}`);
    }
    
    // Set Atributos
    setMentalAttr(index, rank) {
        let mentalAttr = this.mentalAttributes.find(elem => elem.index === index); 
        if(mentalAttr) mentalAttr.rank = rank;
        else throw new Error(`Não foi possível encontrar Index Mental. Index encontrado: ${index}.`);
    }
    
    setPhysicalAttr(index, rank) {
        let physicAttr = this.physicalAttributes.find(elem => elem.index === index); 
        if(physicAttr) physicAttr.rank = rank;
        else throw new Error(`Não foi possível encontrar Index Físico. Index encontrado: ${index}.`);
    }
    
    setSocialAttr(index, rank) {
        let socialAttr = this.socialAttributes.find(elem => elem.index === index); 
        if(socialAttr) socialAttr.rank = rank;
        else throw new Error(`Não foi possível encontrar Index Social. Index encontrado: ${index}.`);
    }
    
    // Get Atributos Mentais
    get intelligence()  { return this.mentalAttributes[0].rank; }
    get wits()          { return this.mentalAttributes[1].rank; }
    get resolve()       { return this.mentalAttributes[2].rank; }
    
    // Get Atributos Físicos
    get strength()      { return this.physicalAttributes[0].rank; }
    get dexterity()     { return this.physicalAttributes[1].rank; }
    get stamina()       { return this.physicalAttributes[2].rank; }
    
    // Get Atributos Sociais
    get presence()      { return this.socialAttributes[0].rank; }
    get manipulation()  { return this.socialAttributes[1].rank; }
    get composure()     { return this.socialAttributes[2].rank; }
    
    // ***************************************************************** //
    // Get Habilidades Mentais
    get science()       { return this.mentalSkills[0].rank; }
    get academics()     { return this.mentalSkills[1].rank; }
    get computer()      { return this.mentalSkills[2].rank; }
    get investigation() { return this.mentalSkills[3].rank; }
    get medicine()      { return this.mentalSkills[4].rank; }
    get occult()        { return this.mentalSkills[5].rank; }
    get crafts()        { return this.mentalSkills[6].rank; }
    get politics()      { return this.mentalSkills[7].rank; }
    
    // Get Habilidades Físicas
    get weaponry()  { return this.physicalSkills[0].rank; }
    get firearms()  { return this.physicalSkills[1].rank; }
    get brawl()     { return this.physicalSkills[2].rank; }
    get drive()     { return this.physicalSkills[3].rank; }
    get stealth()   { return this.physicalSkills[4].rank; }
    get athletics() { return this.physicalSkills[5].rank; }
    get larceny()   { return this.physicalSkills[6].rank; }
    get survival()  { return this.physicalSkills[7].rank; }
    
    // Get Habilidades Sociais
    get subterfuge()    { return this.socialSkills[0].rank; }
    get empathy()       { return this.socialSkills[1].rank; }
    get expression()    { return this.socialSkills[2].rank; }
    get intimidation()  { return this.socialSkills[3].rank; }
    get streetwise()    { return this.socialSkills[4].rank; }
    get persuasion()    { return this.socialSkills[5].rank; }
    get socialize()     { return this.socialSkills[6].rank; }
    get animalKen()     { return this.socialSkills[7].rank; }
    
    // Get Classe Habilidades Mentais
    get scienceClass()          { return this.mentalSkills[0].class; }
    get academicsClass()        { return this.mentalSkills[1].class; }
    get computerClass()         { return this.mentalSkills[2].class; }
    get investigationClass()    { return this.mentalSkills[3].class; }
    get medicineClass()         { return this.mentalSkills[4].class; }
    get occultClass()           { return this.mentalSkills[5].class; }
    get craftsClass()           { return this.mentalSkills[6].class; }
    get politicsClass()         { return this.mentalSkills[7].class; }
    
    // Get Classe Habilidades Físicas
    get WeaponryClass()  { return this.physicalSkills[0].class; }
    get FirearmsClass()  { return this.physicalSkills[1].class; }
    get BrawlClass()     { return this.physicalSkills[2].class; }
    get DriveClass()     { return this.physicalSkills[3].class; }
    get StealthClass()   { return this.physicalSkills[4].class; }
    get AthleticsClass() { return this.physicalSkills[5].class; }
    get LarcenyClass()   { return this.physicalSkills[6].class; }
    get SurvivalClass()  { return this.physicalSkills[7].class; }
    
    // Get Classe Habilidades Sociais
    get SubterfugeClass()    { return this.socialSkills[0].class; }
    get EmpathyClass()       { return this.socialSkills[1].class; }
    get ExpressionClass()    { return this.socialSkills[2].class; }
    get IntimidationClass()  { return this.socialSkills[3].class; }
    get StreetwiseClass()    { return this.socialSkills[4].class; }
    get PersuasionClass()    { return this.socialSkills[5].class; }
    get SocializeClass()     { return this.socialSkills[6].class; }
    get AnimalKenClass()     { return this.socialSkills[7].class; }
    
    // Set Habilidades Mentais
    set science(rank)   { this.mentalSkills[0].rank = rank; }
    set academics(rank) { this.mentalSkills[1].rank = rank; }
    set computer(rank)  { this.mentalSkills[2].rank = rank; }
    set investigation(rank) { this.mentalSkills[3].rank = rank; }
    set medicine(rank)  { this.mentalSkills[4].rank = rank; }
    set occult(rank)    { this.mentalSkills[5].rank = rank; }
    set crafts(rank)    { this.mentalSkills[6].rank = rank; }
    set politics(rank)  { this.mentalSkills[7].rank = rank; }
    
    // Set Habilidades Físicas
    set weaponry(rank)  { this.physicalSkills[0].rank = rank; }
    set firearms(rank)  { this.physicalSkills[1].rank = rank; }
    set brawl(rank)     { this.physicalSkills[2].rank = rank; }
    set drive(rank)     { this.physicalSkills[3].rank = rank; }
    set stealth(rank)   { this.physicalSkills[4].rank = rank; }
    set athletics(rank) { this.physicalSkills[5].rank = rank; }
    set larceny(rank)   { this.physicalSkills[6].rank = rank; }
    set survival(rank)  { this.physicalSkills[7].rank = rank; }
    
    // Set Habilidades Sociais
    set subterfuge(rank)    { this.socialSkills[0].rank = rank; }
    set empathy(rank)       { this.socialSkills[1].rank = rank; }
    set expression(rank)    { this.socialSkills[2].rank = rank; }
    set intimidation(rank)  { this.socialSkills[3].rank = rank; }
    set streetwise(rank)    { this.socialSkills[4].rank = rank; }
    set persuasion(rank)    { this.socialSkills[5].rank = rank; }
    set socialize (rank)    { this.socialSkills[6].rank = rank; }
    set animalKen (rank)    { this.socialSkills[7].rank = rank; }
}

var globalChar = new Character();
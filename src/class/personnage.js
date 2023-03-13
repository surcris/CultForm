export default class Personnage{
    vieMax;
    vieAct;
    nom;
    niveau;
    eau;
    feu;
    air
    terre;
    puissance;
    dommage;
    degatBrut;
    resEau;
    resFeu;
    resTerre;
    resAir;
    resBrut;
    xp;
    expLvl;
    pointCompetence;
    pointElementaire;
    
    constructor(nom){

        this.nom = nom;
        this.vieMax = 100;
        this.vieAct = this.vieMax;
        this.niveau = 1;
        this.xp = 0;
        this.expLvl = 200*this.niveau*(1+this.niveau);;
        this.eau = 10;
        this.feu = 10;
        this.air = 10;
        this.terre = 10;
        this.puissance = 30;
        this.dommage = 5;
        this.degatBrut =0;
        this.resEau = 5;
        this.resFeu = 5;
        this.resTerre = 5;
        this.resAir = 5;
        this.resBrut = 0;
        this.pointCompetence = 0;
        this.pointElementaire = 0;

    }
    resetPerso(){
        this.nom = '';
        this.vieMax = 100;
        this.vieAct = this.vieMax;
        this.niveau = 1;
        this.xp = 0;
        this.expLvl = 200*this.niveau*(1+this.niveau);;
        this.eau = 10;
        this.feu = 10;
        this.air = 10;
        this.terre = 10;
        this.puissance = 30;
        this.dommage = 5;
        this.degatBrut =0;
        this.resEau = 5;
        this.resFeu = 5;
        this.resTerre = 5;
        this.resAir = 5;
        this.resBrut = 0;
        this.pointCompetence = 0;
        this.pointElementaire = 0;
    }
    initStat(niveau,resEau,resFeu,resTerre,resAir,resBrut){

        this.niveau = niveau;
        this.vieMax = 100 + (niveau*50);
        this.vieAct = this.vieMax;
        this.resEau = resEau;
        this.resFeu = resFeu;
        this.resTerre = resTerre;
        this.resAir = resAir;
        this.resBrut = resBrut;
    }
    display(){
        console.log(this.getNom()," lvl ",this.getNiveau());
        console.log("Xp : ",this.xp," / ",this.expLvl);
        this.displayDegat();
        this.displayResi();
    }
    
    displayDegat(){
        console.log("Dommage  : ",this.dommage);
        console.log("Puissance  : ",this.puissance);
        this.degatAir();
        this.degatEau();
        this.degatTerre();
        this.degatFeu();
    }

    displayResi(){
        console.log("Résistance eau : ",this.resEau);
        console.log("Résistance Feu : ",this.resFeu);
        console.log("Résistance Terre : ",this.resTerre);
        console.log("Résistance Air : ",this.resAir);
        
    }
    zeroVie(){
        this.vieAct-=10;
        if (this.vieAct<=0) {
            this.vieAct=0;
        }
    }
    perteVie(degat){
        this.vieAct-=degat;
        if (this.vieAct<=0) {
            this.vieAct=0;
        }
    }
    heal(){
        let soin = 20;
        
        if (this.vieAct==this.vieMax) {
            this.vieAct=this.vieMax;
        }else if (this.vieAct+soin>this.vieMax) {
            this.vieAct=this.vieMax;
        }else{
            this.vieAct +=soin;
        }
    }

    buff(){
        this.puissance+=10;
        this.dommage+=2;
        //this.displayDegat()
    }

    getNom(){
        return this.nom;
    }
    getNiveau(){
        return this.niveau;
    }
    getXp(){
        return this.xp;
    }
    setNiveau(niveau){
        this.niveau = niveau;
    }
    levelUp(){

    
        if (this.xp >= this.expLvl ) {
            this.niveau++
        }

    }
    gainXpPassive(){
        this.xp += 100;
        
        //this.expLvl = 200*this.niveau*(1+this.niveau);
        //console.log(this.nom," xp requie : ",this.expLvl," ||| ","xp : ",this.xp);

        // if (this.xp >= this.expLvl ) {
        //     this.xp =this.xp - this.expLvl;
        //     this.niveau += 1;
        //     this.vieMax += 50;
        //     this.vieAct = this.vieMax;
        //     this.pointElementaire += 5;
        //     this.expLvl = 200*this.niveau*(1+this.niveau);
        //     //this.display();
        //     //this.xp = 0;
        //     //this.getNiveau();
        // }
        
    }
    gainXpPassive(){
        this.xp += 100;
        
        //this.expLvl = 200*this.niveau*(1+this.niveau);
        // //console.log(this.nom," xp requie : ",this.expLvl," ||| ","xp : ",this.xp);
        // if (this.xp >= this.expLvl ) {
        //     this.xp =this.xp - this.expLvl;
        //     this.niveau += 1;
        //     this.vieMax += 50;
        //     this.vieAct = this.vieMax;
        //     this.pointElementaire += 5;
        //     this.expLvl = 200*this.niveau*(1+this.niveau);
        //     //this.display();
        //     //this.xp = 0;
        //     //this.getNiveau();
        // }
        
    }
    gainXpCombat(xp){
        this.xp += xp;
        
        //this.expLvl = 200*this.niveau*(1+this.niveau);
        //console.log(this.nom," xp requie : ",this.expLvl," ||| ","xp : ",this.xp);

        // if (this.xp >= this.expLvl ) {
        //    // console.log(this.expLvl,"-",this.xp)
        //    while (this.xp >= this.expLvl ) {
        //     this.xp =this.xp - this.expLvl;
        //    // console.log(this.xp)
        //     this.niveau += 1;
        //     this.vieMax += 50;
        //     this.vieAct = this.vieMax;
        //     this.pointElementaire += 5;
        //     this.expLvl = 200*this.niveau*(1+this.niveau);
        //    }
            
        //     //this.display();
        //     //this.xp = 0;
        //     //this.getNiveau();
        // }
    }


    degatEau(){
        let attack = 0;
        this.degatBrut = Math.round((((this.eau+(this.puissance*2+100))/100)*this.dommage));
        attack = Math.round(this.degatBrut + Math.random()*this.degatBrut*0.2);
        //console.log("Attaque Eau : ",attack);
        return attack;
    }
    degatFeu(){
        let attack = 0;
        this.degatBrut = Math.round((((this.feu+(this.puissance*2+100))/100)*this.dommage));
        attack = Math.round(this.degatBrut + Math.random()*this.degatBrut*0.2);
        //console.log("Attaque Feu : ",attack);
        return attack;
    }
    degatAir(){
        let attack = 0;
        this.degatBrut = Math.round((((this.air+(this.puissance*2+100))/100)*this.dommage));
        attack = Math.round(this.degatBrut + Math.random()*this.degatBrut*0.2);
        //console.log("Attaque Air : ",attack);
        return attack;
    }
    degatTerre(){
        let attack = 0;
        this.degatBrut = Math.round((((this.terre+(this.puissance*2+100))/100)*this.dommage)) 
        attack = Math.round(this.degatBrut + Math.random()*this.degatBrut*0.2);
       // console.log("Attaque Terre : ",attack);
        return attack;
    }

}


export let player = new Personnage('Surcris');
export let ennemieCarre = new Personnage('Carre');


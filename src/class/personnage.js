import NiveauDomaineRang from "./niveauDomaineRang";

export default class Personnage{
    idUser;
    vieMax;
    vieAct;
    pseudo;
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
    form;
    domaine;
    niveauDomaineRang;

    
    constructor(pseudo,form,id){
        this.idUser = id;
        this.niveauDomaineRang = new NiveauDomaineRang();
        this.pseudo = pseudo;
        this.form = form;
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
        this.domaine = [0,0];
        
        // this.domaine = [
        //     {
        //         Mortel:[{'Student':9},{'Disciple':9},{'Expert':9},{'True Expert':9},{'Master':9},{'True Master':9},{'Saint':9},{'Superior Saint':9},
        //         {'Supreme Saint':9},{'Empereur':10},{'Supreme Empereur':10},{'Divine Empereur':10}]
        //     },
        //     {
        //         Immortel:[{'Celeste body rafinement':12},{'Celeste essence formation':12},{'Celeste soul fusion':12},{'Celeste nature harmonization':12},{'Celeste immortality':12}]
        //     },
        //     {
        //         Dieu:[{'Supreme God':3},{'God Monarch':3},{'God King':3}]
        //     }
        // ];
    }
    resetPerso(){
        this.pseudo = '';
        this.form = '';
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
        this.expLvl = 200*this.niveau*(1+this.niveau);
    }
    initFormStat(niveau,resEau,resFeu,resTerre,resAir,resBrut,form){
        
        this.niveau = niveau;
        this.vieMax = 100 + (niveau*50);
        this.vieAct = this.vieMax;
        this.resEau = resEau;
        this.resFeu = resFeu;
        this.resTerre = resTerre;
        this.resAir = resAir;
        this.resBrut = resBrut;
        this.form = this.setForm(form);
        this.expLvl = 200*this.niveau*(1+this.niveau);
    }
    display(){
        console.log(this.getPseudo(),this.niveauDomaineRang.domaine[this.domaine[0]].nom,
        this.niveauDomaineRang.domaine[this.domaine[0]].niveaux[this.domaine[1]].nom,
        this.getNiveau());
        console.log("Forme : ",this.getForm());
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
    getDomaine(){
        return this.niveauDomaineRang.domaine[this.domaine[0]].nom+" "+
        this.niveauDomaineRang.domaine[this.domaine[0]].niveaux[this.domaine[1]].nom;
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
        console.log("Puissance :",this.puissance,"Dommage :",this.dommage)
    }

    getPseudo(){
        return this.pseudo;
    }
    getForm(){
        return this.form;
    }
    getNiveau(){
        return this.niveau;
    }
    getInfoDomaine(){
        return this.niveauDomaineRang;
    }
    getXp(){
        return this.xp;
    }
    setNiveau(niveau){
        this.niveau = niveau;
    }
    setForm(form){
        this.form = form;
    }
    levelUp() {
        //if (this.xp >= this.expLvl)
        while (this.xp >= this.expLvl) {
            this.xp = this.xp - this.expLvl;
            this.niveau++;
            if (this.niveau > this.niveauDomaineRang.domaine[this.domaine[0]].niveaux[this.domaine[1]].valeur) {
                this.niveau = 1;
                //console.log(this.domaine[1])
                
                this.domaine[1]++;
                //console.log(this.domaine[1],":",this.niveauDomaineRang.domaine[this.domaine[0]].niveaux[this.domaine[1]].valeur)
                //console.log(this.domaine[1],":",this.niveauDomaineRang.domaine[this.domaine[0]].niveaux.length)
                if (this.domaine[1] >= this.niveauDomaineRang.domaine[this.domaine[0]].niveaux.length) {
                    this.domaine[0]++;
                    this.domaine[1] = 1;
                    console.log(this.getDomaine());
                }

            }
            this.vieMax += 50;
            this.vieAct = this.vieMax;
            this.pointElementaire += 5;
            this.expLvl = 200 * this.niveau * (1 + this.niveau);
            //this.display();
            //this.xp = 0;
            //this.getNiveau();
        }
    }

    gainXpPassive(){
        if (this.domaine[0] < 3) {
            this.xp += 100;
            this.levelUp();
        }
        
    }
    gainXpCombat(xp){
        this.xp += xp;
        
        
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


export let player = new Personnage('Surcris','carre');
export let ennemieCarre = new Personnage('Carre','carre');


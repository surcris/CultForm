export default class Utilisateur{
    nom;
    prenom;
    pseudo;
    email;
    //mdp;
    dateNaissance;
    personnage = [];

    constructor(nom,prenom,pseudo,email,dateNaissance,personnage){

        this.nom = nom;
        this.prenom = prenom;
        this.pseudo = pseudo;
        this.email = email;
        this.dateNaissance = dateNaissance;
        this.personnage.push(personnage);
        //this.mdp = mdp;
        
    }
}
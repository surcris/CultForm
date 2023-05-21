export default class Utilisateur{
    nom;
    prenom;
    email;
    mdp;
    dateNaissance;
    personnage = [];

    constructor(nom,prenom,email,mdp,dateNaissance,personnage){

        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.dateNaissance = dateNaissance;
        this.personnage.push(personnage);
        this.mdp = mdp;
        
    }
}
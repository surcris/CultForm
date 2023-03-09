import firebase from '../firebase';
const db = firebase.ref('/joueur');

class JoueurDataService{
    // Pour récup tous les joueurs
    getAll(){
        return db;
    }
    // Pour récup un joueur
    getOne(key){
        return db.child(key);
    }
    // Pour créer 1 joueur en +
    create(joueur){
        return db.push(joueur);
    }
    // Pour MAJ 1 joueur
    update(key, value){
        //console.log("Update")
        return db.child(key).set(value);
    }
    //Pour Delete 1 joueur
    delete(key){
        return db.child(key).remove();
    }
    //pour delete Tous les joueurs
    deleteAll(){
        return db.remove();
    }
};
export default new JoueurDataService();
export let firebaseKey;
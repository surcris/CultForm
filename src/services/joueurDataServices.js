import firebase from '../firebase';
const db = firebase.ref('/joueur');

class JoueurDataService{
    // Pour récup tous les articles
    getAll(){
        return db;
    }
    // Pour créer 1 article en +
    create(joueur){
        return db.push(joueur);
    }
    // Pour MAJ 1 article
    update(key, value){
        return db.child(key).update(value);
    }
    //Pour Delete 1 article
    delete(key){
        return db.child(key).remove();
    }
    //pour delete Tous les Articles
    deleteAll(){
        return db.remove();
    }
};
export default new JoueurDataService();
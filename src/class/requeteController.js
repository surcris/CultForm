import axios from "axios";

export default class RequeteController{

    async connexionServ() {
        try {
            const key = sessionStorage.getItem("akey");
            //const ipAddress = window.location.host;
            
            

            //const token = `Bearer ${key}`;
            
            const response = await axios.put(import.meta.env.VITE_APP_URL + '/auth/connectServ/', null, {
                headers: {
                    Authorization: key,

                }
                
            });
            sessionStorage.setItem("akT", response.data.message);
            //console.log(response.data.message)
            return response.data.message;
        } catch (error) {
            console.log(error.response.data.message);
            return false;
        }

    }
    async connexionUser(infoUser){
        if (infoUser != null) {
            try {
                const response = await axios.put(import.meta.env.VITE_APP_URL + '/auth/connexionUser', infoUser);
                //console.log(response.data.message);
                sessionStorage.setItem("akey", response.data.message);
                
                return true;
              } catch (error) {
                // Gérer les erreurs ici
                console.log("Erreur lors de la requête de connexion");
                console.error(error);
                return false;
              }
        }else{
            console.log("Il n'y a rien n'a envoyer");
            return false;
        }
    }
    async deconnexion() {
        try {
            const response = await axios.put(import.meta.env.VITE_APP_URL + '/auth/deconnexion');
            return true;
        }catch(error){
            console.log("error lors de la requete de connexion");
            console.error(error);
            return false;
        }
        
    }
    
    async sendPersonnage(personnage) {
        try {
            if (personnage != null) {
                const response = await axios.put(import.meta.env.VITE_APP_URL + '/perso/pushPerso/', personnage);
                console.log(response.data.message);
                return true;
            } else {
                console.log("Il n'y a rien à envoyer");
                return false;
            }
        } catch (error) {
            console.log(error.response.data.message);
            return false;
        }
    }

    async getPersonnage(personnage){
        if (personnage != null) {
            await axios.put(import.meta.env.VITE_APP_URL + '/perso/api/data/', personnage)
            .then((responce) => {
                console.log(responce.data.message);

                this.$emit('sendToApp',personnage)
                const l_pe = JSON.stringify(personnage)
                sessionStorage.setItem("uPlt", l_pe);
                this.$router.push({ name: 'game'});
                return true;
            })
            .catch(error => {
                console.log(error.response.data.message);
                return false;
            });
        }else{
            console.log("Il n'y a rien n'a envoyer");
            return false;
        }
    }


    async getAllPersonnageUser() {
        try {
            const key = sessionStorage.getItem("akT");
            //const ipAddress = window.location.host;
            //console.log(key);
            if (key != false) {
                const response = await axios.put(import.meta.env.VITE_APP_URL + '/perso/search/id/', null, {
                    headers: {
                        Authorization: key,
                        
                    },
                    // params: {
                    //     ip: ipAddress,
                    // },
                });
                //console.log(response.data.message);
                return response.data.message;
            } else {
                console.log("Il n'y a rien à envoyer");
                return false;
            }
        } catch (error) {
            console.log(error.response.data.message);
            return false;
        }
    }

    async getAllPersonnagePseudo(pseudo) {
        try {
            if (pseudo != null) {
                const response = await axios.get(import.meta.env.VITE_APP_URL + '/perso/search/pseudo/' + pseudo);
                console.log(response.data.message);
                return response.data.message;
            } else {
                console.log("Il n'y a rien à envoyer");
                return false;
            }
        } catch (error) {
            console.log(error.response.data.message);
            return true;
        }
    }

    async sendUtilisateur(utilisateur){
        if (utilisateur != null) {
            await axios.put(import.meta.env.VITE_APP_URL + '/users/api/user/addUserR',utilisateur)
                .then(response => {
                    console.log(response.data.message);
                    return true;
                })
                .catch(error => {
                    // Gérer les erreurs ici
                    console.log("error lors de la requete vers realtime");
                    console.error(error);
                    return false;
                });
        }else{
            console.log("Il n'y a rien n'a envoyer");
            return false;
        }
        
    }

    
}
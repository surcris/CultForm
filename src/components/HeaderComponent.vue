<script >
import axios from 'axios';
export default {
    props:['headermode'],
    data(){
        return{
            myKey:null,
        }
    },
    methods: {
        goToInscrip(){
            this.$router.push({ name: 'authentificationUser', params: { mode: 'inscription' } });
            //location.reload();

        },
        goToConnect(){
            this.$router.push({ name: 'authentificationUser', params: { mode: 'connexion' } });
            //location.reload();

        },
        goToForum(){
            this.$router.push({ name: 'Forum', params: { modeForum: 'home' } });
            //location.reload();

        },
        async deconection(){
            await axios.put(import.meta.env.VITE_APP_URL + '/api/user/deconnexion')
                .then((response) => {
                    console.log(response.data.message)
                    sessionStorage.removeItem('akey');
                    sessionStorage.removeItem('uPlt');
                    this.getSessionKey();
                    this.$router.push({ name: 'accueil'});
                })
                .catch((error) => {
                    console.log("error lors de la requete de connexion");
                    console.error(error);
                })

        },
        getSessionKey(){

            if(sessionStorage.getItem('akey')){
                this.myKey = sessionStorage.getItem('akey');
                
            }else{
                this.myKey = null;
            }
        }
    },
    unmounted(){
        
    },
    mounted(){
        this.getSessionKey();
        //console.log(this.myKey)
    }
}
</script>

<template>
   
    <header>

        <div class="header-accueil">
            <router-link :to="{ name: 'accueil' }">ACCUEIL</router-link>
        </div>
        <!--<div class="header-demo" v-if="headermode != '3'">
            <router-link :to="{ name: 'game' }">DEMO</router-link>
        </div>-->
        <div class="header-demo" v-if="myKey ==null">
            <router-link :to="{ name: 'game' }">DEMO</router-link>
        </div>
        
        <div class="header-forum" v-if="headermode != '2'">
            <router-link :to="{ name: 'Forum', params: { modeForum: 'home' } }">FORUM</router-link>
        </div>
        <div class="header-demo" v-if="myKey">
            <router-link :to="{ name: 'game' }">JOUER</router-link>
        </div>
        <div class="header-compte" v-if="headermode != '1'"> 
            <div class="header-compte-button">
                <i class="fa-solid fa-sort-down"></i>
                <p>COMPTE</p> 
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="header-compte-dropdown">
                <div v-if="myKey==null" class="header-compte-dropdown-menu">
                    <div><a @click="goToConnect">Connexion</a></div>
                    <div><a @click="goToInscrip">Inscription</a></div>
                </div>
                <div v-else="" class="header-compte-dropdown-menu">
                    <div><router-link :to="{ name: 'authPersonnage' }">Personnage</router-link></div>
                    <div><a @click="deconection">Déconnexion</a></div>
                    
                </div>
            
            </div>
        </div>
    </header>
    
</template>

<style scoped>
header{
    z-index: 10;
    position: fixed;
    top: 0;
    right: 0;
    width: fit-content;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 10px;
}
.header-forum, .header-demo, .header-accueil{
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    color: white;
    padding: 9px 15px;
    border: white solid 1px;
    border-radius: 25px;
    background-color: #0B525B;
    /* margin-left: 10px; */
    margin-right: 15px;

}
.header-demo a, .header-accueil a,.header-forum a{
    text-decoration: none;
    color: white;
}
.header-compte-button{
    background-color: #4D194D;
    cursor: pointer;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    /* margin: 0px 20px; */
    margin-right: 15px;
    color: white;
    border: white solid 1px;
    border-radius: 25px;
    
}
.header-compte-button a{
    text-decoration: none;
    color: white;
    font-weight: 700;
    margin: 0px 10px;
}
.header-compte-button i:first-child{
    padding-bottom: 10px;
}
.header-compte-button i:last-child{
    
    font-size: 25px;
}
.header-compte-button p{
    font-weight: 700;
    font-size: 15px;
    margin: 0 10px;
}

.header-compte-dropdown{
    margin-top: 5px;
    display: none;
    flex-direction: column;
    align-items: center; 
    
}
.header-compte:hover .header-compte-dropdown {
    display: flex;
}
.header-compte-dropdown-menu{
    cursor: pointer;
    width: 100%;
    background-color: #4D194D;
    border-radius: 5px;
    position: relative;
    z-index: 1;
}
.header-compte-dropdown .header-compte-dropdown-menu div{
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: white;
    padding: 5px 0px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
}
.header-compte-dropdown-menu a{
    text-decoration: none;
    color: white;
}

@media screen and (max-width: 500px) {
    
    header{
        justify-content: center;
    }
    .header-compte-dropdown-menu{
        width: 100%;
        background-color: #4D194D;
        border-radius: 5px;
        position: relative;
        z-index: 1;
    }
    .header-forum, .header-demo, .header-accueil{
        margin-right: 5px;
    }
    .header-compte-button {
        margin-right: 0px;
    }
    .header-compte-button p{
        display: none;
    }
    .header-compte-button i:first-child{
        padding-right: 10px;
    }
}

</style>
<script >
import axios from 'axios';
import RequeteController from '../class/requeteController';
export default {
    props:['headermode'],
    data(){
        return{
            myKey:null,
            requeteS: new RequeteController(),
            showMenuMobile: true
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
        goToAuthPerso(){
            
            this.$router.push({ name: 'authPersonnage'});
            //location.reload();

        },
        toggleElement() {
            const element = this.$refs.headerCompte; // selectionne le button profil
            const displayValue = window.getComputedStyle(element , null).getPropertyValue('flex-direction'); // contient la valeur de flex-direction
            if (displayValue == "column") {
                this.showMenuMobile = !this.showMenuMobile;
            }else{
                this.showMenuMobile = true;
            }
            
        },
        detectClickOutside(event) {
            const element = this.$refs.headerCompte; // Référence à l'élément à l'intérieur du template
            const displayValue = window.getComputedStyle(element , null).getPropertyValue('flex-direction');
            // const displayValue = element.style.flexDirection; 
            
            if (element && !element.contains(event.target) && displayValue == "column") {
                // Clic en dehors de l'élément
                this.showMenuMobile = false;
                // console.log(displayValue);
            }
           

            
        },
        async deconection(){ 
            if (await this.requeteS.deconnexion() == true) {
                sessionStorage.removeItem('akey');
                sessionStorage.removeItem('akt');
                sessionStorage.removeItem('uPlt');
                sessionStorage.removeItem('akT');
                this.getSessionKey();
                this.$router.push({ name: 'accueil'});
            }
       

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
        // window.addEventListener('click', this.detectClickOutside);
        // this.detectClickOutside();
        this.getSessionKey();
        //console.log(this.myKey)
    },
    beforeDestroy() {
        // Retire l'écouteur d'événement lors de la destruction du composant
        // window.removeEventListener('click', this.detectClickOutside);
    }
}
</script>

<template>
   
    <header>

        <!--<div class="header-demo" v-if="headermode != '3'">
            <router-link :to="{ name: 'game' }">DEMO</router-link>
        </div>-->
        <div class="header-compte" ref="headerCompte"  v-if="headermode != '1'"> 
            <div class="header-compte-button">
                <i class="fa-solid fa-user"></i>
            </div>

            <div class="header-menu" ref="headerMenu">
                <div class="header-link">
                    <router-link :to="{ name: 'accueil' }">ACCUEIL</router-link>
                </div>
                

                <div class="header-link" v-if="myKey == null">
                    <router-link :to="{ name: 'game' }">DEMO</router-link>
                </div>
                <div class="header-link" v-if="headermode != '2'">
                    <router-link :to="{ name: 'Forum', params: { modeForum: 'home' } }">FORUM</router-link>
                </div>
                <div class="header-link" v-if="myKey">
                    <router-link :to="{ name: 'game' }">JOUER</router-link>
                </div>

                <div v-if="myKey == null && headermode != '0'" class="header-link">
                    <a @click="goToConnect">CONNEXION</a>
                </div>
                <div v-if="myKey == null && headermode != '0'" class="header-link">
                    <a @click="goToInscrip">INSCRIPTION</a>
                </div>
            
                <div v-if="myKey != null" class="header-link">
                    <a @click="goToAuthPerso">PERSONNAGE</a>
                </div>
                <div v-if="myKey != null" class="header-link">
                    <a >PROFIL</a>
                </div>
                <div v-if="myKey != null" class="header-link">
                    <a @click="deconection">DECONNEXION</a>
                </div>
            </div>
        </div>

        

        <!--<div class="header-compte-dropdown">
            <div v-if="myKey == null" class="header-compte-dropdown-menu">
                <div><a @click="goToConnect">Connexion</a></div>
                <div><a @click="goToInscrip">Inscription</a></div>
            </div>
            <div v-else="" class="header-compte-dropdown-menu">
                <div><a @click="goToAuthPerso">Personnage</a></div>
                <div><a @click="deconection">Déconnexion</a></div>
            </div>
        </div>-->

    </header>
    
</template>

<style scoped>
header{
    z-index: 10;
    position: fixed;
    top: 0;
    right: 0;
    width: fit-content;
    height: fit-content;
    margin-top: 0px;
    
}
.header-compte{
    margin: 3px ;
    display: flex;
    flex-direction: row-reverse;
}

.header-menu{
    border-radius: 5px;
    display: flex;
    align-items: center;
    
}
.header-link{
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
    color: white;
    padding: 9px 15px;

}
.header-link a{
    text-decoration: none;
    color: white;
}
.header-compte-button{
    background-color: #4D194D;
    cursor: pointer;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: white solid 1px;
    border-radius: 50%;
    
}
.header-compte-button i{
    font-size: 30px;
}



@media screen and (max-width: 600px) {
    
    .header-compte{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .header-menu{
        border: white 1px solid;
        border-radius: 5px;
        margin-top: 5px;
        margin-right: 5px;
        display: none;
        text-align: right;
        background-color: #4D194D;
        
    }
    .header-compte:hover .header-menu{
        display: block;
    }
   
    
}

</style>
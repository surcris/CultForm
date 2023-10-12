

<script>
//import joueurDataServices from '../../services/joueurDataServices'
import Personnage from '../../class/personnage.js';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Cookies from "js-cookie";
import Forme from '../../class/forme';
import RequeteController from '../../class/requeteController';
export default {
    props: ['listJoueur'],
    components: {

    },
    //emits: ['firebase-key'],
    data() {
        return {
            myForm:null,
            player: [],
            articles: [],
            pseudo: null,
            matchBool: true,
            messageErr:null,
            //goTo:false
            personnage: null,
            tabForme:['carre','cercle','triangle'],
            comptForm:0,
        }
    },
    methods: {
        encryptData(data) {
            const key = import.meta.env.VITE_APP_KEY;
            return CryptoJS.AES.encrypt(data, key).toString();
        },
        decryptData(ciphertext) {
            const key = import.meta.env.VITE_APP_KEY;
            const bytes = CryptoJS.AES.decrypt(ciphertext, key);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
        handleArrowLeftClick() {
            this.comptForm--;
            if (this.comptForm < 0) {
                this.comptForm = this.tabForme.length-1;
                this.createForm(this.tabForme[this.comptForm])
            }else{
                this.createForm(this.tabForme[this.comptForm])
            }
            
        },
        handleArrowRightClick() {
            this.comptForm++;
            if (this.comptForm >= this.tabForme.length) {
                this.comptForm = 0;
                this.createForm(this.tabForme[this.comptForm])
            }else{
                //console.log(this.tabForme[this.comptForm])
                this.createForm(this.tabForme[this.comptForm])
            }
        },
        goToConnex(){
            
            this.$emit('changeAuth');
        },
        validPseudo() {
            
            if (!/^[a-zA-Z0-9]+$/.test(this.pseudo)) {
                this.pseudo = ''; 
            }
        },
        createPlayer() {
            //const theKey = this.decrypt(sessionStorage.getItem('akey'), import.meta.env.VITE_APP_KEY)
            //console.log(theKey);
            const requeteC = new RequeteController();
            requeteC.connexionServ()
                .then(async (response) => {
                    // recupère le id du joueur stocker dans les cookies
                    const key = Cookies.get('akey');
                    // const dataR = this.decryptData(key);
                    //const dataRstruct = JSON.parse(dataR);
                    // const key = Cookies.get('authToken');
                    console.log(key)
                    if (this.pseudo != null && this.pseudo != "") {
                        const l_tempo = await requeteC.getAllPersonnagePseudo(this.pseudo);
                        
                        console.log(l_tempo);
                        if (l_tempo == true && this.listJoueur.length < 5) {
                            
                            this.personnage = new Personnage(this.pseudo,this.tabForme[this.comptForm],key)
                            
                            const jsonPersoString = this.encryptData(JSON.stringify(this.personnage));
                            // console.log(jsonPersoString)
                            const l_sendP = await requeteC.sendPersonnage(jsonPersoString)
                            if (l_sendP == true){
                                this.$emit('sendToApp', this.personnage)
                                const l_pe = JSON.stringify(this.personnage)
                                sessionStorage.setItem("uPlt", l_pe);
                                this.$router.push({ name: 'game' });
                            }
                            
                        }else{
                            if (this.listJoueur.length>=5) {
                                this.messageErr = "Personnage maximum attein";
                            }else{
                                this.messageErr = "Pseudo déjà utiliser";
                            }
                        }
                    } else {
                        console.log('input invalide');
                        this.messageErr = "Veuillez entrer un pseudo";
                    }
                });
            
        },
        createForm(forme) {
            const canvas = document.getElementById('inscripCanvas');
            const ctx = canvas.getContext('2d');

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            this.myForm = new Forme(canvas,ctx)
            
            //console.log( canvasWidth,canvasHeight)
            // Effacer le contenu précédent du canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Dessiner la forme en fonction du paramètre fourni
            switch (forme) {
                case 'cercle':
                    const cercleSize = 50;
                    this.myForm.createCercleVide(cercleSize,'red')
                    
                    break;
                case 'carre':
                    const carreSize = 100;
                    this.myForm.createCarreVide(carreSize,'red')
                    
                    break;
                case 'triangle':
                    const triangleSize = 65;
                    this.myForm.createTriancleVide(triangleSize,'red')
                    
                    
                    break;
                default:
                    console.log('Forme non prise en charge');
            }
        }
       

    },
    mounted() {
        this.createForm(this.tabForme[this.comptForm])
        
        //requeteC.connexionServ();
    },
    unmounted() {
       
    }
}

</script>


<template>

    <!--
        <p>Choisir un pseudo</p>
        <input type="text" v-model="pseudo">
        <p>Choisir une forme</p>
        <div>
            <i ref="arrowLeft" @click="handleArrowLeftClick" class="fa-solid fa-arrow-left"></i>
            <canvas id="inscripCanvas" width="400" height="400"></canvas>
            <i ref="arrowRight" @click="handleArrowRightClick" class="fa-solid fa-arrow-right"></i>
        </div>
        
    -->
    <div class="persoinfo">
        <div class="persoinfo-container">
            <div class="persoinfo-container-bg">
                <p>Choisir un pseudo</p>
                <input type="text" v-model="pseudo" @input="validPseudo">
                <p v-if="messageErr != null">{{ messageErr }}</p>
                <p>Choisir une forme</p>
                <div class="persoinfo-container-choix">
                    <i ref="arrowLeft" @click="handleArrowLeftClick" class="fa-solid fa-arrow-left"></i>
                    <canvas id="inscripCanvas" ></canvas>
                    <i ref="arrowRight" @click="handleArrowRightClick" class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </div> 
        <button class="btn-createPerso" @click="createPlayer">VALIDER</button>
        <p @click="goToConnex" class="goToConnex">Choisir un personnage</p>
        
    </div>
</template>


<style scoped>
.persoinfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    margin-top: 20px;
    width: 80vw;
    max-width: 350px;
    min-width: 200px;
    background: linear-gradient(180deg, rgba(77,25,77,1) 53%, rgba(77,25,77,0.938813025210084) 78%, rgba(0,212,255,0) 100%);
}
.persoinfo-container-bg{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.persoinfo-container-bg p{
    font-size: 16px;
    font-weight: 700;
    color: aliceblue;
}

.persoinfo-container-bg input{
    border-radius: 5px;
    border: none;
    font-family: 'Kodchasan';
    font-size: 15px;
    font-weight: 600;
    height: 40px;
    
}
.persoinfo-container-choix{
    display: flex;
    align-items: center;
    flex-direction: row;
}
.persoinfo-container-choix i{
    font-size: 20px;
    color: #01FF98;
}


button{
    font-family: 'Kodchasan';
    border-radius: 5px;
    border: #01FF98 3px solid ;
    background-color: #2c0d2c;
    color: #01FF98;
    width: 90%;
    height: 50px;
    font-size: 16px;
    font-weight: 700;
}

.goToConnex{
    font-size: 16px;
    font-weight: 700;
    color: aliceblue;
}
@media screen and (max-width: 500px) {

/* .persoinfo-container{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
}


.persoinfo-container canvas{
    
    min-width: 300px;
    height: 300px;
    

} */
}
</style>

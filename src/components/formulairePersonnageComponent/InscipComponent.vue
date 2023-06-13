

<script>
//import joueurDataServices from '../../services/joueurDataServices'
import Personnage from '../../class/personnage.js';
import CryptoJS from 'crypto-js';
import axios from 'axios';
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
        createPlayer() {
            //const theKey = this.decrypt(sessionStorage.getItem('akey'), import.meta.env.VITE_APP_KEY)
            //console.log(theKey);
            const requeteC = new RequeteController();
            requeteC.connexionServ()
                .then(async (response) => {
                    const key = sessionStorage.getItem("akey");
                    const dataR = this.decryptData(key);
                    //const dataRstruct = JSON.parse(dataR);
                    
                    console.log(this.listJoueur.length)
                    if (this.pseudo != null && this.pseudo != "") {
                        const l_tempo = await requeteC.getAllPersonnagePseudo(this.pseudo);
                        
                        //console.log(l_tempo);
                        if (l_tempo == true && this.listJoueur.length < 5) {
                            
                            this.personnage = new Personnage(this.pseudo,this.tabForme[this.comptForm],dataR)
                            console.log(this.personnage)
                            const l_sendP = await requeteC.sendPersonnage(this.personnage)
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
                        console.log('input vide');
                        this.messageErr = "Veuillez entrer un pseudo";
                    }
                });
            // this.personnage = new Personnage(this.pseudo,this.tabForme[this.comptForm],theKey)
            // //this.personnage.display();
            // //const serializedObject = JSON.stringify(this.personnage);
            
            
            // axios.put(import.meta.env.VITE_APP_URL + '/api/data/', this.personnage)
            //     .then((responce) => {
            //         console.log(responce.data.message);

            //         this.$emit('sendToApp',this.personnage)
            //         const l_pe = JSON.stringify(this.personnage)
            //         sessionStorage.setItem("uPlt", l_pe);
            //         this.$router.push({ name: 'game'});
            //     })
            //     .catch(error => {
            //         console.log(error.response.data.message);
            //     });

           
            
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
                    const cercleSize = 100;
                    this.myForm.createCercleVide(cercleSize,'red')
                    
                    break;
                case 'carre':
                    const carreSize = 200;
                    this.myForm.createCarreVide(carreSize,'red')
                    
                    break;
                case 'triangle':
                    const triangleSize = 110;
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
                <input type="text" v-model="pseudo">
                <p>{{ messageErr }}</p>
                <p>Choisir une forme</p>
                <div>
                    <i ref="arrowLeft" @click="handleArrowLeftClick" class="fa-solid fa-arrow-left"></i>
                    <canvas id="inscripCanvas" width="400" height="400"></canvas>
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
    justify-content: center;
    width: 100%;
    
}
.persoinfo-container{
    
    /* background: linear-gradient(180deg, #0B525B 60.42%, rgba(11, 82, 91, 0) 100%); */
    background: radial-gradient(circle at 100% 100%, #0B525B 0, #0B525B 3px, transparent 3px) 0% 0%/8px 8px no-repeat,
            radial-gradient(circle at 0 100%, #0B525B 0, #0B525B 3px, transparent 3px) 100% 0%/8px 8px no-repeat,
            radial-gradient(circle at 100% 0, #0B525B 0, #0B525B 3px, transparent 3px) 0% 100%/8px 8px no-repeat,
            radial-gradient(circle at 0 0, #0B525B 0, #0B525B 3px, transparent 3px) 100% 100%/8px 8px no-repeat,
            linear-gradient(#2c0d2c, #0B525B) 50% 50%/calc(100% - 10px) calc(100% - 16px) no-repeat,
            linear-gradient(#2c0d2c, #0B525B) 50% 50%/calc(100% - 16px) calc(100% - 10px) no-repeat,
            linear-gradient(0deg, transparent 0%, #01FF98 100%);
    border-radius: 8px;
    padding: 5px;
    box-sizing: border-box;
    
    
    width: 50vh;
    height: 70%;
}
.persoinfo-container-bg{
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #2c0d2c 60.42%, rgba(11, 82, 91, 0) 100%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.persoinfo-container-bg div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
}
.persoinfo-container-bg p{
    font-size: 25px;
    color: white;
    margin: 10px 0px 10px 0px;
}
.btn-createPerso{
    font-family: 'Kodchasan';
    font-weight: 600;
    margin: 10px;
    font-size: 25px;
    border: #01FF98 solid 3px;
    background-color: #2c0d2c;
    padding: 10px 15px;
    border-radius: 10px;
    color: #01FF98;
    width: 40vh;
}
.persoinfo-container-bg input{
    font-family: 'Kodchasan';
    font-weight: 600;
    margin-bottom: 0px ;
    font-size: 25px;
    width: auto;
    border: white solid 1px;
    background-color: #2c0d2c;
    padding: 10px 15px;
    text-align: center;
    border-radius: 5px;
    color: white;
    
}


.persoinfo-container-bg .inscripCanvas{
    background-color: #2e2e2e00;
    border: none;
    border-radius: 5px;
    width: 400px;
    height: 400px;
}
.persoinfo-container-bg i {
    font-size: 35px;
    margin: 0 10px;
    color: #01FF98;
}
.goToConnex{
    font-weight: 500;
    font-size: 18px;
    color: #01FF98;
    margin: 0;
}

@media screen and (max-width: 800px) {

.persoinfo{
    height: auto;
}
.persoinfo-container-bg{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
    
}

}

@media screen and (max-width: 500px) {

.persoinfo-container{
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
    

}
}
</style>

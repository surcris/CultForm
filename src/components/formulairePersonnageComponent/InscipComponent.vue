

<script>
//import joueurDataServices from '../../services/joueurDataServices'
import Personnage from '../../class/personnage.js';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Forme from '../../class/forme';

export default {
    //props: ['joueur'],
    components: {

    },
    //emits: ['firebase-key'],
    data() {
        return {
            myForm:null,
            player: [],
            articles: [],
            pseudo: "",
            matchBool: true,
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
        decrypt(ciphertext, key) {
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
        createPlayer(){
            const theKey = this.decrypt(sessionStorage.getItem('akey'), import.meta.env.VITE_APP_KEY)
            console.log(theKey);
            this.personnage = new Personnage(this.pseudo,this.tabForme[this.comptForm],theKey)
            //this.personnage.display();
            //const serializedObject = JSON.stringify(this.personnage);
            
            
            axios.put(import.meta.env.VITE_APP_URL + '/api/data/', this.personnage)
                .then((responce) => {
                    console.log(responce.data.message);

                    this.$emit('sendToApp',this.personnage)

                    this.$router.push({ name: 'game'});
                })
                .catch(error => {
                    console.log(error.response.data.message);
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
    },
    unmounted() {
       
    }
}

</script>


<template>
    <div class="persoinfo">
        <div class="persoinfo-container">
            <p>Choisir un pseudo</p>
            <input type="text" v-model="pseudo">
            <p>Choisir une forme</p>
            <div>
                <i ref="arrowLeft" @click="handleArrowLeftClick" class="fa-solid fa-arrow-left"></i>
                <canvas id="inscripCanvas" width="400" height="400"></canvas>
                <i ref="arrowRight" @click="handleArrowRightClick" class="fa-solid fa-arrow-right"></i>
            </div>
            <button @click="createPlayer">VALIDER</button>
        </div>
        
    </div>
</template>


<style scoped>
.persoinfo{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
}
.persoinfo-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
}
.persoinfo-container div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
}
.persoinfo-container p{
    font-size: 25px;
    color: white;
    margin: 10px 0px 10px 0px;
}
.persoinfo-container button{
    font-family: 'Kodchasan';
    font-weight: 600;
    margin: 10px;
    font-size: 25px;
    border: white solid 3px;
    background-color: #2c0d2c;
    padding: 10px 15px;
    border-radius: 25px;
    color: white;
}
.persoinfo-container input{
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


.persoinfo-container canvas{
    background-color: #2e2e2e4f;
    border: 1px #00000063  solid;
    border-radius: 5px;
    width: 400px;
    height: 400px;
}
.persoinfo-container i {
    font-size: 35px;
    margin: 0 10px;
    color: #2c0d2c;
}

@media screen and (max-width: 800px) {

.persoinfo{
    height: auto;
}
.persoinfo-container{
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

<template>
    <div class="stats">
        <!-- <button @click="aff">button</button> -->
        <div class="onglet-stats">
            <div @click="menuStats">Stats</div>
            <div @click="menuAttri">Attribue</div>
            <div @click="menuCompe">Compétence</div>
        </div>
        <div class="stats-container">
            
            <div v-if="displayStatBool"  class="stats-info">
                <div class="infoPlayer">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <div class="nom-joueur">{{ joueur.nom }} </div>
                    
                </div>
                <div class="infoPlayer">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <div>Niveau </div>
                    <div>{{ joueur.niveau }} </div>
                </div>
                <div class="infoXp">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <div>Expérience </div>
                    <div>{{ joueur.xp }} / {{ joueur.expLvl }}</div>
                    
                </div>

            </div>
            <div v-if="displayStatBool"  class="stats-elementaire">
                <div class="elementaire">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <div>Vie  </div>
                    <div>{{ joueur.vieAct }} / {{ joueur.vieMax }}</div>
                </div>
                <div class="elementaire" v-for="(valeur,nom) in joueurInfo.stats">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <div>{{ nom }} </div>
                    <div>{{ valeur }}</div>
                </div>
                    
            </div>
            <div v-if="displayStatBool"  class="stats-dommage">
                <div class="dommage" v-for="(valeur,nom) in joueurInfo.puissances">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <p>{{ nom }} </p>
                    <div>{{ valeur }}</div>
                </div>

            </div>
            <div v-if="displayStatBool"  class="stats-resistance">
                <div class="resistance" v-for="(valeur,nom) in joueurInfo.resistances">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <p>{{ nom }} </p>
                    <div>{{ valeur }}</div>
                </div>
            </div>

            <!-- /////////////ATTRIBUE////////////// -->
            <div v-if="displayAttBool"  class="stats-attribue">
                <!-- <canvas ref="canvas" id="statsCanvas" width="300" height="300"></canvas> -->
                <Radar :data="chartData" :options="chartOption" />
            </div>
            <!-- /////////////COMPETENCE////////////// -->
            <div v-if="displayCompBool"  class="stats-dommage">
                <div class="dommage" v-for="(valeur,nom) in joueurInfo.puissances">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <p>{{ nom }} </p>
                    <div>{{ valeur }}</div>
                </div>

            </div>
        </div>

    </div>
</template>


<script >
//import joueurDataServices from '../../services/joueurDataServices' 
import axios from 'axios'

import * as chartConfig from '../../services/chartConfig'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js'


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default{
    props: ['joueur','adversaireCarre',"myKey"],
    components: {
        
    },
    data(){
        return{
            // joueur:dataGameComponent.data().joueur,
            // //adversaireCarre:dataGameComponent.data().adversaireCarre,
            chartOption:chartConfig.options,
            chartData:chartConfig.data,
            displayStatBool:true,
            displayAttBool:false,
            displayCompBool:false,
            // joueurInfo:dataGameComponent.data().joueurInfo,
            joueurInfo:{
                infoPlayer:{},
                infoXP:{},
                stats:{},
                statsVie:{},
                puissances:{},
                resistances:{},
            },
            
        }
        
    },
    methods:{
        // menuStats(){
        //     this.displayBool=!this.displayBool;
        //     //this.joueur.display()
           
        // },

        menuStats(){
            this.displayStatBool=!this.displayStatBool;
            if (this.displayStatBool) {
                this.displayAttBool=false;
                this.displayCompBool=false;
            }
            
           
        },
        menuAttri(){
            this.displayAttBool=!this.displayAttBool;
            if (this.displayAttBool) {
                this.displayStatBool=false;
                this.displayCompBool=false;
            }
           
        },
        menuCompe(){
            this.displayCompBool=!this.displayCompBool;
            if (this.displayCompBool) {
                this.displayStatBool=false;
                this.displayAttBool=false;
            }
           
        },
        hexagoneCan() {
            
            const canvas = document.getElementById("statsCanvas");
            const context = canvas.getContext("2d");
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            let x,y;
            const hexSize = 100;
            context.beginPath();
            context.moveTo(centerX, centerY - hexSize);
            x=centerX;
            y=centerY - hexSize
            let mesureTexte;
            //console.log(mesureTexte.width);
            for (let i = 1; i <= 6; i++) {
                
                if (i==1) {
                    
                    
                    this.textCanvas(context,"Air"+i,x,y-10,14)
                }
                if (i>1 && i<4) {
                    
                    mesureTexte = context.measureText("Air");
                    this.textCanvas(context,"Air"+i,x+(mesureTexte.width),y,14)
                }
                if (i==4) {
                    
                    this.textCanvas(context,"Air"+i,x,y+10,14)
                }
                if (i>4) {
                    mesureTexte = context.measureText("Air");
                    this.textCanvas(context,"Air"+i,x-(mesureTexte.width),y,14)
                }
                
                context.lineTo(centerX + hexSize * Math.sin(i * 2 * Math.PI / 6), centerY - hexSize * Math.cos(i * 2 * Math.PI / 6));
                
                x = (centerX + hexSize * Math.sin(i * 2 * Math.PI / 6));
                y = (centerY - hexSize * Math.cos(i * 2 * Math.PI / 6));
                
            }
            context.closePath();
            //couleur blanche
            context.strokeStyle = "#fff";
            context.stroke();
            //------------------
            const medSize = 66
            context.globalAlpha = 0.3;
            context.beginPath();
            context.moveTo(centerX, centerY - medSize);
            for (let i = 1; i <= 6; i++) {
                context.lineTo(centerX + medSize * Math.sin(i * 2 * Math.PI / 6), centerY - medSize * Math.cos(i * 2 * Math.PI / 6));
            }
            context.closePath();
            //couleur noir
            context.strokeStyle = "#000";
            context.stroke();
            //------------------
            const smallSize = 33
            
            context.beginPath();
            context.moveTo(centerX, centerY - smallSize);
            for (let i = 1; i <= 6; i++) {
                context.lineTo(centerX + smallSize * Math.sin(i * 2 * Math.PI / 6), centerY - smallSize * Math.cos(i * 2 * Math.PI / 6));
            }
            context.closePath();
            //couleur noir
            context.strokeStyle = "#000";
            context.stroke();
            
            //=============================
            context.beginPath();
            context.moveTo(centerX, centerY - hexSize);
            context.lineTo(centerX, centerY + hexSize);
            context.strokeStyle = "#000";
            context.stroke();
            //=============================
            context.beginPath();
            context.moveTo(centerX + hexSize * Math.sin(1 * 2 *Math.PI / 6), centerY - hexSize * Math.cos(1 * 2 *Math.PI / 6));
            context.lineTo(centerX - hexSize * Math.sin(1 * 2 *Math.PI / 6), centerY + hexSize * Math.cos(1 * 2 *Math.PI / 6));
            context.strokeStyle = "#000";
            context.stroke();
                
            context.beginPath();
            context.moveTo(centerX + hexSize * Math.sin(2 * 2 *Math.PI / 6), centerY - hexSize * Math.cos(2 * 2 *Math.PI / 6));
            context.lineTo(centerX - hexSize * Math.sin(2 * 2 *Math.PI / 6), centerY + hexSize * Math.cos(2 * 2 *Math.PI / 6));
            context.strokeStyle = "#000";
            context.stroke();
            
            context.globalAlpha = 1;
            //context.strokeStyle = "#000";
            //context.fillRect(centerX + 70 * Math.sin(2 * 2 *Math.PI / 6), centerY - 70 * Math.cos(2 * 2 *Math.PI / 6), 5, 5);
            //===========POINT============
            let pointStats = 80;
            context.beginPath();
            context.arc(centerX, centerY - pointStats, 2, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
            pointStats = 70;
            context.beginPath();
            context.arc(centerX + pointStats * Math.sin(1 * 2 *Math.PI / 6), centerY - pointStats * Math.cos(1 * 2 *Math.PI / 6), 2, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
            pointStats = 80;
            context.beginPath();
            context.arc(centerX + pointStats * Math.sin(2 * 2 *Math.PI / 6), centerY - pointStats * Math.cos(2 * 2 *Math.PI / 6), 2, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
            //===========POINT INVERSER============
            pointStats = 70;
            context.beginPath();
            context.arc(centerX, centerY + pointStats , 2, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
            pointStats = 60;
            context.beginPath();
            context.arc(centerX - pointStats * Math.sin(1 * 2 *Math.PI / 6), centerY + pointStats * Math.cos(1 * 2 *Math.PI / 6), 2, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
            pointStats = 25;
            context.beginPath();
            context.arc(centerX - pointStats * Math.sin(2 * 2 *Math.PI / 6), centerY + pointStats * Math.cos(2 * 2 *Math.PI / 6), 2, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
            //===========LIGNE POINT============
            context.beginPath();
            pointStats = 80;
            context.moveTo(centerX, centerY - pointStats);
            
            context.lineTo(centerX, centerY - pointStats);
            pointStats = 70;
            context.lineTo(centerX + pointStats * Math.sin(1 * 2 *Math.PI / 6), centerY - pointStats * Math.cos(1 * 2 *Math.PI / 6));
            pointStats = 80;
            context.lineTo(centerX + pointStats * Math.sin(2 * 2 *Math.PI / 6), centerY - pointStats * Math.cos(2 * 2 *Math.PI / 6));
            pointStats = 70;
            context.lineTo(centerX, centerY + pointStats );
            pointStats = 60;
            context.lineTo(centerX - pointStats * Math.sin(1 * 2 *Math.PI / 6), centerY + pointStats * Math.cos(1 * 2 *Math.PI / 6));
            pointStats = 25;
            context.lineTo(centerX - pointStats * Math.sin(2 * 2 *Math.PI / 6), centerY + pointStats * Math.cos(2 * 2 *Math.PI / 6));
            
            context.closePath();
            //couleur noir
            context.strokeStyle = "blue";
            context.stroke();
            context.globalAlpha = 0.2;
            context.fillStyle = 'blue';
            context.fill();
            
        },
        textCanvas(ctx,texte,x,y,size){
           
           ctx.fillStyle = 'white';
           ctx.font = size+'px sans-serif';
           ctx.textAlign = 'center';
           ctx.textBaseline = 'middle';
           
           ctx.fillText(texte, x,y);
       },
    },
    mounted(){
        // const ctx = document.getElementById('statsCanvas');
        // new Chart(ctx, this.planetChartData);

        this.joueurInfo.resistances["Resistance Air"] = this.joueur.resAir;
        this.joueurInfo.resistances["Resistance Eau"] = this.joueur.resEau;
        this.joueurInfo.resistances["Resistance Feu"] = this.joueur.resFeu;
        this.joueurInfo.resistances["Resistance Terre"] = this.joueur.resTerre;
        this.joueurInfo.resistances["Resistance Brut"] = this.joueur.resBrut;

        this.joueurInfo.puissances["Puissance"] = this.joueur.puissance;
        this.joueurInfo.puissances["Dommage"] = this.joueur.dommage;

        this.joueurInfo.stats["Air"] = this.joueur.air;
        this.joueurInfo.stats["Feu"] = this.joueur.feu;
        this.joueurInfo.stats["Terre"] = this.joueur.terre;
        this.joueurInfo.stats["Eau"] = this.joueur.eau;
    },
    watch:{
       
        'displayAttBool': function(){
            if (this.displayAttBool) {
                let intervalId = setInterval(() => {
                    if (this.$refs.canvas) {
                        // Le canvas est monté
                        //console.log("Le canvas est monté !");
                        clearInterval(intervalId);
                        this.hexagoneCan()
                    } else {
                        // Le canvas n'est pas monté
                        //console.log("Le canvas n'est pas monté !");
                    }
                }, 100);
            }
            
        },
        
        'joueur': {
            handler: function() {
                

                this.joueurInfo.resistances["Resistance Air"] = this.joueur.resAir;
                this.joueurInfo.resistances["Resistance Eau"] = this.joueur.resEau;
                this.joueurInfo.resistances["Resistance Feu"] = this.joueur.resFeu;
                this.joueurInfo.resistances["Resistance Terre"] = this.joueur.resTerre;
                this.joueurInfo.resistances["Resistance Brut"] = this.joueur.resBrut;

                this.joueurInfo.puissances["Puissance"] = this.joueur.puissance;
                this.joueurInfo.puissances["Dommage"] = this.joueur.dommage;

                this.joueurInfo.stats["Air"] = this.joueur.air;
                this.joueurInfo.stats["Feu"] = this.joueur.feu;
                this.joueurInfo.stats["Terre"] = this.joueur.terre;
                this.joueurInfo.stats["Eau"] = this.joueur.eau;
                
                if (this.myKey != 0) {

                    axios.put(import.meta.env.VITE_APP_URL + '/api/data/' + this.myKey, this.joueur)

                }
                
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.stats {
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 0.2fr 1.8fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      "onglet-stats onglet-stats onglet-stats"
      "stats-container stats-container stats-container"
      "stats-container stats-container stats-container"; 
    grid-area: stats; 
    color: #0ce48e;
    cursor: default;
}

.onglet-stats {
    grid-area: onglet-stats;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: 1%;
    margin-right: 1%;
}
.onglet-stats div{
    width: 20%;
    
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;

    background-color: #250029;
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
}
.onglet-stats div:hover
{
    background-color: #23c483;
    box-shadow: 0px 2px 5px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-2px);
}


.stats-container {
    grid-area: stats-container;
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.stats-container::-webkit-scrollbar {
    display: none;
}
/* .stats > div:first-child{
    margin-top: 50px;
} */

.stats-elementaire,
.stats-info {

    
    display: flex;
    flex-direction: column;
    margin-left: 1%;
    margin-right: 1%;
}

.stats-elementaire div,
.stats-info div {
    width: 100%;
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
}

.stats-info .nom-joueur {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 35px;
}

.stats-elementaire div div:nth-child(1),
.stats-info div div:nth-child(1) {
    margin-left: 2%;

}

.stats-info div div:nth-child(2) {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 2%;
}

.stats-elementaire div div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 2%;
}

.stats-resistance,
.stats-dommage {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.stats-resistance div,
.stats-dommage div {
    width: 45%;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 1%;
    margin-right: 1%;
}

.stats-resistance div p:nth-child(1),
.stats-dommage div p:nth-child(1) {
    width: 70%;
    margin-left: 4%;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 5px;
}

.stats-resistance div div:nth-child(2),
.stats-dommage div div:nth-child(2) {
    width: 20%;
    justify-content: flex-end;
    margin-right: 5%;
}

.stats-elementaire .elementaire,
.stats-dommage .dommage,
.stats-resistance .resistance,
.stats-info .infoPlayer,
.stats-info .infoXp {
    background-color: #250029;
    border: none;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    /* border: 1px solid #490050;
    background-color: rgb(73, 0, 80);
    border-radius: 5px; */
}


.stats-elementaire .elementaire:hover,
.stats-dommage .dommage:hover,
.stats-resistance .resistance:hover,
.stats-info .infoPlayer:hover,
.stats-info .infoXp:hover {
    background-color: #23c483;
    box-shadow: 0px 2px 5px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-2px);
}

.stats-attribue {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    margin-left: 5%;
    height: 70%;
}

</style>

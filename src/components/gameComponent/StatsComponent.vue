<template>
    <div class="stats">
        <!-- <button @click="aff">button</button> -->
        <div class="onglet-stats">
            <div @click="menuStats">Stats</div>
            <div >A venir</div>
            <div >A venir</div>
        </div>
        <div v-if="displayBool"  class="stats-info">
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
        <div v-if="displayBool"  class="stats-elementaire">
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
            <div v-if="displayBool"  class="stats-dommage">
                <div class="dommage" v-for="(valeur,nom) in joueurInfo.puissances">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <p>{{ nom }} </p>
                    <div>{{ valeur }}</div>
                </div>

            </div>
            <div v-if="displayBool"  class="stats-resistance">
                <div class="resistance" v-for="(valeur,nom) in joueurInfo.resistances">
                    <!-- {{ nom }} : {{ valeur }} -->
                    <p>{{ nom }} </p>
                    <div>{{ valeur }}</div>
                </div>
            </div>
        

    </div>
</template>


<script >


export default{
    props: ['joueur','adversaireCarre'],
    data(){
        return{
            // joueur:dataGameComponent.data().joueur,
            // //adversaireCarre:dataGameComponent.data().adversaireCarre,
            displayBool:true,
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
        menuStats(){
            this.displayBool=!this.displayBool;
            //this.joueur.display()
           
        },
    },
    mounted(){
       

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
            },
            deep: true
        }
    }
}
</script>

<style>

</style>

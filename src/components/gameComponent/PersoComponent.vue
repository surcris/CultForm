<template>
    <div class="perso">
        <canvas id="canvasPerso" ></canvas>
    </div>
</template>

<script >


export default{
    props: ['joueur','adversaireCarre'],
    data(){
        return{
            //joueur:dataGameComponent.data().joueur,
            //adversaireCarre:dataGameComponent.data().adversaireCarre,
        }
        
    },
    methods:{
        barreXp(canvas,ctx,player){
            let x = canvas.width/8 ;
            let y = canvas.height - 50;

            
            ctx.fillStyle = "grey";
            ctx.fillRect(x, y, canvas.width-(x*2), 10);
            // dessin de la barre de vie
            ctx.fillStyle = "azure";
            let xpActuelle = (player.xp)*100/player.expLvl; // exemple : 100%

            if (xpActuelle>100) {

                xpActuelle=100;
            }
            const largeurBarreXP = xpActuelle  / 100 * (canvas.width-(x*2));
            ctx.fillRect(x, y, largeurBarreXP, 10);
            
            ctx.clearRect(x, y+10,canvas.width-(x*2), (canvas.height/12));

            // ctx.beginPath();
            // ctx.rect(x, y+10,canvas.width-(x*2), (canvas.height/12));
            // ctx.lineWidth = 2;
            // ctx.strokeStyle = 'red';
            // ctx.stroke();

            // ajout du texte
            ctx.fillStyle = "white";
            ctx.font = "14px Arial";
            
            const pourcentageVie = player.xp + " / " + player.expLvl;
            const mesureTexte = ctx.measureText(pourcentageVie);
            const xTexte = (canvas.width ) / 2;
            const yTexte = (y + 20) ; // 14 est la taille de la police de caractères + 10 ajout d'espace
            ctx.fillText(pourcentageVie, xTexte, yTexte);
        },
        textCanvas(ctx,texte,x,y,size){
            
            
            ctx.fillStyle = 'white';
            ctx.font = size+'px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            
            ctx.fillText(texte, x/2,y);
        },
        cercle(canvas, ctx, radius, player) {

            // ctx.beginPath();
            // ctx.rect(canvas.width/divCanvas, canvas.height - (canvas.height/(divCanvas-2)),(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas);
            // ctx.lineWidth = 2;
            // ctx.strokeStyle = "red";
            // ctx.stroke();

            const divCanvas = 8;
            const circleX = canvas.width / 2;
            const circleY = canvas.height / 2;

            // Effacer le contenu précédent du canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dessiner le cercle
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "blue";
            ctx.stroke();

            // Dessiner le texte
            this.textCanvas(ctx, player.pseudo + " " + player.getNiveau(), canvas.width, canvas.height / 10, 20);
            this.textCanvas(ctx, player.getDomaine(), canvas.width, (canvas.height / 10) * 2, 20);
        },
    },
    mounted(){
        const canvasPlayer = document.getElementById("canvasPerso");
        const ctxPlayer = canvasPlayer.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        canvasPlayer.width = 450 * dpr;
        canvasPlayer.height = 450 * dpr;
        this.joueur.canvasP = canvasPlayer;
        this.joueur.ctxP = ctxPlayer;

        ctxPlayer.imageSmoothingEnabled = false;
        this.cercle(canvasPlayer,ctxPlayer,50,this.joueur);

        setInterval(() => {
            this.barreXp(canvasPlayer,ctxPlayer,this.joueur);
        }, 100);

        setInterval(() => {
            this.joueur.gainXpPassive();
        }, 5000);
        
    },
    watch:{
        'joueur.niveau': function() {
            this.cercle(this.joueur.canvasP,this.joueur.ctxP,50,this.joueur);
            //this.cercle(this.canvasP,this.ctxP,50,this.joueur);
        },
        // 'joueur': {
        //     handler: function () {

        //         this.joueurInfo.resistances["Resistance Air"] = this.joueur.resAir;
        //         this.joueurInfo.resistances["Resistance Eau"] = this.joueur.resEau;
        //         this.joueurInfo.resistances["Resistance Feu"] = this.joueur.resFeu;
        //         this.joueurInfo.resistances["Resistance Terre"] = this.joueur.resTerre;
        //         this.joueurInfo.resistances["Resistance Brut"] = this.joueur.resBrut;

        //         this.joueurInfo.puissances["Puissance"] = this.joueur.puissance;
        //         this.joueurInfo.puissances["Dommage"] = this.joueur.dommage;

        //         this.joueurInfo.stats["Air"] = this.joueur.air;
        //         this.joueurInfo.stats["Feu"] = this.joueur.feu;
        //         this.joueurInfo.stats["Terre"] = this.joueur.terre;
        //         this.joueurInfo.stats["Eau"] = this.joueur.eau;
        //     },
        //     deep: true
        // }
    }
}
</script>

<style >

</style>

<template>
    <div class="combat">

        <div class="joueur">
            <canvas id="joueur-Canvas" width="300" height="300"></canvas>
            <div class="action-joueur">
                <button @click="reset">stats/reset</button>
                <button @click="btnAtkEau">Attack Eau</button>
                <button @click="btnAtkTerre">Attack Terre</button>
                <button @click="btnAtkFeu">Attack Feu</button>
                <button @click="btnAtkAir">Attack Air</button>
                <button @click="btnSoin">Soin</button>
                <button @click="btnBuff">Buff</button>
                <button @click="btnDegat">Self Degat</button>
            
            </div>
        </div>
        <div class="ennemie">
            <canvas id="ennemie-Canvas" width="300" height="300"></canvas>
        </div>
    </div>
</template>


<script>
//import dataGameComponent from '../../services/dataGameComponent' 

export default{
    props: ['joueur','adversaireCarre'],
    data(){
        return{
            // joueur:dataGameComponent.data().joueur,
            // adversaireCarre:dataGameComponent.data().adversaireCarre,
            
        }
        
    },
    methods:{
        barreVie(hp,hpMax,ctx,canvas){
            const divCanvas = 8;
            let x = canvas.width/8 ;
            let y = canvas.height - 50;
            const epaisseur = 10;
            canvas.width/divCanvas, canvas.height - (canvas.height/7),(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas
            
            ctx.fillStyle = "grey";
            ctx.fillRect(canvas.width/divCanvas, canvas.height - (canvas.height/(divCanvas-2)), canvas.width-(x*2), epaisseur);
            // dessin de la barre de vie
            ctx.fillStyle = "green";
            const vieActuelle = (hp)*100/hpMax; // exemple : 100%
            const largeurBarreVie = vieActuelle / 100 *(canvas.width-(x*2));
            ctx.fillRect(canvas.width/divCanvas, canvas.height - (canvas.height/(divCanvas-2)), largeurBarreVie, epaisseur);
            

            // ctx.beginPath();
            // ctx.rect(canvas.width/divCanvas, (canvas.height - (canvas.height/10)),(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas);
            // ctx.lineWidth = 2;
            // ctx.strokeStyle = "red";
            // ctx.stroke();

            ctx.clearRect(canvas.width/divCanvas, (canvas.height - (canvas.height/10)),(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas);

            const pourcentageVie = hp + " / " + hpMax;
            const mesureTexte = ctx.measureText(pourcentageVie);

            this.textCanvas(ctx,pourcentageVie,canvas.width, (canvas.height - (canvas.height/(divCanvas+1))) + epaisseur,14);
        },
        updateBarreVie(hp, hpMax, ctx, canvas) {
            
            //effacer la zone de la barreVie précédente
            ctx.clearRect(0,250, canvas.width, canvas.height);
            
            // appeler la fonction barreVie avec les paramètres fournis pour afficher les nouvelle donnée
            this.barreVie(hp, hpMax,ctx,canvas);
        },
        barreXp(canvas,ctx,player){
            let x = canvas.width/8 ;
            let y = canvas.height - 50;

            
            ctx.fillStyle = "grey";
            ctx.fillRect(x, y, canvas.width-(x*2), 10);
            // dessin de la barre de vie
            ctx.fillStyle = "azure";
            const xpActuelle = (player.xp)*100/player.expLvl; // exemple : 100%
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
        cercle(canvas,ctx,radius,player){
            const divCanvas = 8;
            const circleX = canvas.width / 2;
            const circleY = canvas.height / 2;
            
            ctx.clearRect(0, 0, canvas.width, canvas.width/8);

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "blue";
            ctx.stroke();

            // ctx.beginPath();
            // ctx.rect(canvas.width/divCanvas, canvas.height - (canvas.height/(divCanvas-2)),(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas);
            // ctx.lineWidth = 2;
            // ctx.strokeStyle = "red";
            // ctx.stroke();

            //effacer le texte précédent
            ctx.clearRect(canvas.width/6, 0,(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas);
            
            //afficher le nouveau texte
            this.textCanvas(ctx,player.nom+" "+player.niveau,canvas.width, canvas.height/10,20);

            
        },
        
        carre(canvas,ctx,size,player){
            const divCanvas = 6;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const squareSize = size;
            
            const squareX = canvasWidth / 2 - squareSize / 2;
            const squareY = canvasHeight / 2 - squareSize / 2;
            const borderWidth = 2;
            const borderColor = "red";

            ctx.beginPath();
            ctx.rect(squareX, squareY, squareSize, squareSize);
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = borderColor;
            ctx.stroke();

            // ctx.beginPath();
            // ctx.rect(canvas.width/6, 0,(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas);
            // ctx.lineWidth = 2;
            // ctx.strokeStyle = 'red';
            // ctx.stroke();

            //effacer le texte précédent
            ctx.clearRect(canvas.width/6, 0,(canvas.width/divCanvas)*(divCanvas-2), canvas.height/divCanvas);
            //afficher le nouveau texte
            this.textCanvas(ctx,player.nom+" "+player.niveau,canvas.width, canvas.height/10,20);
            
        },
        reset(){
            
            //this.adversaireInfo.attaque = true;
            this.adversaireCarre.vieAct = this.adversaireCarre.vieMax;
            //this.joueur.display();
        },
        btnSoin(){
            this.joueur.heal();
            this.updateBarreVie(this.joueur.vieAct,this.joueur.vieMax,this.joueur.ctxJ,this.joueur.canvasJ);
        },
        btnDegat(){
            this.joueur.perteVie(25);
            
        },
        btnBuff(){
            this.joueur.buff();
            
        },
        btnStats(){
            this.joueur.display();
            
            
        },
        btnAtkEau(){
            
            this.adversaireCarre.perteVie(this.joueur.degatEau());
            //this.updateBarreVieEnnemie(this.adversaireInfo.statsVie["Vie Act"],this.adversaireInfo.statsVie["Vie"]);
            if (this.adversaireCarre.vieAct == 0 ) {
                this.adversaireCarre.initStat(Math.floor(Math.random() *  (10 - 1 + 1) + 1),5,5,5,5,5);
                this.carre(this.adversaireCarre.canvasE,this.adversaireCarre.ctxE,100,this.adversaireCarre);
                console.log("ennemie tuer")
                //this.adversaireInfo.attaque = false;
                this.joueur.gainXpCombat(1000000);
                
                this.reset();
            }
            
        },
        btnAtkFeu(){
            this.adversaireCarre.perteVie(this.joueur.degatFeu());
            //this.updateBarreVieEnnemie(this.adversaireInfo.statsVie["Vie Act"],this.adversaireInfo.statsVie["Vie"]);
            if (this.adversaireCarre.vieAct == 0 ) {
                this.adversaireCarre.initStat(Math.floor(Math.random() *  (10 - 1 + 1) + 1),5,5,5,5,5);
                this.carre(this.adversaireCarre.canvasE,this.adversaireCarre.ctxE,100,this.adversaireCarre);
                console.log("ennemie tuer")
                //this.adversaireInfo.attaque = false;
                this.joueur.gainXpCombat(500);
                
                this.reset();
                
            }
        },
        btnAtkTerre(){
            this.adversaireCarre.perteVie(this.joueur.degatTerre());
            //this.updateBarreVieEnnemie(this.adversaireInfo.statsVie["Vie Act"],this.adversaireInfo.statsVie["Vie"]);
            if (this.adversaireCarre.vieAct == 0 ) {
                this.adversaireCarre.initStat(Math.floor(Math.random() *  (10 - 1 + 1) + 1),5,5,5,5,5);
                this.carre(this.adversaireCarre.canvasE,this.adversaireCarre.ctxE,100,this.adversaireCarre);
                console.log("ennemie tuer");
                //this.adversaireInfo.attaque = false;
                this.joueur.gainXpCombat(500);
                this.reset();
            }
        },
        btnAtkAir(){
            this.adversaireCarre.perteVie(this.joueur.degatAir());
            //this.updateBarreVieEnnemie(this.adversaireInfo.statsVie["Vie Act"],this.adversaireInfo.statsVie["Vie"]);
            if (this.adversaireCarre.vieAct == 0 ) {
                this.adversaireCarre.initStat(Math.floor(Math.random() *  (10 - 1 + 1) + 1),5,5,5,5,5);
                this.carre(this.adversaireCarre.canvasE,this.adversaireCarre.ctxE,100,this.adversaireCarre);
                console.log("ennemie tuer")
                //this.adversaireInfo.attaque = false;
                this.joueur.gainXpCombat(500);
                this.reset();
            }
        },
    },
    mounted(){

        const canvasJoueur = document.getElementById("joueur-Canvas");
        const ctxJoueur = canvasJoueur.getContext("2d");
        this.joueur.canvasJ = canvasJoueur;
        this.joueur.ctxJ = ctxJoueur;
        this.cercle(this.joueur.canvasJ,this.joueur.ctxJ,50,this.joueur);


        const canvasEnnemie = document.getElementById("ennemie-Canvas");
        const ctxEnnemie = canvasEnnemie.getContext("2d");
        this.adversaireCarre.canvasE = canvasEnnemie;
        this.adversaireCarre.ctxE = ctxEnnemie;
        this.carre(this.adversaireCarre.canvasE,this.adversaireCarre.ctxE,100,this.adversaireCarre)

        this.updateBarreVie(this.adversaireCarre.vieAct,this.adversaireCarre.vieMax,this.adversaireCarre.ctxE,this.adversaireCarre.canvasE);
        this.updateBarreVie(this.joueur.vieAct,this.joueur.vieMax,this.joueur.ctxJ,this.joueur.canvasJ);
        

        setInterval(() => {
            this.updateBarreVie(this.adversaireCarre.vieAct,this.adversaireCarre.vieMax,this.adversaireCarre.ctxE,this.adversaireCarre.canvasE);
            this.updateBarreVie(this.joueur.vieAct,this.joueur.vieMax,this.joueur.ctxJ,this.joueur.canvasJ);
            
        }, 100);
    },
    watch:{

        'joueur.niveau': function() {
            this.cercle(this.joueur.canvasJ,this.joueur.ctxJ,50,this.joueur);
            //this.cercle(this.canvasP,this.ctxP,50,this.joueur);
        },
        
    }
}
</script>



<style>


</style>

import {player,ennemieCarre} from '../class/personnage' 
import Personnage from '../class/personnage' 

export default{
    data() {
        return {
            joueur: player,
            adversaireCarre: ennemieCarre,

            joueurInfo:{
                infoPlayer:{},
                infoXP:{},
                stats:{},
                statsVie:{},
                puissances:{},
                resistances:{},
            },
            
            adversaireInfo:{
                infoPlayer:{},
                infoXP:{},
                stats:{},
                statsVie:{},
                puissances:{},
                resistances:{},
                attaque:true,
            },
           
            displayBool:true,
            
            canvasP:'',
            canvasJ:'',
            canvasE:'',
            ctxP:'',
            ctxJ:'',
            ctxE:'',

            
        };
    },
    methods:{
        barreXp(canvas,ctx,player){
            let x = canvas.width/8 ;
            let y = canvas.height - 50;

            //console.log(x)
            ctx.fillStyle = "grey";
            ctx.fillRect(x, y, canvas.width-(x*2), 10);
            // dessin de la barre de vie
            ctx.fillStyle = "azure";
            const xpActuelle = (player.xp)*100/player.expLvl; // exemple : 100%
            //console.log(xpActuelle)
            const largeurBarreXP = xpActuelle  / 100 * (canvas.width-(x*2)) ;
            // console.log(canvas.width-(x*2));
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

        textCanvas(ctx,texte,x,y,size){
            ctx.fillStyle = 'white';
            ctx.font = size+'px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            //const mesureTexte = ctx.measureText(pourcentageVie);

            ctx.fillText(texte, x/2,y);
        },
        menuStats(){
            this.displayBool=!this.displayBool;
           
            
        },
        updateBarreVie(hp, hpMax, ctx, canvas) {
            
            //effacer la zone de la barreVie précédente
            ctx.clearRect(0,250, canvas.width, canvas.height);
            
            // appeler la fonction barreVie avec les paramètres fournis pour afficher les nouvelle donnée
            this.barreVie(hp, hpMax,ctx,canvas);
        },
    },
    mounted(){
     

    }
}
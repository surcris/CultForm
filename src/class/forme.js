export default class Forme{
    ctx;
    canvas;
    canvasWidth;
    canvasHeight;
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;

        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }

    createCercleVide(taille,couleur){
        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = couleur;
        this.ctx.arc(this.canvasWidth / 2, this.canvasHeight / 2, taille, 0, 2 * Math.PI);
        
        this.ctx.stroke();
        this.ctx.closePath();
    }
    createCarreVide(taille,couleur){
       
        const squareX = this.canvasWidth / 2 - taille / 2;
        const squareY = this.canvasHeight / 2 - taille / 2;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.rect(squareX, squareY, taille, taille);
        
        this.ctx.strokeStyle = couleur;
        this.ctx.stroke();
    }
    createTriancleVide(taille,couleur){

        this.ctx.beginPath();
        this.ctx.strokeStyle = couleur;
        this.ctx.lineWidth = 4;
        this.ctx.moveTo(this.canvasWidth / 2, taille);
        this.ctx.lineTo(taille, this.canvasHeight - taille);
        this.ctx.lineTo(this.canvasWidth - taille, this.canvasHeight - taille);
        
        this.ctx.closePath();
        this.ctx.stroke();
    }

};
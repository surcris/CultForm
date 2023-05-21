<script>
import axios from 'axios'
import HeaderComponent from './HeaderComponent.vue';
export default {
    components: {
        HeaderComponent,
    },
    data() {
    return {
      formMode: true,
    }
  },
  async mounted(){
    // await axios.get("https://cult-form-server.vercel.app/api/data")
    //     .then(response => {
    //         console.log(response.data)
    //     })
  }
}
</script>

<template>

    <div id="div-body">
        <HeaderComponent/>
        <div class="main">
            <div class="pres-jeu">
                <h1>CutlForm</h1>
                <p>Combattez des Ennemies puissant, collecter des ressources, améliorer votre Personnage et dominer le monde</p>
            </div>
        </div>
        
    </div>

</template>

<style scoped>

#div-body {
    background-color: #0B525B;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: 'Kodchasan';
}


.main{
    
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.pres-jeu{
    height: auto;
    padding-right: 200px;
    padding-bottom: 200px;
    color: aliceblue;
}
.pres-jeu p{
    width: 362px;
}
.pres-jeu h1{
    margin-top: 0px;
}
@media screen and (max-width: 800px) {
    .pres-jeu{
        height: auto;
        padding-right: 50px;
        padding-bottom: 200px;
        color: aliceblue;
    }

}

@media screen and (max-width: 500px) {
    .pres-jeu{
        height: auto;
        padding-right: 0px;
        padding-bottom: 200px;
        color: aliceblue;
    }
    .main{
        margin: auto;
    }

}


</style>
<template>
    
    <div id="div-body">
        <div class="header_forum">
            <HeaderComponent :headermode="modeH"/>
            <div class="line"></div>
        </div>
        
        <div class="search_container" :style="{'margin-top':margSearch+'px'}">
            <div class="search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="" id="" placeholder="Search...">
            </div>
        </div>
        
        <homeForum @update-mode="handleModeUpdate" v-if="modeForum == 'home'"/>
        <ajoutSujet v-if="modeForum == 'ajout'"/>
    </div>

</template>

<script>

import HeaderComponent from './HeaderComponent.vue';
import homeForum from './forumComposent/HomeForumcomponent.vue';
import ajoutSujet from './forumComposent/AjoutSujetComponent.vue';

export default{
    props: ['modeForum'],
    components: {
        HeaderComponent,
        homeForum,
        ajoutSujet,
        
    },
    emits: ['homeVue', 'ajoutVue'],
    data(){
        return{
            modeH:2,
            //modeF:this.modeForum,
            margSearch:250,
        
        }
    },
    methods:{
        handleModeUpdate(etatH,i) {
            //this.modeF = mode;
            this.modeH = etatH;
            this.margSearch = i;
        },
        
    },
    mounted(){
       
       
    },
    watch:{
        'modeForum':function() {
            if (this.modeForum == 'ajout') {
                this.margSearch = 0;
                this.modeH = 0;
            }else{
                this.margSearch = 250;
                this.modeH = 2;
            }
        }
    }
}

</script>
<style scoped>

#div-body {
    
    background: linear-gradient(247.1deg, #006466 0%, #065A60 12.41%, #0B525B 24.5%, #144552 32.81%,
     rgba(33, 47, 69, 0.97) 45.81%, #3E1F47 62.01%, #3E1F47 75.45%, #4D194D 89.81%), #FFFFFF;
    background-size: cover;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.header_forum{
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    
    background: linear-gradient(267.25deg, #006466 0%, #065A60 16.82%, #0B525B 33.19%, #144552 44.45%,
     rgba(33, 47, 69, 0.97) 62.06%, rgba(59, 33, 71, 0.997045) 83.99%, #3E1F47 84%, #3E1F47 102.21%, #4D194D 121.65%);
    display: flex;
    justify-content: center;
    z-index: 6;
}
.line{
    position: fixed;
    top: 68px;
    height: 1px;
    width: 90%;
    border-bottom:solid #FFFFFF 1px;
}
.search_container{
    margin-top: 250px;
    margin-bottom: 10px;
    position: sticky;
    top: 0px;
    width: fit-content;
    height: fit-content;
    z-index: 7;
}
.search{
    margin-top: 10px;
    width: 500px;
    height: 50px;
    border-radius: 50px;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: #D9D9D9;
}
.search i{
    font-size: 25px;
    margin: 0 10px;
}
.search input{
    font-size: 25px;
    background-color: transparent;
    border: none;
}
.search input::placeholder{
    color: rgb(43, 43, 43);
}

</style>
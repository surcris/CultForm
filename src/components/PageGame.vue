<script setup>
  import '../styleCss/styleGame.css'
</script>

<script >
import CombatComponent from './gameComponent/CombatComponent.vue';
import StatsComponent from './gameComponent/StatsComponent.vue';
import PersoComponent from './gameComponent/PersoComponent.vue';
import OptionPersoComponent from './gameComponent/OptionPersoComponent.vue';
import Personnage from '../class/personnage';


export default {
  //(props) pour recevoir les données envoyées depuis le composant parent
  props: ['personnage'],
  components: {
    CombatComponent,
    StatsComponent,
    PersoComponent,
    OptionPersoComponent,
    
  },
  data() {
    return {
      joueur: null,
      joueurDemo: new Personnage("Demo",'cercle'),
      adversaire: new Personnage("Ennemie",'cercle'),
      demo:false,
      
    }
  },
  computed: {

  },
  methods: {

    
  },
  mounted() {
   
  },

  created() {

    const m_Session = sessionStorage.getItem("uPlt");
    const a_Session = sessionStorage.getItem("akey");

    if (m_Session) {
      this.joueur = new Personnage('', '', '');
      const sessionData = JSON.parse(m_Session);
      Object.assign(this.joueur, sessionData);
    } else {
      
      if (a_Session) {
        
        this.$router.push({ name: 'authPersonnage' });
      }else{
        
        this.demo = true;
      }

    }


  }
}

</script>

<template>
  <div id="div-body">
    <div v-if="demo == false && joueur" class="container">
      <StatsComponent :joueur="joueur" />
      <PersoComponent :joueur="joueur" />
      <OptionPersoComponent :joueur="joueur" />
      <CombatComponent :joueur="joueur" :adversaireCarre="adversaire"/>
    </div>
    <div v-if="demo == true" class="container">
      <StatsComponent :joueur="joueurDemo"  />
      <PersoComponent :joueur="joueurDemo" />
      <OptionPersoComponent :joueur="joueurDemo" />
      <CombatComponent :joueur="joueurDemo" :adversaireCarre="adversaire"/>
    </div>
  </div>
</template>

<style scoped>
#div-body {
  background: linear-gradient(0deg, rgba(77, 25, 77, 1) 0%,
      rgba(58, 0, 64, 0.9192051820728291) 46%, rgba(0, 100, 102, 1) 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

}

</style>

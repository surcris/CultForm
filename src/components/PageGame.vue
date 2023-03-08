<script >
import CombatComponent from './gameComponent/CombatComponent.vue';
import StatsComponent from './gameComponent/StatsComponent.vue';
import PersoComponent from './gameComponent/PersoComponent.vue';
import OptionPersoComponent from './gameComponent/OptionPersoComponent.vue';
import {player,ennemieCarre} from '../class/personnage' 
import '../styleCss/styleGame.css'

export default {
  components: {
    CombatComponent,
    StatsComponent,
    PersoComponent,
    OptionPersoComponent,
  },
  data() {
    return {
        joueur: player,
        adversaireCarre: ennemieCarre,
    }
  },
  methods: {
    
  }
}

</script>

<template>
  <div class="container">
    <StatsComponent :joueur="joueur" :adversaireCarre="adversaireCarre"/>
    <PersoComponent :joueur="joueur" :adversaireCarre="adversaireCarre"/>
    <OptionPersoComponent :joueur="joueur" :adversaireCarre="adversaireCarre"/>
    <CombatComponent :joueur="joueur" :adversaireCarre="adversaireCarre"/>
  </div>
</template>

<style>



</style>

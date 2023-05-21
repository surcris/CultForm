<script>
//import HelloWorld from './components/HelloWorld.vue'
import PageGame from './components/PageGame.vue'
import PageAuthPerso from './components/PageAuthPersonnage.vue';
import NotFound from './components/NotFound.vue';
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- <PageGame/> -->
  <!-- <PageInscription/> -->
  <!-- <NotFound/> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <router-view/>
</template>

<style scoped>

</style>

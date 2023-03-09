import { createWebHistory, createRouter } from "vue-router";
//! la ƒ° createWebHistory
//* très commun dans les app SPA (web-mobile-etc...)
//* Permet de créer un historique de navigation (VUE sait tjrs d'ou vous venez)
//* Exemple  : les boutons précèdent dans les app Mobile
// ! la ƒ° createRouter 
//* permet à VUE d'instancier une nouvelle instance router
const routes =  [
    {
        path: "/",
        alias: "/inscription",
        name: "inscription",
        component: () => import("./components/PageInscription.vue"),
        
    },
    {
        path: "/game",
        name: "game",
        component: () => import("./components/PageGame.vue")
    },
    {
        name:'NotFound',
        path:'/:pathMatch(.*)',
        component: () => import("./components/NotFound.vue")
    },
    ];
    
    const router = createRouter({
    history: createWebHistory(),
    routes,
    });
    
    export default router;
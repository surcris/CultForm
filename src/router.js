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
        alias: "/accueil",
        name: "accueil",
        component: () => import("./components/PageAccueil.vue"),
        
    },
    {
        path: "/authPersonnage",
        name: "authPersonnage",
        component: () => import("./components/PageAuthPersonnage.vue"),
        
        
    },
    {
        
        path: "/authUser/:mode",
        name: "authentificationUser",
        component: () => import("./components/PageAuthUser.vue"),
        props:true
        
    },
    {
        path: "/game",
        name: "game",
        component: () => import("./components/PageGame.vue")
    },
    // {
    //     name:'Forum',
    //     path:'/Forum',
    //     component: () => import("./components/PageForum.vue")
    // },
    {
        name:'Forum',
        path:'/Forum/:modeForum',
        component: () => import("./components/PageForum.vue"),
        props:true
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
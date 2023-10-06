import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
    state: () => ({
        atk:null,
        akey:null,
        personnage:null,
    }),
    actions: {
        setAtk(newValue) {
            this.atk = newValue;
        },
        getAtk() {
            return this.atk;
        },
        setAkey(newValue) {
            this.akey = newValue;
        },
        getAkey() {
            return this.akey ;
        },
        setPersonnage(newValue) {
            this.personnage = newValue;
        },
        getPersonnage() {
            return this.personnage ;
        },
    },
});
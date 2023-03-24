import firebase from 'firebase/app';
import "firebase/database";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "game-e6fea.firebaseapp.com",
    databaseURL: "https://game-e6fea-default-rtdb.firebaseio.com",
    projectId: "game-e6fea",
    storageBucket: "game-e6fea.appspot.com",
    messagingSenderId: "955898014453",
    appId: "1:955898014453:web:367679609055cbff2bb3bc",
    measurementId: "G-KX6M12HL2S"
  };
firebase.initializeApp(firebaseConfig);
export default firebase.database();

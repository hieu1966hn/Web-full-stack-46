import firebase from "firebase/app";
import "firebase/firebase-storage"

const firebaseConfig = {
    apiKey: "AIzaSyC0OSb03YD_WiXbymF2OYVN36vdZPeqwJU",
    authDomain: "web46-fullstack.firebaseapp.com",
    projectId: "web46-fullstack",
    storageBucket: "web46-fullstack.appspot.com",
    messagingSenderId: "973815145673",
    appId: "1:973815145673:web:89faef43719417be139918"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage; // de su dung
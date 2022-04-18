import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap.min.css';



const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDqYbdgBRW22duve6ayINUiRDw-Svb7n-k",
  authDomain: "journal-app-5bce7.firebaseapp.com",
  projectId: "journal-app-5bce7",
  storageBucket: "journal-app-5bce7.appspot.com",
  messagingSenderId: "449324596571",
  appId: "1:449324596571:web:fb60675ff80c66f15b2e7e"
});

const db = getFirestore(firebaseConfig)



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

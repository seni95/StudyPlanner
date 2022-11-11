  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBulp-cPGePewY8IpiK2_KRn0BbQS4z7UE",
    authDomain: "studyplanner-6cf6e.firebaseapp.com",
    projectId: "studyplanner-6cf6e",
    storageBucket: "studyplanner-6cf6e.appspot.com",
    messagingSenderId: "414317369423",
    appId: "1:414317369423:web:33f76bfa0bd61cfb1b323a"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;
  export const firebaseDatabase = firebaseApp.database();
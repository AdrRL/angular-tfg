import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from "firebase/app";
import 'firebase/auth';


import { AppModule } from './app/app.module';

const firebaseConfig = {
  apiKey: "AIzaSyA9beMfsP8sPDLPCbGBlxb-Ng-aw6Ao09I",
  authDomain: "tfg-acceso.firebaseapp.com",
  projectId: "tfg-acceso",
  storageBucket: "tfg-acceso.appspot.com",
  messagingSenderId: "237863908432",
  appId: "1:237863908432:web:660393a7f1bab25c720d55"
};
const app = initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

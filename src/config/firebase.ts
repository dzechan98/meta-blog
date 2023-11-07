import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAWQI06h7dt45VXz9kYgeJxpN9VOIt97p8',
    authDomain: 'blog-2039d.firebaseapp.com',
    projectId: 'blog-2039d',
    storageBucket: 'blog-2039d.appspot.com',
    messagingSenderId: '68621124037',
    appId: '1:68621124037:web:de96f3089c89f79a0ecbac'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

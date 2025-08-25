import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAGfjUChNhz3D9btwFhKc0DzPVne3LeQi8',
  authDomain: 'gamesource-186cd.firebaseapp.com',
  projectId: 'gamesource-186cd',
  storageBucket: 'gamesource-186cd.firebasestorage.app',
  messagingSenderId: '1049031472912',
  appId: '1:1049031472912:web:68ca37f37e06253c8fd795',
  measurementId: 'G-DFJYPKSM3G',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const DB = getFirestore()
const AUTH = getAuth()
export { DB, AUTH }

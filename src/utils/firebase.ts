import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCJbuIjqw8btjhuTQqDdXepOLLqw_Hr7cs',
  authDomain: 'wordle-art.firebaseapp.com',
  projectId: 'wordle-art',
  storageBucket: 'wordle-art.appspot.com',
  messagingSenderId: '701457051751',
  appId: '1:701457051751:web:ec98c33c8add85dce2a4c2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

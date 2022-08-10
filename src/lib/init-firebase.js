// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, 
          collection, 
          getDoc, 
          updateDoc, 
          doc, 
          addDoc, 
          deleteDoc,
          setDoc, 
          query, 
          orderBy, 
          limit, 
          getDocs,
          where,
          } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// get Movie Details
export const getCollectionDetails = async (id, collect) => {
  const docRef = doc(db, collect, id);
  const docSnap = await getDoc(docRef)
  const data = docSnap.exists() ? docSnap.data() : null

  if (data === null || data === undefined) return null  

  return { id, ...data }
}

// get Ordered and limit movies
export const getLastRecords = async (collect) => {
  const dataObj = [];
  const collectionRef = collection(db, collect);
  const q = query(collectionRef, orderBy("CreatedDate", "desc"), limit(3));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    dataObj.push({ id: doc.id, ...doc.data() });
  });
  return dataObj; 
}

// get Ordered and limit movies
export const getSearchMovies = async (collect, text, criteria) => {
  const searchData = [];
  const collectionRef = collection(db, collect);
  const q = query(collectionRef, where(criteria, "==", text.trim()));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    searchData.push({ id: doc.id, ...doc.data() });
  });
  return searchData; 
}

// Create Single movie
export const createMovie = async (data) => {
  const collectionRef = collection(db, "movies");
  await addDoc(collectionRef, data)
};

// Delete Single movie
export const deleteMovie = (docID) => {
  const docRef = doc(db, "movies", docID);

  deleteDoc(docRef)
    .then(() => {
      console.log("Entire Document has been deleted successfully.")
    })
    .catch(error => {
      console.log(error);
    })
}

// Edit Single movie
export const editCollection = async (docID, collect,  data) => {

  const docRef = doc(db, collect, docID);
  await updateDoc(docRef, {
    ...data
});
}

// Create user in Firebase by id
export const createUserInFirebase = async (userID, userData) => {
  const collectionRef = collection(db, "users");
  await setDoc(doc(collectionRef, userID), userData);
}

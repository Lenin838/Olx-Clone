
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { 
  collection, 
  getDocs, 
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAqoB4MJF-NogxENKJ9bVrEvb2iqNhAeS8",
  authDomain: "olx-clone-c1caf.firebaseapp.com",
  projectId: "olx-clone-c1caf",
  storageBucket: "olx-clone-c1caf.firebasestorage.app",
  messagingSenderId: "435143495242",
  appId: "1:435143495242:web:752c06116f98e90ac960b3",
  measurementId: "G-JBTV03LYYN"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);


const fetchFromFirestore = async () => {
  try {
    const productsCollection = collection(fireStore, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log("Fetched products from Firestore:", productList);
    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
};

const signupWithEmail = async (email, password) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    const name = email.split("@")[0];

    await updateProfile(userCred.user, {
      displayName: name
    });

    return userCred.user;

  } catch (error) {
    throw error;
  }
};


const loginWithEmail = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
  } catch (error) {
    throw error;
  }
}

const saveUserToFirestore = async (user) => {
  try {
    const userRef = doc(fireStore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName || "User",
        email: user.email,
        createdAt: serverTimestamp(),
      });
    }

  } catch (error) {
    console.error("Error saving user:", error);
  }
};


const logoutUser = async ()=>{
  try{
    await signOut(auth);
  }catch(error){
    throw error;
  }
}

const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(fireStore, 'products', productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

const updateProduct = async (productId, updatedData) => {
  try {
    await setDoc(doc(fireStore, 'products', productId), updatedData, { merge: true });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export {
  auth,
  provider,
  storage,
  fireStore,
  fetchFromFirestore,
  signupWithEmail,
  loginWithEmail,
  logoutUser,
  saveUserToFirestore,
  deleteProduct,
  updateProduct
}


import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";

// Context created (warehouse)
const FirebaseContext = createContext(null);

// Use Context (consumer) | custom hook
const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

// Provider Created (delivery boy)
const FirebaseProvider = (props) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				console.log(user, " has logged in.");
				setUser(user);
				setIsLoggedIn(true);
			} else {
				console.log(user, " has logged out");
				setUser(null);
				setIsLoggedIn(false);
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const signupWithEmailAndPassword = (email, password) => {
		createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const signinWithEmailAndPassword = (email, password) => {
		signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const signinWithGoogle = () => {
		signInWithPopup(firebaseAuth, googleProvider);
	};

	return (
		<FirebaseContext.Provider
			value={{
				signupWithEmailAndPassword,
				signinWithEmailAndPassword,
				signinWithGoogle,
				isLoggedIn,
				setIsLoggedIn,
				user
			}}>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export { FirebaseProvider, useFirebase, firebaseApp, firebaseAuth };

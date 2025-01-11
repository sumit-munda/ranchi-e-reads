import { initializeApp } from "firebase/app";
import { createContext, useState } from "react";
import { useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

console.log(import.meta.env.REACT_APP_FIREBASE_API_KEY);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Provider Created (delivery boy)
const FirebaseProvider = (props) => {
	const [loading, setLoading] = useState(false);

	const signupWithEmailAndPassword = async (email, password) => {
		setLoading(true);
		try {
			const data = await createUserWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			console.log(data);
			alert("Account Created Successfully!");
		} catch (error) {
			alert(`Error: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};
	return (
		<FirebaseContext.Provider
			value={{ signupWithEmailAndPassword, loading, setLoading }}>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export { FirebaseProvider, useFirebase, firebaseApp };

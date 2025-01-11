import { initializeApp } from "firebase/app";
import { createContext, useState } from "react";
import { useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Context created (warehouse)
const FirebaseContext = createContext(null);

// Use Context (consumer) | custom hook
const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
	apiKey: "AIzaSyBsPdik5StbDHpUf3mwxiO8vTdGMuxYCso",
	authDomain: "ranchi-e-reads.firebaseapp.com",
	projectId: "ranchi-e-reads",
	storageBucket: "ranchi-e-reads.firebasestorage.app",
	messagingSenderId: "284199484120",
	appId: "1:284199484120:web:06813f19694ce732d9b5ad",
	measurementId: "G-FVLWZBRQBJ",
};

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

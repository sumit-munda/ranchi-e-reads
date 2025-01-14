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
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	doc,
	getDoc,
	query,
	where,
} from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const firestore = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);

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

	// const handleNewListing = async (name, isbn, price, coverPic) => {
	// 	const imageRef = ref(
	// 		storage,
	// 		`uploads/image/${Date.now()}-${coverPic.name}`
	// 	);
	// 	const uploadResult = await uploadBytes(imageRef, coverPic);
	// 	return await addDoc(collection(firestore, "books"), {
	// 		name,
	// 		isbn,
	// 		price,
	// 		imageURL: uploadResult.ref.fullPath,
	// 		userID: user.uid,
	// 		userEmail: user.email,
	// 		displayName: user.displayName,
	// 		photoURL: user.photoURL,
	// 	});
	// };

	const handleNewListingWithoutPic = async (
		name,
		isbn,
		price,
		authorName,
		imageURL
	) => {
		const result = await addDoc(collection(firestore, "books"), {
			name,
			authorName,
			isbn,
			price,
			imageURL,
			createdAt: Date.now(),
			displayName: user.displayName,
			userID: user.uid,
		});
		console.log(result);
	};

	const listAllBooks = () => {
		return getDocs(collection(firestore, "books"));
	};

	const getBookById = async (id) => {
		const docRef = doc(firestore, "books", id);
		const result = await getDoc(docRef);
		return result;
	};

	const placeOrder = async (bookId, qty) => {
		const collectionRef = collection(firestore, "books", bookId, "orders");
		const result = await addDoc(collectionRef, {
			userID: user.uid,
			userEmail: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			qty,
		});
		return result;
	};

	const fetchBooks = async (userID) => {
		if (!user) return null;
		const collectionRef = collection(firestore, "books");
		collection;
		const q = query(collectionRef, where("userID", "==", userID));
		const result = await getDocs(q);
		return result;
	};

	const getOrders = async (bookId) => {
		try {
			if (!bookId) {
				console.error("Invalid bookId: ", bookId);
				return [];
			}

			const collectionRef = collection(firestore, "books", bookId, "orders");
			const querySnapshot = await getDocs(collectionRef);
			const orders = querySnapshot.docs.map((doc) => doc.data());
			return orders;
		} catch (error) {
			console.error("Error fetching orders: ", error);
			throw error;
		}
	};

	// const getImageURL = (path) => {
	// 	return getDownloadURL(ref(storage, path));
	// };

	return (
		<FirebaseContext.Provider
			value={{
				signupWithEmailAndPassword,
				signinWithEmailAndPassword,
				signinWithGoogle,
				isLoggedIn,
				setIsLoggedIn,
				user,
				// handleNewListing,
				handleNewListingWithoutPic,
				listAllBooks,
				getBookById,
				placeOrder,
				fetchBooks,
				getOrders,
				// user,
				// getImageURL,
			}}>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export { FirebaseProvider, useFirebase, firebaseApp, firebaseAuth };

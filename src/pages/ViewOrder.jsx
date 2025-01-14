import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { getAuth } from "firebase/auth";
import BookCard from "../components/Card";

const ViewOrderPage = () => {
	const firebase = useFirebase();
	const [user, setUser] = useState(null);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (user && user.uid) {
			firebase.fetchBooks(firebase.user.uid)?.then((books) => setBooks(books.docs));
		}
	}, [user, firebase]);
	console.log(books);

    if(!(user && user.uid)) return <p>Please log In.</p>

	return (
		<div>
			{books.map(book => (
				<BookCard
                link={`/books/orders/${book.id}`}
					key={book.id}
					id={book.id}
					{...book.data()}
				/>
			))}
		</div>
	);
};

export default ViewOrderPage;

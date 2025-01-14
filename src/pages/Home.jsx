import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/Card";
import { CardGroup } from "react-bootstrap";

const HomePage = () => {
	const firebase = useFirebase();

	const [books, setBooks] = useState([]);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const books = await firebase.listAllBooks();
				console.log(books.docs[0]._document.data.value.mapValue.fields);
				setBooks(books.docs);
			} catch (error) {
				console.error("Error fetching books:", error);
			}
		};

		fetchBooks(); // cleanup function
	}, []); // Empty dependency array means this runs once when the component mounts

	return (
		<div className="container">
			<p>Books List</p>

			{/* {books.map((book, index) => {
				return (
					<li key={index}>
						<BookCard {...book.data()} />
					</li>
				);
			})} */}

			<CardGroup className="grid">
				{books.map((book) => {
					return (
						<BookCard
						link={`/book/view/${book.id}`}
							key={book.id}
							id={book.id}
							{...book.data()}
						/>
					);
				})}
			</CardGroup>
		</div>
	);
};

export default HomePage;

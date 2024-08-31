import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

// FIREBASE
import { collection, getDocs } from "firebase/firestore/lite";
import { firestore } from "../config/firebase";

type Item = {
	id: string;
	name?: string;
	username?: string;
	age?: number;
	imageURL?: string;
};

const TABLE_NAME = "applications";

export const Route = createLazyFileRoute("/all")({
	component: RatePage,
});

function RatePage() {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		try {
			setIsFetching(true);
			const col = collection(firestore, TABLE_NAME);
			const { docs } = await getDocs(col);
			// console.log(docs);
			const data = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			console.log("fetched successfully");
			console.log(data);
			setItems(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<div>
			<h3>Items</h3>
			{isFetching && <div className="bg-blue-500 h-10 w-10 animate-spin"></div>}
			<div className="flex gap-4 text-center">
				{items?.map((item) => (
					<div key={item.id} className="">
						<img src={item.imageURL} className="w-24" />
						<p>Name: {item.name}</p>
						<p>Username: {item.username}</p>
					</div>
				))}
			</div>
		</div>
	);
}

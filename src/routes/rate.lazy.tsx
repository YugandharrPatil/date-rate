import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

// FIREBASE
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../config/firebase";

export const Route = createLazyFileRoute("/rate")({
	component: RatePage,
});

function RatePage() {
	const [imageURLs, setImageURLs] = useState<string[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(false);

	useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async () => {
		const imageRefs = ref(storage, "/images");
		try {
			setIsFetching(true);
			const res = await listAll(imageRefs);
			const urls = await Promise.all(res.items.map((itemRef) => getDownloadURL(itemRef)));
			setImageURLs(urls);
		} catch (err) {
			console.error("Error fetching images: ", err);
		} finally {
			setIsFetching(false);
		}
	};
	return (
		<div>
			<h3>Uploaded Images</h3>
			{isFetching && <div className="bg-blue-500 h-10 w-10 animate-spin"></div>}
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{imageURLs.map((url, index) => (
					<img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: "200px", height: "200px", objectFit: "contain", margin: "5px" }} />
				))}
			</div>
		</div>
	);
}

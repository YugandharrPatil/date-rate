import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebase";

export default function ImageUpload() {
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (image) {
			// upload image logic
			const imageRef = ref(storage, `images/${image.name}`);
			setIsUploading(true);
			try {
				await uploadBytes(imageRef, image);
				const downloadURL = await getDownloadURL(imageRef);
				console.log("File available at: ", downloadURL);
			} catch (err) {
				console.error(err);
			} finally {
				setIsUploading(false);
			}
			console.log("Image to upload:", image);
		} else {
			alert("Please select an image");
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="file" accept="image/*" onChange={handleImageChange} />
				{preview && <img src={preview} alt="Image preview" className="h-24 w-24 object-cover" />}
				<button type="submit">Submit</button>
				{isUploading && <div className="animate-spin bg-red-500 h-5 w-5"></div>}
				<div className=""></div>
			</form>
		</div>
	);
}

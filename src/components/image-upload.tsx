import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebase";

// FORM
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

// FIREBASE
import { Timestamp, addDoc, collection } from "firebase/firestore/lite";
import { firestore } from "../config/firebase";

const formSchema = z.object({
	name: z.string().min(1),
	username: z.string().startsWith("@"),
	age: z.coerce.number(),
	// image: z.any(),
	imageURL: z.any(),
	// .instanceof(File)
	// .refine((fileList) => fileList.length > 0, {
	// 	message: "You must upload a file.",
	// })
	// .refine((fileList) => fileList[0]?.size <= 5 * 1024 * 1024, {
	// 	message: "File size must be 5MB or less.",
	// })
	// .refine((fileList) => ["image/jpeg", "image/png"].includes(fileList[0]?.type), {
	// 	message: "File must be a JPEG or PNG image.",
	// }),
	// .instanceof(File)
	// // .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
	// // 	message: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
	// // })
	// // .refine((file) => file.size <= 5 * 1024 * 1024, {
	// // 	message: "File size should be less than or equal to 5MB.",
	// // }),
});

export default function ImageUpload() {
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	// set preview
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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			username: "",
			age: 20,
		},
	});

	const {
		formState: { isSubmitSuccessful, isSubmitting },
		handleSubmit,
		control,
	} = form;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		// console.log(data);
		if (image) {
			try {
				const imageRef = ref(storage, `images/${image?.name}`);
				await uploadBytes(imageRef, image);
				const downloadURL = await getDownloadURL(imageRef);

				await addDoc(collection(firestore, "applications"), {
					...data,
					imageURL: downloadURL,
					sentAt: Timestamp.now().toDate(),
				});
			} catch (err) {
				console.error(err);
			}
			// console.log("Image to upload:", image);
		} else {
			alert("Please select an image");
		}
	};

	return (
		<div className="max-w-5xl mx-auto mt-10">
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
					{/* NAME */}
					<FormField
						control={control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="name">Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* USERNAME */}
					<FormField
						control={control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="@username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* AGE */}
					<FormField
						control={control}
						name="age"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Age</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Age" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* IMAGE UPLOAD */}
					<FormField
						control={control}
						name="imageURL"
						render={({ field }) => (
							<FormItem>
								<div className="grid w-full max-w-sm items-center gap-2">
									<FormLabel>Upload your profile</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="file"
											accept="image/*"
											onChange={(e) => {
												handleImageChange(e);
												// field.onChange(e.target.files);
											}}
										/>
									</FormControl>
									{preview && <img src={preview} alt="Image preview" className="h-24 w-24 object-cover" />}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full mt-8" disabled={isSubmitting}>
						{form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{isSubmitting ? "Submitting" : "Submit"}
					</Button>
					{isSubmitSuccessful && <p className="mt-3 text-center text-green-500">Submitted Successfully</p>}
				</form>
			</Form>
		</div>
	);
}

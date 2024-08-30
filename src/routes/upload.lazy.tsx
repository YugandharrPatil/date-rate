import { createLazyFileRoute } from "@tanstack/react-router";
import ImageUpload from "../components/image-upload";

export const Route = createLazyFileRoute("/upload")({
	component: UploadPage,
});

function UploadPage() {
	return <ImageUpload />;
}

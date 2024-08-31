import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/rate")({
	component: () => <div>Hello /rate!</div>,
});

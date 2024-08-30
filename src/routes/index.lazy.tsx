import { Link, createLazyFileRoute } from "@tanstack/react-router";
import Button from "../components/ui/button";

export const Route = createLazyFileRoute("/")({
	component: HomePage,
});

export default function HomePage() {
	return (
		<main className="text-center py-10 bg-pink-500">
			<h1 className="font-bold text-3xl">Welcome to Rate a Date</h1>
			<p className="mt-2">here, you can rate other's dating profiles by swiping left or right just like you use dating apps</p>
			<div className="w-fit mx-auto mt-10">
				<h3 className="font-bold text-xl">What would you like to do?</h3>
				<nav className="flex gap-8 mt-3">
					<Button>
						<Link to="/upload" className="[&.active]:font-bold">
							Upload
						</Link>
					</Button>
					<Button>
						<Link to="/rate" className="[&.active]:font-bold">
							Rate
						</Link>
					</Button>
				</nav>
			</div>
		</main>
	);
}

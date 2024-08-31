import { twMerge } from "tailwind-merge";

export default function Button({ children, bgColor }: { children: React.ReactNode; bgColor: string }) {
	return (
		<button className="px-8 py-2 border z-10 border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
			<div className={twMerge("absolute -bottom-2 -right-2 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200", bgColor)} />
			<span className="relative">{children}</span>
		</button>
	);
}

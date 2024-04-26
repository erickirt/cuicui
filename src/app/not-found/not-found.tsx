import { Boundary } from "#/src/ui/boundary";

export default function NotFound() {
	return (
		<Boundary labels={["./not-found.tsx"]} color="pink">
			<div className="space-y-4 text-vercel-pink">
				<h2 className="font-bold text-lg">Not Found</h2>

				<p className="text-sm">Could not find requested resource</p>
			</div>
		</Boundary>
	);
}
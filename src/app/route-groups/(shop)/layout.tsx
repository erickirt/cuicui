import type React from "react";
import { getCategories } from "#/src/app/api/categories/getCategories";
import { Boundary } from "#/src/ui/boundary";
import { ClickCounter } from "#/src/ui/click-counter";
import { TabGroup } from "#/src/ui/tab-group";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const categories = await getCategories();

	return (
		<Boundary labels={["shop layout"]} color="cyan" animateRerendering={false}>
			<div className="space-y-9">
				<div className="flex justify-between">
					<TabGroup
						path="/route-groups"
						items={[
							{
								text: "Home",
							},
							...categories.map((x) => ({
								text: x.name,
								slug: x.slug,
							})),
							{ text: "Checkout", slug: "checkout" },
							{ text: "Blog", slug: "blog" },
						]}
					/>

					<div className="self-start">
						<ClickCounter />
					</div>
				</div>

				<div>{children}</div>
			</div>
		</Boundary>
	);
}
import { categoriesPreviewsList } from "@cuicui/ui/categories-previews-list";
import { createElement } from "react";
import { HourglassIcon } from "lucide-react";

export const MainMenuCardContent = ({
  slugCategory,
  isComingSoon,
}: {
  slugCategory: string;
  isComingSoon?: boolean;
}) => {
  if (isComingSoon) {
    return (
      <p className="size-full grid place-content-center">
        <div className="w-fit p-4 bg-neutral-400/15 rounded-xl gap-2 flex items-center justify-center text-neutral-400">
          {/* Hourglass Icon */}
          <HourglassIcon className="size-6 " />
          <p className="text-2xl font-semibold">Coming Soon</p>
        </div>
      </p>
    );
  }

  const Component = getCategoryPreviewComponent(slugCategory);

  if (Component) {
    return (
      <div className="flex items-center justify-center size-full gap-2 py-4 px-12">
        {createElement(Component)}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center size-full gap-2 py-4 px-12">
      <p>Preview is missing</p>
    </div>
  );
};

const getCategoryPreviewComponent = (slug: string) => {
  const Component = Object.keys(categoriesPreviewsList).find(
    (key) => key === slug,
  ) as keyof typeof categoriesPreviewsList;
  return Component ? categoriesPreviewsList[Component] : null;
};

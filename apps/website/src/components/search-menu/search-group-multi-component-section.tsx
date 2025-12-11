import type { CategoryType, SectionType } from "@cuicui/ui/lib/types/component";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommandGroup, CommandItem } from "#/src/ui/shadcn/command";

export function SearchGroupComponentSection({
  closeSearchMenu,
  section,
}: Readonly<{ closeSearchMenu: () => void; section: SectionType }>) {
  const _router = useRouter();

  return (
    <CommandGroup heading={`${section.meta.name} category`} key={section.slug}>
      {section.categories.map((category) => (
        <MultipleComponentSearchItems
          category={category}
          closeSearchMenu={closeSearchMenu}
          key={category.slug}
          sectionSlug={section.slug}
        />
      ))}
    </CommandGroup>
  );
}

const MultipleComponentSearchItems = ({
  category,
  sectionSlug,
  closeSearchMenu,
}: {
  category: CategoryType;
  sectionSlug: string;
  closeSearchMenu: () => void;
}) => {
  const router = useRouter();

  return (
    <>
      <CommandItem
        asChild={true}
        // value={`${sectionSlug} ${category.name}`}
        key={category.slug}
        // className="ml-4"
        onSelect={() => {
          router.push(`/${sectionSlug}/${category.slug}`);
          closeSearchMenu();
        }}
      >
        <Link href={`/${sectionSlug}/${category.slug}`}>
          <category.meta.icon className="mr-2 size-3 text-neutral-400" />

          <span>{category.meta.name}</span>
        </Link>
      </CommandItem>

      {category.components?.map((component) => {
        return (
          <CommandItem
            asChild={true}
            // value={`${component.name}`}
            className="ml-8 my-0.5 h-8"
            key={component.slug}
            onSelect={() => {
              router.push(`/${sectionSlug}/${category.slug}#${component.slug}`);
              closeSearchMenu();
            }}
          >
            <Link href={`/${sectionSlug}/${category.slug}#${component.slug}`}>
              {/* {category.icon && (
								<category.icon className="mr-2 size-3 text-neutral-400" />
							)} */}

              <span>{component.meta.name}</span>
            </Link>
          </CommandItem>
        );
      })}
    </>
  );
};

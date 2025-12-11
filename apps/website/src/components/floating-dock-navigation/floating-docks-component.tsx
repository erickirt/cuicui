"use client";

import { useOnClickOutside } from "@/cuicui/hooks/use-click-outside";
import { cn } from "@/cuicui/utils/cn";
import { ListCollapseIcon } from "lucide-react";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string;
    Icon: ReactNode;
    href: string;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop className={desktopClassName} items={items} />
      <FloatingDockMobile className={mobileClassName} items={items} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    Icon: ReactNode;
    href: string;
  }[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (_event: MouseEvent | TouchEvent | FocusEvent) => {
    setOpen(false);
  };

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    setOpen(false);
  }, [pathname]);

  useOnClickOutside(ref, handleClickOutside);
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden ", className)} ref={ref}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col items-end gap-2"
            layoutId="nav"
          >
            {items.map((item, idx) => (
              <motion.div
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                initial={{ opacity: 0, y: 10 }}
                key={item.title}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  className={cn(
                    "rounded-full w-fit px-4 py-4 bg-neutral-50 border border-neutral-400/20  flex items-center justify-center  gap-2",
                    pathname.includes(item.href)
                      ? "bg-neutral-700 dark:bg-neutral-200 text-neutral-100 dark:text-neutral-800"
                      : "dark:bg-neutral-900 text-neutral-500 dark:text-neutral-300",
                  )}
                  href={item.href}
                  key={item.title}
                  onClick={() => setOpen(false)}
                  title={item.title}
                >
                  {item.Icon}
                  <p className=" text-nowrap tracking-tighter  font-medium">
                    {item.title}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="size-16 rounded-full  border border-neutral-400/20 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <ListCollapseIcon className="size-7 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; Icon: ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  return (
    <motion.div
      className={cn(
        "mx-auto hidden md:flex h-14 gap-2 items-end  rounded-full bg-neutral-50 dark:bg-neutral-900 px-2 pb-2 border border-neutral-500/20",
        className,
      )}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      onMouseMove={(e) => mouseX.set(e.pageX)}
    >
      {items.map((item) => (
        <IconContainer key={item.title} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  Icon,
  href,
}: Readonly<{
  mouseX: MotionValue;
  title: string;
  Icon: ReactNode;
  href: string;
}>) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (href === "/") {
      setIsActive(href === pathname);
    } else {
      setIsActive(pathname.includes(href));
    }
  }, [pathname, href]);

  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [60, 80, 60]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 300,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 300,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 300,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 300,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} title={title}>
      <motion.div
        className={cn(
          "aspect-square rounded-full border border-neutral-400/20 backdrop-blur-2xl flex items-center justify-center relative",
          isActive
            ? "bg-neutral-800 dark:bg-neutral-100"
            : "bg-neutral-100 dark:bg-neutral-800",
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={ref}
        style={{ width, height }}
      >
        <AnimatePresence>
          {hovered && (
            // ------ Tooltip ------ //
            <motion.div
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-100 dark:bg-neutral-800 dark:text-white border border-neutral-500/20 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              initial={{ opacity: 0, y: 10, x: "-50%" }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className={cn(
            "flex items-center justify-center",
            isActive
              ? "*:text-neutral-100 dark:*:text-neutral-800"
              : "*:text-neutral-800 dark:*:text-neutral-100",
          )}
          style={{ width: widthIcon, height: heightIcon }}
        >
          {Icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

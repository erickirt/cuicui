"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useThrottle } from "@/cuicui/hooks/use-throttle";

const performSearch = (searchTerm: string) => {
  toast(`Searching for: ${searchTerm}`);
};

export const PreviewUseThrottle = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const throttledSearchTerm = useThrottle(searchTerm, 500);

  useEffect(() => {
    if (throttledSearchTerm) {
      // Perform the search operation, e.g., API call
      performSearch(throttledSearchTerm);
    }
  }, [throttledSearchTerm]);

  return (
    <input
      className="rounded-lg bg-neutral-400/20 border border-neutral-400/20"
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
      type="text"
      value={searchTerm}
    />
  );
};

export default PreviewUseThrottle;

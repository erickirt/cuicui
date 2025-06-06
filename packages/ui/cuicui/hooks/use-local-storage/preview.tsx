import { Database } from "lucide-react";

export default function UseLocalStoragePreview() {
  return (
    <div className="w-fit p-4 bg-neutral-400/15 rounded-xl flex items-center">
      {/* Database Icon */}
      <Database className="size-6 text-neutral-400/80" />
    </div>
  );
}

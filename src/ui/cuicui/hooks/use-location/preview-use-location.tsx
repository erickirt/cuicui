"use client";
import useLocation from "#/src/ui/cuicui/hooks/use-location/use-location";

export function PreviewUseLocation() {
  const location = useLocation();

  return <pre>{JSON.stringify(location, null, 2)}</pre>;
}
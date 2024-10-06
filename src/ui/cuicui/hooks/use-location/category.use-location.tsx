import { MapIcon } from "lucide-react";
import type { SingleComponentCategoryType } from "#/src/lib/types/component";
import { PreviewUseLocation } from "#/src/ui/cuicui/hooks/use-location/preview-use-location";

export const useLocationCategory: SingleComponentCategoryType = {
  slug: "use-location",
  name: "Use Location",
  description:
    "A hook that allows you to access and manage the current location in your application",
  releaseDateCategory: new Date("2024-09-28"),
  icon: MapIcon,
  previewCategory: {
    component: <PreviewUseLocation />,
    previewScale: 0.8,
  },
  component: {
    lastUpdatedDateComponent: new Date("2024-09-28"),
    sizePreview: "xl",
    isIframed: false,
    variantList: [
      {
        name: "variant 1",
        component: <PreviewUseLocation />,
        slugComponentFile: "use-location",
        slugPreviewFile: "preview-use-location",
      },
    ],
  },
};
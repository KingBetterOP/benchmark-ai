import type {
  ContentPlanner,
  AIThumbnail,
} from "@/app/lib/types";

import ContentPlannerCard from "../ContentPlannerCard";
import AIThumbnailCard from "../AIThumbnailCard";

type Props = {
  contentPlanner: ContentPlanner[];
  aiThumbnail: AIThumbnail[];
};

export default function PlanningCards({
  contentPlanner,
  aiThumbnail,
}: Props) {
  return (
    <>
      <ContentPlannerCard
        plans={contentPlanner}
      />

      <AIThumbnailCard
        thumbnails={aiThumbnail}
      />
    </>
  );
}
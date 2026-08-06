import type {
  ContentPlanner,
  AIThumbnail,
} from "@/app/lib/types";

import ContentPlannerCard from "../ContentPlannerCard";
import AIThumbnailCard from "../AIThumbnailCard";

type Props = {
    language: string;
  contentPlanner: ContentPlanner[];
  aiThumbnail: AIThumbnail[];
};

export default function PlanningCards({
    language,
  contentPlanner,
  aiThumbnail,
}: Props) {
  return (
    <>
      <ContentPlannerCard
  plans={contentPlanner}
  language={language}
/>

      <AIThumbnailCard
  thumbnails={aiThumbnail}
  language={language}
/>
    </>
  );
}
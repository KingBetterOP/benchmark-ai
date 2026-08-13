export type PlannerStatus =
  | "planned"
  | "writing"
  | "recording"
  | "editing"
  | "uploaded";

export type PlannerContentType =
  | "Shorts"
  | "Long";

export interface PlannerItem {
  id: string;

  day: number;

  title: string;

  keyword: string;

  contentType: PlannerContentType;

  uploadTime: string;

  expectedViews: number;

  successProbability: number;

  reason: string;

  status: PlannerStatus;
}

export interface PlannerResponse {
  month: string;

  items: PlannerItem[];
}
import {
  WorkflowProgress,
  WorkflowResult,
} from "./types";

export class WorkflowEngine {
  async start(
    keyword: string,
    onProgress?: (
      progress: WorkflowProgress
    ) => void
  ): Promise<WorkflowResult> {
   return {
  report: null,

  competition: null,

  ideas: [],

  strategy: [],

  titles: [],

  thumbnails: [],

  script: "",

  description: "",

  tags: [],

  uploadTime: "Today 7:00 PM",

  checklist: [
    "Research competitors",
    "Generate titles",
    "Create thumbnail",
    "Write script",
    "Optimize SEO",
  ],
};
  }
}

export const workflow =
  new WorkflowEngine();
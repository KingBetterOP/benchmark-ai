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
    // 현재는 아직 사용하지 않지만
    // 추후 실제 워크플로우 구현 시 사용할 예정
    console.debug(keyword, onProgress);

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

export const workflow = new WorkflowEngine();
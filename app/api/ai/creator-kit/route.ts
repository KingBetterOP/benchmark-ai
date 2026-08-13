import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  consumeUsage,
  refundUsage,
} from "@/app/lib/usage";

const apiKey =
  process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

export const dynamic =
  "force-dynamic";

type CreatorSection =
  | "titles"
  | "hook"
  | "script"
  | "thumbnail"
  | "description"
  | "hashtags"
  | "seo"
  | "strategy"
  | "pinnedComment"
  | "communityPost"
  | "callToAction"
  | "shortsScript"
  | "instagramCaption"
  | "twitterPost";

const validSections: CreatorSection[] =
  [
    "titles",
    "hook",
    "script",
    "thumbnail",
    "description",
    "hashtags",
    "seo",
    "strategy",
    "pinnedComment",
    "communityPost",
    "callToAction",
    "shortsScript",
    "instagramCaption",
    "twitterPost",
  ];

const sectionPrompts: Record<
  CreatorSection,
  string
> = {
  titles: `
Generate exactly 5 highly clickable YouTube titles.

Requirements:
- Optimize for CTR.
- Create strong curiosity.
- Avoid generic titles.
- Avoid misleading clickbait.
- Make every title meaningfully different.
- Keep titles natural and human.
- Return exactly 5 titles.
`,

  hook: `
Generate one powerful YouTube opening hook.

Requirements:
- The hook should work within the first 5 seconds.
- Immediately create curiosity.
- Avoid generic introductions.
- Do not start with "Hey guys".
- Create an information gap.
- Make the viewer want to continue watching.
- Return only the hook text.
`,

  script: `
Generate a complete YouTube script.

Structure:
1. Hook
2. Setup
3. Main content
4. Payoff
5. Conclusion

Requirements:
- Optimize audience retention.
- Use natural spoken language.
- Avoid unnecessary filler.
- Maintain curiosity throughout the script.
- Approximately 60-90 seconds unless the topic requires otherwise.
- Return only the script.
`,

  thumbnail: `
Generate one detailed AI image-generation prompt for a high-CTR YouTube thumbnail.

Include:
- Main subject
- Composition
- Facial expression when appropriate
- Background
- Lighting
- Contrast
- Important visual elements
- Clear focal point
- Strong emotional impact
- Visual hierarchy
- Thumbnail readability

Do not include explanations.
Return only the image-generation prompt.
`,

  description: `
Generate an SEO-optimized YouTube description.

Requirements:
- Naturally include relevant keywords.
- Make it readable.
- Make it engaging.
- Encourage viewers to watch and engage.
- Do not keyword-stuff.
- Avoid unnecessary repetition.
- Return only the description.
`,

  hashtags: `
Generate exactly 20 relevant YouTube hashtags.

Requirements:
- No numbering.
- No duplicates.
- Every hashtag must begin with #.
- Keep hashtags directly related to the topic.
- Return only a JSON array of strings.
`,

  seo: `
Generate exactly 15 highly relevant SEO keywords for this YouTube topic.

Requirements:
- Include a mixture of broad and long-tail keywords.
- Avoid irrelevant keywords.
- Avoid duplicate keywords.
- Keep every keyword directly related to the topic.
- Return only a JSON array of strings.
`,

  strategy: `
Create a concise YouTube upload strategy.

Include:
- Recommended content angle
- Recommended publishing approach
- Audience positioning
- Retention strategy
- CTR strategy

Keep it practical.
Return only the strategy text.
`,

  pinnedComment: `
Create one engaging YouTube pinned comment.

Requirements:
- Encourage meaningful discussion.
- Ask a natural question.
- Make viewers want to reply.
- Keep it conversational.
- Return only the comment.
`,

  communityPost: `
Create one YouTube Community post.

Requirements:
- Make it native to YouTube.
- Encourage comments.
- Create curiosity around the topic.
- Do not sound like an advertisement.
- Return only the post.
`,

  callToAction: `
Create one short and natural YouTube call-to-action.

Requirements:
- Encourage subscription, comments, or continued viewing.
- Make it directly related to the topic.
- Do not sound generic.
- Do not sound overly promotional.
- Keep it natural and conversational.
- Return only the CTA text.
`,

  shortsScript: `
Create a concise YouTube Shorts script based on the topic.

Requirements:
- Start with an immediate hook.
- Use fast pacing.
- Focus on curiosity and viewer retention.
- Use natural spoken language.
- Keep it concise.
- Make it suitable for a Shorts video.
- Return only the Shorts script.
`,

  instagramCaption: `
Create an engaging Instagram caption based on the topic.

Requirements:
- Encourage comments and shares.
- Make it natural and platform-appropriate.
- Create curiosity.
- Do not sound like an advertisement.
- Include relevant hashtags naturally when appropriate.
- Return only the caption.
`,

  twitterPost: `
Create a concise X/Twitter post based on the topic.

Requirements:
- Make it attention-grabbing.
- Create curiosity.
- Encourage discussion.
- Keep it concise.
- Make it directly related to the topic.
- Return only the post.
`,
};

type RequestBody = {
  keyword?: unknown;
  language?: unknown;
  instruction?: unknown;
  section?: unknown;
};

type CreatorWorkspace = {
  titles: string[];
  hook: string;
  script: string;
  description: string;
  hashtags: string[];
  thumbnailPrompt: string;
  uploadStrategy: string;
  uploadTime: string;
  targetAudience: string;
  seoKeywords: string[];
  pinnedComment: string;
  communityPost: string;
  viralScore: number;
  callToAction: string;
  shortsScript: string;
  instagramCaption: string;
  twitterPost: string;
};

function isCreatorSection(
  value: string
): value is CreatorSection {
  return validSections.includes(
    value as CreatorSection
  );
}

function cleanString(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function cleanStringArray(
  value: unknown,
  maxItems: number
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeHashtags(
  value: unknown
): string[] {
  return cleanStringArray(value, 20)
    .map((tag) =>
      tag.startsWith("#")
        ? tag
        : `#${tag}`
    )
    .filter(
      (tag, index, array) =>
        array.indexOf(tag) === index
    );
}

function normalizeViralScore(
  value: unknown
): number {
  if (typeof value !== "number") {
    return 0;
  }

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(value)
    )
  );
}

function normalizeWorkspace(
  data: unknown
): CreatorWorkspace {
  const source =
    typeof data === "object" &&
    data !== null
      ? (data as Record<
          string,
          unknown
        >)
      : {};

  return {
    titles: cleanStringArray(
      source.titles,
      5
    ),

    hook: cleanString(
      source.hook
    ),

    script: cleanString(
      source.script
    ),

    description: cleanString(
      source.description
    ),

    hashtags: normalizeHashtags(
      source.hashtags
    ),

    thumbnailPrompt: cleanString(
      source.thumbnailPrompt
    ),

    uploadStrategy: cleanString(
      source.uploadStrategy
    ),

    uploadTime: cleanString(
      source.uploadTime
    ),

    targetAudience: cleanString(
      source.targetAudience
    ),

    seoKeywords: cleanStringArray(
      source.seoKeywords,
      15
    ),

    pinnedComment: cleanString(
      source.pinnedComment
    ),

    communityPost: cleanString(
      source.communityPost
    ),

    viralScore:
      normalizeViralScore(
        source.viralScore
      ),

    callToAction: cleanString(
      source.callToAction
    ),

    shortsScript: cleanString(
      source.shortsScript
    ),

    instagramCaption: cleanString(
      source.instagramCaption
    ),

    twitterPost: cleanString(
      source.twitterPost
    ),
  };
}

function createWorkspaceSchema() {
  return {
    type: "object",

    additionalProperties: false,

    properties: {
      titles: {
        type: "array",
        items: {
          type: "string",
        },
      },

      hook: {
        type: "string",
      },

      script: {
        type: "string",
      },

      description: {
        type: "string",
      },

      hashtags: {
        type: "array",
        items: {
          type: "string",
        },
      },

      thumbnailPrompt: {
        type: "string",
      },

      uploadStrategy: {
        type: "string",
      },

      uploadTime: {
        type: "string",
      },

      targetAudience: {
        type: "string",
      },

      seoKeywords: {
        type: "array",
        items: {
          type: "string",
        },
      },

      pinnedComment: {
        type: "string",
      },

      communityPost: {
        type: "string",
      },

      viralScore: {
        type: "number",
      },

      callToAction: {
        type: "string",
      },

      shortsScript: {
        type: "string",
      },

      instagramCaption: {
        type: "string",
      },

      twitterPost: {
        type: "string",
      },
    },

    required: [
      "titles",
      "hook",
      "script",
      "description",
      "hashtags",
      "thumbnailPrompt",
      "uploadStrategy",
      "uploadTime",
      "targetAudience",
      "seoKeywords",
      "pinnedComment",
      "communityPost",
      "viralScore",
      "callToAction",
      "shortsScript",
      "instagramCaption",
      "twitterPost",
    ],
  };
}

function normalizeLines(
  text: string,
  maxItems: number
): string[] {
  return text
    .split("\n")
    .map((item) =>
      item
        .replace(
          /^[-•*\d.)\s]+/,
          ""
        )
        .replace(
          /^["']|["']$/g,
          ""
        )
        .trim()
    )
    .filter(Boolean)
    .slice(0, maxItems);
}

export async function POST(
  req: Request
) {
  let userId: string | null = null;

  let usage: Awaited<
    ReturnType<typeof consumeUsage>
  > | null = null;

  let usageConsumed = false;

  try {
    /* ========================================================
       1. AUTH
    ======================================================== */

    const authResult = await auth();

userId = authResult.userId;

if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /* ========================================================
       2. API KEY
    ======================================================== */

    if (!apiKey) {
      console.error(
        "OPENAI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "OpenAI API key is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /* ========================================================
       3. REQUEST
    ======================================================== */

    let body: RequestBody;

    try {
      body =
        (await req.json()) as RequestBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const keyword =
      typeof body.keyword === "string"
        ? body.keyword.trim()
        : "";

    const language =
      typeof body.language === "string"
        ? body.language.trim()
        : "en";

    const instruction =
      typeof body.instruction ===
      "string"
        ? body.instruction.trim()
        : "";

    const rawSection =
      typeof body.section === "string"
        ? body.section.trim()
        : "";

    /* ========================================================
       4. VALIDATION
    ======================================================== */

    if (!keyword) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Keyword is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (keyword.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Keyword is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (instruction.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Instruction is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      rawSection &&
      !isCreatorSection(rawSection)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid creator section.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       5. USAGE CHECK
    ======================================================== */

    

    

    /* ========================================================
       6. LANGUAGE
    ======================================================== */

    const selectedLanguage =
      language === "ko"
        ? "Korean"
        : "English";

    /* ========================================================
       7. CREATOR INSTRUCTION
    ======================================================== */

    const creatorInstruction =
      instruction ||
      "Create highly engaging YouTube content optimized for CTR, retention, audience engagement, SEO, shareability, and viewer satisfaction.";

    /* ========================================================
       8. SECTION
    ======================================================== */

    const section:
      CreatorSection | null =
      rawSection
        ? (rawSection as CreatorSection)
        : null;

    /* ========================================================
       9. INDIVIDUAL SECTION
    ======================================================== */

    if (section) {
  const prompt =
    sectionPrompts[section];

  try {
    usage =
      await consumeUsage(
        userId
      );

    usageConsumed = true;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "USAGE_LIMIT_REACHED"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Daily limit reached.",
          upgrade: true,
        },
        {
          status: 403,
        }
      );
    }

    throw error;
  }

  const response =
    await openai.responses.create({
          model: "gpt-4.1-mini",

          input: `
You are the Creator AI engine inside Benchmark AI.

Return ONLY the requested content.

Topic:
${keyword}

Creator Instruction:
${creatorInstruction}

Language:
${selectedLanguage}

Requested Section:
${section}

${prompt}

Important:
- Everything must be directly related to the topic.
- Do not invent unrelated facts.
- Follow the requested language.
- Prioritize useful, publishable output.
- Do not add explanations before or after the requested content.
`,
        });

      const text =
        response.output_text.trim();

      let value:
        | string
        | string[] = text;

      if (section === "titles") {
        value = normalizeLines(
          text,
          5
        );
      }

      if (section === "hashtags") {
        value = normalizeLines(
          text,
          20
        )
          .map((tag) =>
            tag.startsWith("#")
              ? tag
              : `#${tag}`
          )
          .filter(
            (tag, index, array) =>
              array.indexOf(tag) ===
              index
          );
      }

      if (section === "seo") {
        value = normalizeLines(
          text,
          15
        );
      }

      

      return NextResponse.json({
        success: true,
        section,
        value,
        usage,
      });
    }

    /* ========================================================
   10. FULL CREATOR WORKSPACE
======================================================== */

usage =
  await consumeUsage(
    userId
  );

usageConsumed = true;

const response =
  await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
You are the Creator AI engine inside Benchmark AI.

Generate a complete YouTube Creator Workspace.

Topic:
${keyword}

Creator Instruction:
${creatorInstruction}

Language:
${selectedLanguage}

Requirements:

1. titles
- Generate exactly 5 highly clickable YouTube titles.
- Optimize for CTR.
- Create curiosity.
- Avoid generic titles.
- Avoid misleading clickbait.
- Make every title meaningfully different.

2. hook
- Create a powerful opening hook for the first 5 seconds.
- Immediately create curiosity.
- Avoid generic introductions.
- Make the viewer want to continue watching.

3. script
- Write a complete YouTube video script.
- Structure:
  Hook
  Setup
  Main content
  Payoff
  Conclusion
- Optimize audience retention.
- Use natural spoken language.
- Approximately 60-90 seconds unless the topic requires otherwise.

4. description
- Write an SEO-optimized YouTube description.
- Naturally include relevant keywords.
- Make it readable and engaging.
- Do not keyword-stuff.

5. hashtags
- Generate exactly 20 relevant hashtags.
- No duplicates.
- Every hashtag must begin with #.

6. thumbnailPrompt
- Create a detailed AI image-generation prompt for a high-CTR YouTube thumbnail.
- Include:
  Main subject
  Composition
  Facial expression when appropriate
  Background
  Lighting
  Contrast
  Important visual elements
  Clear focal point
  Emotional impact

7. uploadStrategy
- Create a practical YouTube upload strategy.
- Include:
  Recommended content angle
  CTR strategy
  Retention strategy
  Audience positioning
  Publishing approach

8. uploadTime
- Recommend a practical upload time.
- Consider the likely target audience and topic.
- Be concise.
- Do not pretend to know exact audience analytics that are unavailable.

9. targetAudience
- Clearly describe the primary target audience.
- Include:
  Age range
  Interests
  Motivations
  Viewing behavior

10. seoKeywords
- Generate exactly 15 relevant SEO keywords.
- Include broad and long-tail keywords.
- No duplicates.

11. pinnedComment
- Create an engaging pinned comment.
- Encourage meaningful discussion.
- Ask a natural question.

12. communityPost
- Create a native YouTube Community post.
- Encourage comments and discussion.
- Do not sound like an advertisement.

13. viralScore
- Estimate the topic's viral potential from 0 to 100.
- Return only a number.
- Treat this as a heuristic estimate, not a guarantee.

14. callToAction
- Create a short natural CTA.
- Encourage subscription, comments, or continued viewing.
- Avoid generic marketing language.

15. shortsScript
- Create a concise YouTube Shorts version.
- Start with an immediate hook.
- Use fast pacing.
- Focus on curiosity and retention.

16. instagramCaption
- Create an engaging Instagram caption.
- Encourage comments and shares.
- Include relevant hashtags naturally when appropriate.

17. twitterPost
- Create a concise X/Twitter post.
- Make it attention-grabbing.
- Encourage discussion or curiosity.

IMPORTANT:
- Every field must be consistent with the topic.
- Every field must follow the Creator Instruction.
- Do not invent unrelated facts.
- Do not add markdown formatting unless naturally necessary inside the content.
`,
        text: {
          format: {
            type: "json_schema",
            name: "creator_workspace",
            strict: true,
            schema:
              createWorkspaceSchema(),
          },
        },
      });

    /* ========================================================
       11. STRUCTURED OUTPUT
    ======================================================== */

    let data: unknown;

    try {
  data =
    JSON.parse(
      response.output_text
    );
} catch {
  console.error(
    "Creator Workspace JSON parsing failed:",
    response.output_text
  );

  throw new Error(
    "CREATOR_INVALID_JSON"
  );
}

    /* ========================================================
       12. NORMALIZE
    ======================================================== */

    const workspace =
      normalizeWorkspace(data);

    

    /* ========================================================
       14. SUCCESS
    ======================================================== */

    return NextResponse.json({
      success: true,

      titles:
        workspace.titles,

      hook:
        workspace.hook,

      script:
        workspace.script,

      description:
        workspace.description,

      hashtags:
        workspace.hashtags,

      thumbnailPrompt:
        workspace.thumbnailPrompt,

      uploadStrategy:
        workspace.uploadStrategy,

      uploadTime:
        workspace.uploadTime,

      targetAudience:
        workspace.targetAudience,

      seoKeywords:
        workspace.seoKeywords,

      pinnedComment:
        workspace.pinnedComment,

      communityPost:
        workspace.communityPost,

      viralScore:
        workspace.viralScore,

      callToAction:
        workspace.callToAction,

      shortsScript:
        workspace.shortsScript,

      instagramCaption:
        workspace.instagramCaption,

      twitterPost:
        workspace.twitterPost,

      usage,
    });
  } catch (error) {
  console.error(
    "Creator Kit generation error:",
    error
  );

  /*
  ============================================================
  AI FAILED → REFUND USAGE
  ============================================================
  */

  if (usageConsumed && userId) {
  try {
    await refundUsage(userId);
  } catch (refundError) {
    console.error(
      "Failed to refund usage:",
      refundError
    );
  }
}

  if (
    error instanceof Error &&
    error.message ===
      "USAGE_LIMIT_REACHED"
  ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Daily limit reached.",
          upgrade: true,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,

        titles: [],
        hook: "",
        script: "",
        description: "",
        hashtags: [],
        thumbnailPrompt: "",
        uploadStrategy: "",
        uploadTime: "",
        targetAudience: "",
        seoKeywords: [],
        pinnedComment: "",
        communityPost: "",
        viralScore: 0,
        callToAction: "",
        shortsScript: "",
        instagramCaption: "",
        twitterPost: "",

        error:
          error instanceof Error
            ? error.message
            : "Failed to generate creator kit.",
      },
      {
        status: 500,
      }
    );
  }
}
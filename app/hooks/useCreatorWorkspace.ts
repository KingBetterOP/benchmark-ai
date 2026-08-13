"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { downloadCreatorKit } from "../lib/downloadCreatorKit";
import { trackEvent } from "../lib/analytics";

import type {
  CreatorWorkspaceData,
} from "../lib/types";

import type {
  CreatorSection,
} from "../components/CreatorWorkspace";

type UseCreatorWorkspaceOptions = {
  keyword: string;
  setKeyword: (keyword: string) => void;

  language: string;

  setError: (error: string) => void;
};

const STORAGE_PREFIX =
  "benchmark-ai-creator-workspace";

const DEFAULT_CREATOR_WORKSPACE: CreatorWorkspaceData =
  {
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
  };

/* ============================================================
   HELPERS
============================================================ */

function createEmptyWorkspace(): CreatorWorkspaceData {
  return {
    ...DEFAULT_CREATOR_WORKSPACE,

    titles: [],
    hashtags: [],
    seoKeywords: [],
  };
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
  maxItems = 50
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
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function normalizeWorkspace(
  data: unknown
): CreatorWorkspaceData {
  if (
    !data ||
    typeof data !== "object"
  ) {
    return createEmptyWorkspace();
  }

  const source =
    data as Record<
      string,
      unknown
    >;

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

    thumbnailPrompt:
      cleanString(
        source.thumbnailPrompt
      ),

    uploadStrategy:
      cleanString(
        source.uploadStrategy
      ),

    uploadTime:
      cleanString(
        source.uploadTime
      ),

    targetAudience:
      cleanString(
        source.targetAudience
      ),

    seoKeywords:
      cleanStringArray(
        source.seoKeywords,
        15
      ),

    pinnedComment:
      cleanString(
        source.pinnedComment
      ),

    communityPost:
      cleanString(
        source.communityPost
      ),

    viralScore:
      normalizeViralScore(
        source.viralScore
      ),

    callToAction:
      cleanString(
        source.callToAction
      ),

    shortsScript:
      cleanString(
        source.shortsScript
      ),

    instagramCaption:
      cleanString(
        source.instagramCaption
      ),

    twitterPost:
      cleanString(
        source.twitterPost
      ),
  };
}

function hasCreatorContent(
  workspace: CreatorWorkspaceData
): boolean {
  return (
    workspace.titles.length > 0 ||
    Boolean(workspace.hook.trim()) ||
    Boolean(workspace.script.trim()) ||
    Boolean(workspace.description.trim()) ||
    Boolean(
      workspace.thumbnailPrompt.trim()
    ) ||
    Boolean(
      workspace.callToAction.trim()
    ) ||
    Boolean(
      workspace.shortsScript.trim()
    ) ||
    Boolean(
      workspace.instagramCaption.trim()
    ) ||
    Boolean(
      workspace.twitterPost.trim()
    )
  );
}

/*
 * Workspace cache is scoped by keyword + language.
 *
 * This prevents:
 * Bitcoin → AI
 *
 * from accidentally sharing the same local workspace.
 */
function getStorageKey(
  keyword: string,
  language: string
): string {
  const normalizedKeyword =
    keyword
      .trim()
      .toLowerCase();

  return `${STORAGE_PREFIX}:${language}:${encodeURIComponent(
    normalizedKeyword
  )}`;
}

/* ============================================================
   HOOK
============================================================ */

export function useCreatorWorkspace({
  keyword,
  setKeyword,
  language,
  setError,
}: UseCreatorWorkspaceOptions) {
  /*
  ============================================================
  CREATOR WORKSPACE STATE
  ============================================================
  */

  const [
    creatorWorkspace,
    setCreatorWorkspaceState,
  ] =
    useState<CreatorWorkspaceData>(
      createEmptyWorkspace()
    );

  const [
    creatorWorkspaceLoading,
    setCreatorWorkspaceLoading,
  ] = useState(false);

  const [
    creatorRegenerating,
    setCreatorRegenerating,
  ] =
    useState<CreatorSection | null>(
      null
    );

  /*
  ============================================================
  SAFE STATE SETTER
  ============================================================
  */

  const setCreatorWorkspace =
    useCallback(
      (
        value:
          | CreatorWorkspaceData
          | ((
              previous: CreatorWorkspaceData
            ) => CreatorWorkspaceData)
      ) => {
        setCreatorWorkspaceState(
          value
        );
      },
      []
    );

  /*
  ============================================================
  RESTORE KEYWORD WORKSPACE
  ============================================================
  */

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    const normalizedKeyword =
      keyword.trim();

    if (!normalizedKeyword) {
      setCreatorWorkspaceState(
        createEmptyWorkspace()
      );

      return;
    }

    const storageKey =
      getStorageKey(
        normalizedKeyword,
        language
      );

    try {
      const savedWorkspace =
        localStorage.getItem(
          storageKey
        );

      if (!savedWorkspace) {
        /*
         * New keyword.
         *
         * Do not show results from another keyword.
         */
        setCreatorWorkspaceState(
          createEmptyWorkspace()
        );

        return;
      }

      const parsed =
        JSON.parse(
          savedWorkspace
        );

      const normalized =
        normalizeWorkspace(
          parsed
        );

      setCreatorWorkspaceState(
        normalized
      );
    } catch (error) {
      console.error(
        "Failed to restore Creator Workspace:",
        error
      );

      setCreatorWorkspaceState(
        createEmptyWorkspace()
      );
    }
  }, [keyword, language]);

  /*
  ============================================================
  SAVE CURRENT WORKSPACE
  ============================================================
  */

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    const normalizedKeyword =
      keyword.trim();

    if (!normalizedKeyword) {
      return;
    }

    const storageKey =
      getStorageKey(
        normalizedKeyword,
        language
      );

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(
          creatorWorkspace
        )
      );
    } catch (error) {
      console.error(
        "Failed to save Creator Workspace:",
        error
      );
    }
  }, [
    creatorWorkspace,
    keyword,
    language,
  ]);

  /*
  ============================================================
  GENERATE CREATOR WORKSPACE
  ============================================================
  */

  const generateCreatorWorkspace =
    useCallback(
      async (
        targetKeyword = keyword
      ): Promise<
        CreatorWorkspaceData | null
      > => {
        const normalizedKeyword =
          targetKeyword.trim();

        if (!normalizedKeyword) {
          setError(
            language === "ko"
              ? "먼저 분석할 키워드를 입력해주세요."
              : "Please enter a keyword first."
          );

          return null;
        }

        if (
          creatorWorkspaceLoading ||
          creatorRegenerating
        ) {
          return null;
        }

        setError("");

        setCreatorWorkspaceLoading(
          true
        );

        try {
          const response =
            await fetch(
              "/api/ai/creator-kit",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  keyword:
                    normalizedKeyword,

                  language,
                }),
              }
            );

          let data: unknown;

          try {
            data =
              await response.json();
          } catch {
            throw new Error(
              language === "ko"
                ? "AI 서버에서 올바른 응답을 받지 못했습니다."
                : "The AI server returned an invalid response."
            );
          }

          if (
            !response.ok
          ) {
            const errorData =
              data &&
              typeof data ===
                "object"
                ? (data as Record<
                    string,
                    unknown
                  >)
                : {};

            if (
              response.status ===
                403 &&
              errorData.upgrade ===
                true
            ) {
              throw new Error(
                "UPGRADE_REQUIRED"
              );
            }

            throw new Error(
              typeof errorData.error ===
                "string"
                ? errorData.error
                : language === "ko"
                ? "Creator Workspace 생성에 실패했습니다."
                : "Failed to generate Creator Workspace."
            );
          }

          const normalized =
            normalizeWorkspace(
              data
            );

          setCreatorWorkspaceState(
            normalized
          );

          void trackEvent("creator_generate", {
  keyword: normalizedKeyword,

  metadata: {
    viralScore:
      normalized.viralScore,

    titleCount:
      normalized.titles.length,
  },
});

          /*
           * Save immediately.
           *
           * This protects the generated
           * workspace even before another
           * render cycle occurs.
           */
          try {
            const storageKey =
              getStorageKey(
                normalizedKeyword,
                language
              );

            localStorage.setItem(
              storageKey,
              JSON.stringify(
                normalized
              )
            );
          } catch (storageError) {
            console.error(
              "Failed to persist generated Creator Workspace:",
              storageError
            );
          }

          /*
           * Keep parent keyword synchronized.
           *
           * This is especially useful when
           * Creator Workspace is launched
           * from an Opportunity or Strategy card.
           */
          if (
            keyword.trim() !==
            normalizedKeyword
          ) {
            setKeyword(
              normalizedKeyword
            );
          }

          return normalized;
        } catch (error) {
          console.error(
            "Creator Workspace generation failed:",
            error
          );

          if (
            error instanceof Error &&
            error.message ===
              "UPGRADE_REQUIRED"
          ) {
            setError(
              language === "ko"
                ? "이 기능을 사용하려면 플랜 업그레이드가 필요합니다."
                : "Please upgrade your plan to use this feature."
            );

            return null;
          }

          setError(
            language === "ko"
              ? "AI Creator Workspace를 생성하지 못했습니다. 잠시 후 다시 시도해주세요."
              : "Failed to generate AI Creator Workspace. Please try again."
          );

          return null;
        } finally {
          setCreatorWorkspaceLoading(
            false
          );
        }
      },
      [
        keyword,
        language,
        setKeyword,
        setError,
        creatorWorkspaceLoading,
        creatorRegenerating,
      ]
    );

  /*
  ============================================================
  EXPORT CREATOR KIT
  ============================================================
  */

  const handleExportCreatorKit =
    useCallback(() => {
      const normalizedKeyword =
        keyword.trim();

      if (!normalizedKeyword) {
        setError(
          language === "ko"
            ? "먼저 키워드를 검색해주세요."
            : "Please search for a keyword first."
        );

        return;
      }

      if (
        !hasCreatorContent(
          creatorWorkspace
        )
      ) {
        setError(
          language === "ko"
            ? "내보낼 Creator Kit이 없습니다."
            : "There is no Creator Kit to export."
        );

        return;
      }

      try {
        downloadCreatorKit({
          keyword:
            normalizedKeyword,

          titles:
            creatorWorkspace.titles,

          hook:
            creatorWorkspace.hook,

          script:
            creatorWorkspace.script,

          description:
            creatorWorkspace.description,

          hashtags:
            creatorWorkspace.hashtags,

          thumbnailPrompt:
            creatorWorkspace.thumbnailPrompt,

          uploadStrategy:
            creatorWorkspace.uploadStrategy,

          uploadTime:
            creatorWorkspace.uploadTime,

          targetAudience:
            creatorWorkspace.targetAudience,

          seoKeywords:
            creatorWorkspace.seoKeywords,

          pinnedComment:
            creatorWorkspace.pinnedComment,

          communityPost:
            creatorWorkspace.communityPost,

          viralScore:
            creatorWorkspace.viralScore,

          /*
           * New Creator assets
           */
          callToAction:
            creatorWorkspace.callToAction,

          shortsScript:
            creatorWorkspace.shortsScript,

          instagramCaption:
            creatorWorkspace.instagramCaption,

          twitterPost:
            creatorWorkspace.twitterPost,
        });
      } catch (error) {
        console.error(
          "Creator Kit export failed:",
          error
        );

        setError(
          language === "ko"
            ? "Creator Kit을 내보내지 못했습니다."
            : "Failed to export Creator Kit."
        );
      }
    }, [
      keyword,
      language,
      creatorWorkspace,
      setError,
    ]);

  /*
  ============================================================
  REGENERATE SINGLE CREATOR SECTION
  ============================================================
  */

  const regenerateCreatorSection =
    useCallback(
      async (
        section: CreatorSection
      ) => {
        const normalizedKeyword =
          keyword.trim();

        if (
          !normalizedKeyword
        ) {
          setError(
            language === "ko"
              ? "먼저 키워드를 입력해주세요."
              : "Please enter a keyword first."
          );

          return;
        }

        if (
          creatorRegenerating ||
          creatorWorkspaceLoading
        ) {
          return;
        }

        setError("");

        setCreatorRegenerating(
          section
        );

        try {
          const response =
            await fetch(
              "/api/ai/creator-kit",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  keyword:
                    normalizedKeyword,

                  language,

                  section,
                }),
              }
            );

          let data: unknown;

          try {
            data =
              await response.json();
          } catch {
            throw new Error(
              language === "ko"
                ? "AI 서버의 응답을 읽을 수 없습니다."
                : "Unable to read the AI server response."
            );
          }

          const responseData =
            data &&
            typeof data ===
              "object"
              ? (data as Record<
                  string,
                  unknown
                >)
              : {};

          if (
            !response.ok
          ) {
            if (
              response.status ===
                403 &&
              responseData.upgrade ===
                true
            ) {
              throw new Error(
                "UPGRADE_REQUIRED"
              );
            }

            throw new Error(
              typeof responseData.error ===
                "string"
                ? responseData.error
                : language === "ko"
                ? "콘텐츠를 다시 생성하지 못했습니다."
                : "Failed to regenerate this content."
            );
          }

          if (
            responseData.success !==
            true
          ) {
            throw new Error(
              typeof responseData.error ===
                "string"
                ? responseData.error
                : language === "ko"
                ? "콘텐츠를 다시 생성하지 못했습니다."
                : "Failed to regenerate this content."
            );
          }

          const value =
            responseData.value;

          /*
          ========================================================
          SECTION-SPECIFIC VALIDATION
          ========================================================
          */

          if (
            section === "titles"
          ) {
            if (
              !Array.isArray(
                value
              )
            ) {
              throw new Error(
                "Invalid titles response."
              );
            }

            const titles =
              cleanStringArray(
                value,
                5
              );

            if (
              titles.length ===
              0
            ) {
              throw new Error(
                "Empty titles response."
              );
            }

            setCreatorWorkspaceState(
              (previous) => ({
                ...previous,

                titles,
              })
            );
          } else if (
            section ===
            "hashtags"
          ) {
            const hashtags =
              normalizeHashtags(
                value
              );

            if (
              hashtags.length ===
              0
            ) {
              throw new Error(
                "Empty hashtags response."
              );
            }

            setCreatorWorkspaceState(
              (previous) => ({
                ...previous,

                hashtags,
              })
            );
          } else if (
            section === "seo"
          ) {
            if (
              !Array.isArray(
                value
              )
            ) {
              throw new Error(
                "Invalid SEO response."
              );
            }

            const seoKeywords =
              cleanStringArray(
                value,
                15
              );

            if (
              seoKeywords.length ===
              0
            ) {
              throw new Error(
                "Empty SEO response."
              );
            }

            setCreatorWorkspaceState(
              (previous) => ({
                ...previous,

                seoKeywords,
              })
            );
          } else {
            if (
              typeof value !==
                "string" ||
              !value.trim()
            ) {
              throw new Error(
                "Empty creator section response."
              );
            }

            const text =
              value.trim();

            setCreatorWorkspaceState(
              (previous) => {
                switch (
                  section
                ) {
                  case "hook":
                    return {
                      ...previous,
                      hook: text,
                    };

                  case "script":
                    return {
                      ...previous,
                      script: text,
                    };

                  case "thumbnail":
                    return {
                      ...previous,
                      thumbnailPrompt:
                        text,
                    };

                  case "description":
                    return {
                      ...previous,
                      description:
                        text,
                    };

                  case "strategy":
                    return {
                      ...previous,
                      uploadStrategy:
                        text,
                    };

                  case "pinnedComment":
                    return {
                      ...previous,
                      pinnedComment:
                        text,
                    };

                  case "communityPost":
                    return {
                      ...previous,
                      communityPost:
                        text,
                    };

                  case "callToAction":
                    return {
                      ...previous,
                      callToAction:
                        text,
                    };

                  case "shortsScript":
                    return {
                      ...previous,
                      shortsScript:
                        text,
                    };

                  case "instagramCaption":
                    return {
                      ...previous,
                      instagramCaption:
                        text,
                    };

                  case "twitterPost":
                    return {
                      ...previous,
                      twitterPost:
                        text,
                    };

                  default:
                    return previous;
                }
              }
            );
          }
          void trackEvent("creator_regenerate", {
  keyword: normalizedKeyword,

  metadata: {
    section,
  },
});
        } catch (error) {
          console.error(
            "Creator section regeneration failed:",
            error
          );

          if (
            error instanceof Error &&
            error.message ===
              "UPGRADE_REQUIRED"
          ) {
            setError(
              language === "ko"
                ? "이 기능을 계속 사용하려면 플랜 업그레이드가 필요합니다."
                : "Please upgrade your plan to continue using this feature."
            );

            return;
          }

          setError(
            language === "ko"
              ? "콘텐츠를 다시 생성하지 못했습니다. 잠시 후 다시 시도해주세요."
              : "Failed to regenerate this content. Please try again."
          );
        } finally {
          setCreatorRegenerating(
            null
          );
        }
      },
      [
        keyword,
        language,
        setError,
        creatorRegenerating,
        creatorWorkspaceLoading,
      ]
    );

  /*
  ============================================================
  CREATOR STATUS
  ============================================================
  */

  const creatorHasContent =
    useMemo(
      () =>
        hasCreatorContent(
          creatorWorkspace
        ),
      [creatorWorkspace]
    );

  /*
  ============================================================
  RETURN
  ============================================================
  */

  return {
    creatorWorkspace,

    setCreatorWorkspace,

    creatorWorkspaceLoading,

    creatorRegenerating,

    creatorHasContent,

    generateCreatorWorkspace,

    handleExportCreatorKit,

    regenerateCreatorSection,
  };
}
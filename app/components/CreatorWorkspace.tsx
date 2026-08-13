"use client";

import {
  useState,
  type ReactNode,
} from "react";

export type CreatorSection =
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

type CreatorWorkspaceProps = {
  keyword: string;
  language: string;

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

  callToAction?: string;
  shortsScript?: string;
  instagramCaption?: string;
  twitterPost?: string;

    onGenerate: () => void;

  onExport?: () => void;

  onRegenerate?: (
    section: CreatorSection
  ) => void;

  regeneratingSection?:
    | CreatorSection
    | null;

  loading?: boolean;
};

type CopyButtonProps = {
  value: string;
  label?: string;
  language: string;
};

function CopyButton({
  value,
  label,
  language,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!value}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
    >
      {copied
        ? language === "ko"
          ? "✓ 복사됨"
          : "✓ Copied"
        : label ??
          (language === "ko"
            ? "복사"
            : "Copy")}
    </button>
  );
}

function RegenerateButton({
  section,
  language,
  onRegenerate,
  regeneratingSection,
}: {
  section: CreatorSection;
  language: string;
  onRegenerate?: (
    section: CreatorSection
  ) => void;
  regeneratingSection?:
    | CreatorSection
    | null;
}) {
  const isLoading =
    regeneratingSection === section;

  const disabled =
    !onRegenerate ||
    !!regeneratingSection;

  return (
    <button
      type="button"
      onClick={() => onRegenerate?.(section)}
      disabled={disabled}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/50 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isLoading
        ? language === "ko"
          ? "생성 중..."
          : "Generating..."
        : language === "ko"
          ? "↻ 다시 생성"
          : "↻ Regenerate"}
    </button>
  );
}

function CardActions({
  value,
  language,
  section,
  onRegenerate,
  regeneratingSection,
  copyLabel,
}: {
  value: string;
  language: string;
  section: CreatorSection;
  onRegenerate?: (
    section: CreatorSection
  ) => void;
  regeneratingSection?:
    | CreatorSection
    | null;
  copyLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <RegenerateButton
        section={section}
        language={language}
        onRegenerate={onRegenerate}
        regeneratingSection={
          regeneratingSection
        }
      />

      <CopyButton
        value={value}
        language={language}
        label={copyLabel}
      />
    </div>
  );
}

function WorkspaceCard({
  eyebrow,
  title,
  description,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/15">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
            {eyebrow}
          </p>

          <h3 className="mt-1 text-lg font-black text-white">
            {title}
          </h3>

          {description && (
            <p className="mt-1 text-xs leading-5 text-white/35">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      {children}
    </div>
  );
}

export default function CreatorWorkspace({
  keyword,
  language,
  titles,
  hook,
  script,
  description,
  hashtags,
  thumbnailPrompt,
  uploadStrategy,
  uploadTime,
  targetAudience,
  seoKeywords,
  pinnedComment,
  communityPost,
  viralScore,
  callToAction = "",
  shortsScript = "",
  instagramCaption = "",
  twitterPost = "",
  onGenerate,
  onExport,
  onRegenerate,
  regeneratingSection = null,
  loading = false,
}: CreatorWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<
    "content" | "seo" | "publishing"
  >("content");

  const hasContent =
    titles.length > 0 ||
    !!hook ||
    !!script ||
    !!description;

  const normalizedViralScore = Math.max(
    0,
    Math.min(100, viralScore || 0)
  );

  const getViralLabel = () => {
    if (normalizedViralScore >= 80) {
      return language === "ko"
        ? "높은 바이럴 잠재력"
        : "HIGH VIRAL POTENTIAL";
    }

    if (normalizedViralScore >= 60) {
      return language === "ko"
        ? "좋은 바이럴 잠재력"
        : "GOOD VIRAL POTENTIAL";
    }

    return language === "ko"
      ? "추가 최적화 필요"
      : "NEEDS OPTIMIZATION";
  };

  return (
    <section className="mt-10 scroll-mt-24">
      {/* =======================================================
          HEADER
      ======================================================= */}

      <div className="overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.03] to-transparent">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                  AI CREATOR WORKSPACE
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white/40">
                  {keyword}
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                {language === "ko"
                  ? "분석 결과를 바로 콘텐츠로"
                  : "Turn research into content."}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                {language === "ko"
                  ? "Benchmark AI가 분석한 기회를 실제 YouTube 제작물로 전환하세요. 제목부터 업로드 전략까지 한 번에 준비할 수 있습니다."
                  : "Turn Benchmark AI's research into a complete YouTube production package — from titles and hooks to SEO and publishing strategy."}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row lg:flex-col">
  <button
    type="button"
    onClick={onGenerate}
    disabled={
      loading ||
      !!regeneratingSection
    }
    className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-black text-black shadow-lg shadow-emerald-500/10 transition hover:scale-[1.02] hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
  >
    {loading
      ? "⏳ "
      : "🚀 "}

    {loading
      ? language === "ko"
        ? "생성 중..."
        : "Generating..."
      : language === "ko"
        ? "AI 콘텐츠 다시 생성"
        : "Regenerate Content"}
  </button>

  {hasContent && (
    <button
      type="button"
      onClick={onExport}
      disabled={
        loading ||
        !!regeneratingSection ||
        !onExport
      }
      className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-black text-white/75 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      📦{" "}
      {language === "ko"
        ? "Creator Kit 내보내기"
        : "Export Creator Kit"}
    </button>
  )}

  {hasContent && (
    <div className="text-center text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">
      AI production package ready
    </div>
  )}
</div>
          </div>
        </div>

        {/* Viral Score */}
        <div className="border-t border-white/10 bg-black/20 px-6 py-5 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30">
                VIRAL POTENTIAL
              </p>

              <p className="mt-1 text-sm font-bold">
                {getViralLabel()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                  style={{
                    width: `${normalizedViralScore}%`,
                  }}
                />
              </div>

              <div className="min-w-[70px] text-right">
                <span className="text-2xl font-black text-emerald-400">
                  {normalizedViralScore}
                </span>

                <span className="text-xs text-white/30">
                  /100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          NAVIGATION
      ======================================================= */}

      <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-2">
        {[
          {
            id: "content" as const,
            label:
              language === "ko"
                ? "콘텐츠 제작"
                : "Content",
          },
          {
            id: "seo" as const,
            label: "SEO",
          },
          {
            id: "publishing" as const,
            label:
              language === "ko"
                ? "업로드 전략"
                : "Publishing",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-black transition ${
              activeTab === tab.id
                ? "bg-white text-black"
                : "text-white/40 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =======================================================
          CONTENT TAB
      ======================================================= */}

      {activeTab === "content" && (
        <div className="mt-5 grid gap-5">
          {/* TITLES */}

          <WorkspaceCard
            eyebrow="01 · TITLES"
            title={
              language === "ko"
                ? "클릭을 노리는 제목"
                : "High-CTR Titles"
            }
            description={
              language === "ko"
                ? "AI가 생성한 제목 후보 중 가장 강력한 옵션을 선택하세요."
                : "Choose the strongest title from the AI-generated variations."
            }
            action={
              <CardActions
                value={titles.join("\n")}
                language={language}
                section="titles"
                onRegenerate={
                  onRegenerate
                }
                regeneratingSection={
                  regeneratingSection
                }
                copyLabel={
                  language === "ko"
                    ? "전체 복사"
                    : "Copy All"
                }
              />
            }
          >
            <div className="grid gap-2">
              {titles.length > 0 ? (
                titles.map((title, index) => (
                  <div
                    key={`${title}-${index}`}
                    className="group flex items-start gap-3 rounded-xl border border-white/5 bg-black/20 p-4 transition hover:border-emerald-500/20 hover:bg-emerald-500/[0.03]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-black text-white/30">
                      {index + 1}
                    </div>

                    <p className="flex-1 text-sm font-bold leading-6 text-white/85">
                      {title}
                    </p>

                    <CopyButton
                      value={title}
                      language={language}
                    />
                  </div>
                ))
              ) : (
                <EmptyState
                  language={language}
                />
              )}
            </div>
          </WorkspaceCard>

          {/* HOOK + SCRIPT */}

          <div className="grid gap-5 lg:grid-cols-2">
            <WorkspaceCard
              eyebrow="02 · HOOK"
              title={
                language === "ko"
                  ? "첫 5초"
                  : "First 5 Seconds"
              }
              description={
                language === "ko"
                  ? "시청자가 계속 볼 이유를 첫 순간에 만드세요."
                  : "Give viewers a reason to keep watching immediately."
              }
              action={
                <CardActions
                  value={hook}
                  language={language}
                  section="hook"
                  onRegenerate={
                    onRegenerate
                  }
                  regeneratingSection={
                    regeneratingSection
                  }
                />
              }
            >
              <div className="min-h-[180px] rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">
                <p className="text-base font-bold leading-7 text-white/85">
                  {hook ||
                    (language === "ko"
                      ? "아직 Hook이 생성되지 않았습니다."
                      : "No hook generated yet.")}
                </p>
              </div>
            </WorkspaceCard>

            <WorkspaceCard
              eyebrow="03 · SCRIPT"
              title={
                language === "ko"
                  ? "60–90초 스크립트"
                  : "60–90s Script"
              }
              action={
                <CardActions
                  value={script}
                  language={language}
                  section="script"
                  onRegenerate={
                    onRegenerate
                  }
                  regeneratingSection={
                    regeneratingSection
                  }
                />
              }
            >
              <div className="max-h-[300px] min-h-[180px] overflow-y-auto rounded-xl border border-white/5 bg-black/20 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                  {script ||
                    (language === "ko"
                      ? "아직 스크립트가 생성되지 않았습니다."
                      : "No script generated yet.")}
                </p>
              </div>
            </WorkspaceCard>
          </div>

          {/* THUMBNAIL */}

          <WorkspaceCard
            eyebrow="04 · THUMBNAIL"
            title={
              language === "ko"
                ? "고CTR 썸네일 콘셉트"
                : "High-CTR Thumbnail Concept"
            }
            description={
              language === "ko"
                ? "이미지 생성 AI에 바로 사용할 수 있는 프롬프트입니다."
                : "A production-ready prompt for image generation."
            }
            action={
              <CardActions
                value={thumbnailPrompt}
                language={language}
                section="thumbnail"
                onRegenerate={
                  onRegenerate
                }
                regeneratingSection={
                  regeneratingSection
                }
              />
            }
          >
            <div className="rounded-xl border border-white/5 bg-black/20 p-5">
              <p className="text-sm leading-7 text-white/65">
                {thumbnailPrompt ||
                  (language === "ko"
                    ? "아직 썸네일 프롬프트가 없습니다."
                    : "No thumbnail prompt generated yet.")}
              </p>
            </div>
          </WorkspaceCard>

          {/* CTA */}

          <WorkspaceCard
  eyebrow="05 · CTA"
  title={
    language === "ko"
      ? "시청자 행동 유도"
      : "Call To Action"
  }
  description={
    language === "ko"
      ? "구독, 댓글, 다음 콘텐츠 시청을 자연스럽게 유도합니다."
      : "A natural CTA designed to encourage engagement."
  }
  action={
    <CardActions
      value={callToAction}
      language={language}
      section="callToAction"
      onRegenerate={onRegenerate}
      regeneratingSection={
        regeneratingSection
      }
    />
  }
>
            <div className="rounded-xl border border-white/5 bg-black/20 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {callToAction ||
                  (language === "ko"
                    ? "CTA가 아직 생성되지 않았습니다."
                    : "No CTA generated yet.")}
              </p>

              <div className="mt-4">
                <CopyButton
                  value={callToAction}
                  language={language}
                />
              </div>
            </div>
          </WorkspaceCard>

          {/* SHORTS */}

          <WorkspaceCard
  eyebrow="06 · SHORTS"
  title={
    language === "ko"
      ? "YouTube Shorts 스크립트"
      : "YouTube Shorts Script"
  }
  description={
    language === "ko"
      ? "롱폼 콘텐츠를 짧고 빠른 Shorts 형식으로 전환합니다."
      : "A fast-paced short-form version of the main content."
  }
  action={
    <CardActions
      value={shortsScript}
      language={language}
      section="shortsScript"
      onRegenerate={onRegenerate}
      regeneratingSection={
        regeneratingSection
      }
    />
  }
>
            <div className="max-h-[300px] overflow-y-auto rounded-xl border border-white/5 bg-black/20 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {shortsScript ||
                  (language === "ko"
                    ? "Shorts 스크립트가 아직 생성되지 않았습니다."
                    : "No Shorts script generated yet.")}
              </p>
            </div>

            <div className="mt-4">
              <CopyButton
                value={shortsScript}
                language={language}
              />
            </div>
          </WorkspaceCard>

          {/* INSTAGRAM */}

          <WorkspaceCard
  eyebrow="07 · INSTAGRAM"
  title={
    language === "ko"
      ? "Instagram Caption"
      : "Instagram Caption"
  }
  action={
    <CardActions
      value={instagramCaption}
      language={language}
      section="instagramCaption"
      onRegenerate={onRegenerate}
      regeneratingSection={
        regeneratingSection
      }
    />
  }
>
            <div className="rounded-xl border border-white/5 bg-black/20 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {instagramCaption ||
                  "--"}
              </p>
            </div>

            <div className="mt-4">
              <CopyButton
                value={instagramCaption}
                language={language}
              />
            </div>
          </WorkspaceCard>

          {/* X / TWITTER */}

          <WorkspaceCard
  eyebrow="08 · X / TWITTER"
  title="X / Twitter Post"
  action={
    <CardActions
      value={twitterPost}
      language={language}
      section="twitterPost"
      onRegenerate={onRegenerate}
      regeneratingSection={
        regeneratingSection
      }
    />
  }
>
            <div className="rounded-xl border border-white/5 bg-black/20 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {twitterPost ||
                  "--"}
              </p>
            </div>

            <div className="mt-4">
              <CopyButton
                value={twitterPost}
                language={language}
              />
            </div>
          </WorkspaceCard>
        </div>
      )}

      {/* =======================================================
          SEO TAB
      ======================================================= */}

      {activeTab === "seo" && (
        <div className="mt-5 grid gap-5">
          {/* DESCRIPTION */}

          <WorkspaceCard
            eyebrow="09 · DESCRIPTION"
            title={
              language === "ko"
                ? "SEO 설명"
                : "SEO Description"
            }
            action={
              <CardActions
                value={description}
                language={language}
                section="description"
                onRegenerate={
                  onRegenerate
                }
                regeneratingSection={
                  regeneratingSection
                }
              />
            }
          >
            <div className="max-h-[360px] overflow-y-auto rounded-xl border border-white/5 bg-black/20 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {description ||
                  (language === "ko"
                    ? "아직 설명이 생성되지 않았습니다."
                    : "No description generated yet.")}
              </p>
            </div>
          </WorkspaceCard>

          {/* HASHTAGS */}

          <WorkspaceCard
            eyebrow="10 · HASHTAGS"
            title={
              language === "ko"
                ? "YouTube 해시태그"
                : "YouTube Hashtags"
            }
            action={
              <CardActions
                value={hashtags.join(" ")}
                language={language}
                section="hashtags"
                onRegenerate={
                  onRegenerate
                }
                regeneratingSection={
                  regeneratingSection
                }
                copyLabel={
                  language === "ko"
                    ? "전체 복사"
                    : "Copy All"
                }
              />
            }
          >
            <div className="flex flex-wrap gap-2">
              {hashtags.length > 0 ? (
                hashtags.map(
                  (hashtag, index) => (
                    <button
                      key={`${hashtag}-${index}`}
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            hashtag
                          );
                        } catch (error) {
                          console.error(
                            error
                          );
                        }
                      }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/60 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                    >
                      {hashtag}
                    </button>
                  )
                )
              ) : (
                <EmptyState
                  language={language}
                />
              )}
            </div>
          </WorkspaceCard>

          {/* KEYWORDS */}

          <WorkspaceCard
            eyebrow="11 · KEYWORDS"
            title={
              language === "ko"
                ? "SEO 키워드"
                : "SEO Keywords"
            }
            action={
              <CardActions
                value={seoKeywords.join(", ")}
                language={language}
                section="seo"
                onRegenerate={
                  onRegenerate
                }
                regeneratingSection={
                  regeneratingSection
                }
              />
            }
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {seoKeywords.length > 0 ? (
                seoKeywords.map(
                  (keywordItem, index) => (
                    <div
                      key={`${keywordItem}-${index}`}
                      className="rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm font-medium text-white/65"
                    >
                      {keywordItem}
                    </div>
                  )
                )
              ) : (
                <EmptyState
                  language={language}
                />
              )}
            </div>
          </WorkspaceCard>
        </div>
      )}

      {/* =======================================================
          PUBLISHING TAB
      ======================================================= */}

      {activeTab === "publishing" && (
        <div className="mt-5 grid gap-5">
          <div className="grid gap-5 md:grid-cols-3">
            <MetricCard
              label={
                language === "ko"
                  ? "추천 업로드 시간"
                  : "Recommended Time"
              }
              value={uploadTime || "--"}
            />

            <MetricCard
              label={
                language === "ko"
                  ? "타겟 시청자"
                  : "Target Audience"
              }
              value={
                targetAudience || "--"
              }
            />

            <MetricCard
              label={
                language === "ko"
                  ? "바이럴 점수"
                  : "Viral Score"
              }
              value={`${normalizedViralScore}/100`}
            />
          </div>

          {/* STRATEGY */}

          <WorkspaceCard
            eyebrow="12 · STRATEGY"
            title={
              language === "ko"
                ? "업로드 전략"
                : "Upload Strategy"
            }
            action={
              <CardActions
                value={uploadStrategy}
                language={language}
                section="strategy"
                onRegenerate={
                  onRegenerate
                }
                regeneratingSection={
                  regeneratingSection
                }
              />
            }
          >
            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {uploadStrategy ||
                  (language === "ko"
                    ? "업로드 전략이 아직 생성되지 않았습니다."
                    : "No upload strategy generated yet.")}
              </p>
            </div>
          </WorkspaceCard>

          {/* PINNED + COMMUNITY */}

          <div className="grid gap-5 lg:grid-cols-2">
            <WorkspaceCard
              eyebrow="13 · PINNED COMMENT"
              title={
                language === "ko"
                  ? "고정 댓글"
                  : "Pinned Comment"
              }
              action={
                <CardActions
                  value={pinnedComment}
                  language={language}
                  section="pinnedComment"
                  onRegenerate={
                    onRegenerate
                  }
                  regeneratingSection={
                    regeneratingSection
                  }
                />
              }
            >
              <div className="rounded-xl border border-white/5 bg-black/20 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                  {pinnedComment ||
                    "--"}
                </p>
              </div>
            </WorkspaceCard>

            <WorkspaceCard
              eyebrow="14 · COMMUNITY"
              title={
                language === "ko"
                  ? "커뮤니티 게시물"
                  : "Community Post"
              }
              action={
                <CardActions
                  value={communityPost}
                  language={language}
                  section="communityPost"
                  onRegenerate={
                    onRegenerate
                  }
                  regeneratingSection={
                    regeneratingSection
                  }
                />
              }
            >
              <div className="rounded-xl border border-white/5 bg-black/20 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                  {communityPost ||
                    "--"}
                </p>
              </div>
            </WorkspaceCard>
          </div>
        </div>
      )}

      {/* =======================================================
          BOTTOM CTA
      ======================================================= */}

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black">
            {language === "ko"
              ? "콘텐츠 제작 준비 완료"
              : "Content package ready"}
          </p>

          <p className="mt-1 text-xs leading-5 text-white/35">
            {language === "ko"
              ? "제목을 선택하고 Hook, Script, Thumbnail, SEO 결과를 실제 제작에 사용하세요."
              : "Pick a title and use the Hook, Script, Thumbnail and SEO assets in your production workflow."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveTab("content");

            window.scrollTo({
              top:
                document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-black text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          {language === "ko"
            ? "↑ 제작 결과 보기"
            : "↑ View Production Assets"}
        </button>
      </div>
    </section>
  );
}

function EmptyState({
  language,
}: {
  language: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-black/10 p-5 text-sm text-white/30">
      {language === "ko"
        ? "생성된 결과가 없습니다."
        : "No generated result yet."}
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}
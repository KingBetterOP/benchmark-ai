type LoadingActions = {
  setLoading: (loading: boolean) => void;
  setLoadingStep: (step: string) => void;
  setLoadingProgress: (progress: number) => void;
};

export function startLoading({
  setLoading,
  setLoadingStep,
  setLoadingProgress,
}: LoadingActions) {
  setLoading(true);
  setLoadingProgress(10);
  setLoadingStep("🔍 YouTube 검색 중...");
}

export function finishLoading({
  setLoading,
  setLoadingStep,
}: Pick<LoadingActions, "setLoading" | "setLoadingStep">) {
  setLoading(false);
  setLoadingStep("");
}
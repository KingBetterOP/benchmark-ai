import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
type ValidateSearchParams = {
  keyword: string;
  user: any;
  router: AppRouterInstance;
};



export function validateSearch({
  keyword,
  user,
  router,
}: ValidateSearchParams) {
  if (!keyword.trim()) {
    return false;
  }

  if (!user) {
    alert("🔒 AI 분석을 이용하려면 로그인해주세요.");
    router.push("/sign-in");
    return false;
  }

  return true;
}
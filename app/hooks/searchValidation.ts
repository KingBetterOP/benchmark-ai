import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
type ValidateSearchParams = {
  keyword: string;
  user: { id: string } | null | undefined;
  router: AppRouterInstance;
};



export function validateSearch({
  keyword, 
  user, 
  router,
}: ValidateSearchParams) {
  if (!keyword.trim()) {
  alert("🔍 검색어를 입력해주세요.");
  return false;
}
if (keyword.trim().length < 2) {
  alert("🔍 검색어는 2글자 이상 입력해주세요.");
  return false;
}

  if (!user) {
    alert("🔒 AI 분석을 이용하려면 로그인해주세요.");
    router.push("/sign-in");
    return false;
  }

  return true;
}
"use client";
type SearchBarProps = {
  keyword: string;
  setKeyword: (value: string) => void;

  order: string;
  setOrder: (value: string) => void;

  onSearch: () => void;
};

export default function SearchBar({
  keyword,
  setKeyword,
  order,
  setOrder,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="mt-10 flex justify-center gap-3">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search YouTube keyword..."
        className="w-[500px] rounded-lg border border-gray-700 bg-zinc-900 p-4"
      />
<select
  value={order}
  onChange={(e) => setOrder(e.target.value)}
  className="rounded-lg border border-gray-700 bg-zinc-900 px-4"
>
  <option value="relevance">관련도</option>
  <option value="viewCount">조회수순</option>
  <option value="date">최신순</option>
</select>
      <button
        onClick={onSearch}
        className="rounded-lg bg-red-600 px-6 font-bold hover:bg-red-700"
      >
        Search
      </button>
    </div>
  );
}
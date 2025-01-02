import { Music } from "@/types/types";

export const searchFilter = (allData: Array<Music>, search: string) => {
  if (!search || search === "all") return allData;

  const searchResult = allData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return searchResult;
};

export const categoryFilter = (allData: Array<Music>, category: string) => {
  if (!category || category === "all") return allData;

  const categoryResult = allData.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  return categoryResult;
};

export const languageFilter = (allData: Array<Music>, language: string) => {
  if (!language || language === "all") return allData;

  const languageResult = allData.filter(
    (item) => item.language.toLowerCase() === language.toLowerCase()
  );

  return languageResult;
};

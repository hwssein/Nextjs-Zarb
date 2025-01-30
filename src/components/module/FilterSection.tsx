"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { OnClickEvent } from "@/types/types";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX } from "lucide-react";

function FilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("all");
  const [languageValue, setLanguageValue] = useState<string>("all");

  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const language = searchParams.get("language");

    setSearchValue(search || "");
    setCategoryValue(category || "");
    setLanguageValue(language || "");
  }, [searchParams]);

  useEffect(() => {
    if (categoryValue || languageValue) {
      const currentParams = new URLSearchParams(searchParams.toString());

      if (categoryValue && categoryValue !== "all") {
        currentParams.set("category", categoryValue);
      } else if (!categoryValue || categoryValue === "all") {
        currentParams.delete("category");
      }

      if (languageValue && languageValue !== "all") {
        currentParams.set("language", languageValue);
      } else if (!languageValue || languageValue === "all") {
        currentParams.delete("language");
      }

      router.replace(`/all-musics?${currentParams.toString()}`);
    }
  }, [categoryValue, languageValue, router, searchParams]);

  const searchHandler = (event: OnClickEvent) => {
    event.stopPropagation();

    const currentParams = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      currentParams.set("search", searchValue);
    } else if (!searchValue) {
      currentParams.delete("search");
    }

    router.replace(`/all-musics?${currentParams.toString()}`);
  };

  const clearSearch = (event: OnClickEvent) => {
    event.stopPropagation();

    setSearchValue("");

    searchHandler(event);
    router.replace("/all-musics");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-4 mb-2 md:flex-row">
        <div className="w-full flex items-center justify-start gap-2 md:w-1/2">
          <div className="w-full flex items-center justify-start gap-1 border border-input rounded-md px-1 transition-colors focus-within:border-primary">
            <input
              type="text"
              placeholder="Search By Music Name"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              name="search"
              className="w-[calc(100%-32px)] h-9 px-3 py-1 bg-background placeholder:text-muted-foreground file:text-foreground"
            />

            {searchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="[&_svg]:size-5"
                onClick={clearSearch}
              >
                <CircleX className="text-stroke w-full" />
              </Button>
            )}
          </div>

          <Button size="sm" onClick={searchHandler}>
            Search
          </Button>
        </div>

        <div className="w-full flex items-center justify-evenly gap-2 md:w-1/2">
          <div>
            <Select onValueChange={(value) => setCategoryValue(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                <SelectItem value="house">House</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select onValueChange={(value) => setLanguageValue(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="persian">Persian</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="turkish">Turkish</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <span className="w-full block h-px bg-secondary"></span>
    </>
  );
}

export default FilterSection;

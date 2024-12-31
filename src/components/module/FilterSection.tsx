"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FilterSection() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [languageValue, setLanguageValue] = useState<string>("");

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-4 mb-4 md:flex-row">
        <div className="w-full flex items-center justify-start gap-2 md:w-1/2">
          <Input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            name="search"
          />
          <Button size="sm">Search</Button>
        </div>

        <div className="w-full flex items-center justify-evenly gap-2 md:w-1/2">
          <div>
            <Select onValueChange={(value) => setCategoryValue(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
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
                <SelectItem value="persian">Persian</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="turkish">Turkish</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSection;

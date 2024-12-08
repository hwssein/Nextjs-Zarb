"use client";

import { useState } from "react";

import { MusicFormProps } from "@/types/types";

import AddMusicForm from "./AddMusicForm";

function AddMusicSection() {
  const [form, setForm] = useState<MusicFormProps>({
    name: "",
    artist: "",
    url: "",
    category: "remix",
    language: "persian",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    setForm({ ...form, [name]: name === "url" ? value.trim() : value });
  };

  return (
    <>
      <section className="w-full p-2 rounded-md border border-stroke shadow-sm">
        <AddMusicForm form={form} changeHandler={changeHandler} />
      </section>
    </>
  );
}

export default AddMusicSection;

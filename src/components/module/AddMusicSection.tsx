"use client";

import { useState } from "react";

import { MusicFormProps, OnChangeType } from "@/types/types";

import AddMusicForm from "./AddMusicForm";
import saveMusic from "@/serverAction/saveMusic";
import { useToast } from "@/hooks/use-toast";

function AddMusicSection() {
  const { toast } = useToast();

  const [form, setForm] = useState<MusicFormProps>({
    name: "",
    artist: "",
    url: "",
    category: "",
    language: "",
  });

  const changeHandler = (event: OnChangeType) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: name === "url" ? value.trim() : value });
  };

  const saveMusicHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    if (form.name && form.url && form.category) {
      event.preventDefault();

      const data = await saveMusic(form);

      if (data.message) {
        toast({
          description:
            "music saved successfully, will be published after approval.",
        });
        setForm({
          name: "",
          artist: "",
          url: "",
          category: "",
          language: "",
        });
      }

      if (data.error) {
        toast({
          description: "there was a problem, try again",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <section className="w-full p-2 rounded-md border border-stroke shadow-sm">
        <AddMusicForm
          form={form}
          changeHandler={changeHandler}
          saveMusicHandler={saveMusicHandler}
        />
      </section>
    </>
  );
}

export default AddMusicSection;

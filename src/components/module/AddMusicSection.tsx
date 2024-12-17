"use client";

import { useState } from "react";

import { Bool, MusicFormProps, OnChangeType } from "@/types/types";

import AddMusicForm from "./AddMusicForm";
import saveMusic from "@/serverAction/saveMusic";
import { useToast } from "@/hooks/use-toast";
import Loader from "../element/Loader";
import { useRouter } from "next/navigation";

function AddMusicSection() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<Bool>(false);
  const [form, setForm] = useState<MusicFormProps>({
    name: "",
    artist: "",
    url: "",
    mp3File: null,
    category: "",
    language: "",
  });

  const changeHandler = (event: OnChangeType) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: name === "url" ? value.trim() : value });
  };

  const saveMusicHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.artist ||
      !form.category ||
      !form.language ||
      (!form.url && !form.mp3File)
    ) {
      const formData = new FormData();

      for (const i in form) {
        const item = i as keyof MusicFormProps;

        if (form[item] !== null) {
          if (item === "mp3File" && form[item] instanceof File) {
            formData.append(item, form[item]);
          } else {
            formData.append(item, form[item]);
          }
        }
      }

      setIsLoading((prevValue) => !prevValue);

      const data = await saveMusic(formData);

      setIsLoading((prevValue) => !prevValue);

      if (data.message) {
        toast({
          description:
            "music saved successfully, will be published after approval",
        });

        setForm({
          name: "",
          artist: "",
          url: "",
          mp3File: null,
          category: "",
          language: "",
        });

        router.refresh();
      }

      if (data.error) {
        toast({
          description: "there was a problem, try again",
          variant: "destructive",
        });
      }
    } else {
      toast({
        description: "please fill the fields",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <section className="w-full p-2 rounded-md border border-stroke shadow-sm">
        {isLoading ? (
          <>
            <div className="w-full flex flex-col items-center justify-start gap-2 font-light">
              <span>Uploading File in Progress</span>

              <span className="w-10">
                <Loader />
              </span>
            </div>
          </>
        ) : (
          <AddMusicForm
            form={form}
            setForm={setForm}
            changeHandler={changeHandler}
            saveMusicHandler={saveMusicHandler}
          />
        )}
      </section>
    </>
  );
}

export default AddMusicSection;

"use client";

import { useToast } from "@/hooks/use-toast";
import { MusicFormProps, OnChangeType } from "@/types/types";

interface MusicFileInputProps {
  title: string;
  name: string;
  form: MusicFormProps;
  setForm: React.Dispatch<React.SetStateAction<MusicFormProps>>;
}

function MusicFileInput({ title, name, form, setForm }: MusicFileInputProps) {
  const { toast } = useToast();

  const changeHandler = (event: OnChangeType) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type !== "audio/mpeg") {
        toast({
          description: "please select the MP3 file",
          variant: "destructive",
        });
      } else {
        setForm((prevForm) => ({ ...prevForm, mp3File: file }));
        toast({ description: "added successfully" });
      }
    }
  };

  return (
    <>
      <span className="w-full flex items-center justify-start gap-1 text-center font-light">
        <input
          type="file"
          id={`music-${name}`}
          name={name}
          onChange={changeHandler}
          className="hidden"
          disabled={form.mp3File !== null}
        />
        <label
          htmlFor={`music-${name}`}
          className={`bg-secondary border border-stroke py-1 px-2 rounded cursor-pointer hover:bg-stroke transition-all duration-100 ease-in ${
            form.mp3File && "bg-stroke"
          }`}
        >
          {title}
        </label>

        <span className="text-stroke">Max Size 50MB</span>
      </span>
    </>
  );
}

export default MusicFileInput;

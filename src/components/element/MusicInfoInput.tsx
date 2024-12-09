import { MusicFormProps, OnChangeType } from "@/types/types";
import { Input } from "../ui/input";

interface MusicInfoInputProps {
  title: string;
  name: keyof MusicFormProps;
  form: MusicFormProps;
  changeHandler: (event: OnChangeType) => void;
}

function MusicInfoInput({
  title,
  name,
  form,
  changeHandler,
}: MusicInfoInputProps) {
  return (
    <>
      <span className="w-full flex flex-col items-start justify-start gap-1 sm:flex-row sm:items-center sm:gap-2">
        <label htmlFor={`music-${name}`} className="w-14 font-light">
          {title}
        </label>
        <Input
          type="text"
          id={`music-${name}`}
          name={name}
          value={form[name]}
          onChange={changeHandler}
          className="w-full bg-popover"
          required={title === "Artist" ? false : true}
        ></Input>
      </span>
    </>
  );
}

export default MusicInfoInput;

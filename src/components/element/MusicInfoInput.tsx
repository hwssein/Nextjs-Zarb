import { MusicFormProps, OnChangeType } from "@/types/types";
import { Input } from "../ui/input";

interface MusicInfoInputProps {
  title: string;
  name: keyof MusicFormProps;
  value: string;
  changeHandler: (event: OnChangeType) => void;
}

function MusicInfoInput({
  title,
  name,
  value,
  changeHandler,
}: MusicInfoInputProps) {
  return (
    <>
      <span
        className={`w-full flex flex-col items-start justify-start gap-1 ${
          title !== "URL" && "sm:flex-row sm:items-center sm:gap-2"
        }`}
      >
        <label
          htmlFor={`music-${name}`}
          className={`${title !== "URL" && "w-14"} font-light`}
        >
          {title}{" "}
          {title === "URL" && (
            <span className="text-stroke">
              (Please select one of the URL or file methods)
            </span>
          )}
        </label>
        <Input
          type="text"
          id={`music-${name}`}
          name={name}
          value={value}
          onChange={changeHandler}
          className="w-full bg-popover"
        ></Input>
      </span>
    </>
  );
}

export default MusicInfoInput;

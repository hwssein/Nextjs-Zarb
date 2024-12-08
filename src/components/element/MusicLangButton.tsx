import { OnChangeType } from "@/types/types";

interface MusicLangButtonProps {
  title: string;
  value: string;
  changeHandler: (event: OnChangeType) => void;
}

function MusicLangButton({
  title,
  value,
  changeHandler,
}: MusicLangButtonProps) {
  return (
    <span className="w-24 font-light overflow-hidden text-center border border-stroke rounded-md hover:bg-muted transition-all ease-in duration-100 ">
      <input
        type="radio"
        id={`language-${value}`}
        name="language"
        value={value}
        onChange={changeHandler}
        className="hidden"
      />
      <label
        htmlFor={`language-${value}`}
        className="block px-2 py-1 cursor-pointer"
      >
        {title}
      </label>
    </span>
  );
}

export default MusicLangButton;

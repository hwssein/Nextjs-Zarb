import { Bool, OnChangeType } from "@/types/types";

interface MusicLangButtonProps {
  title: string;
  value: string;
  changeHandler: (event: OnChangeType) => void;
  checked: Bool;
}

function MusicLangButton({
  title,
  value,
  changeHandler,
  checked,
}: MusicLangButtonProps) {
  return (
    <span className="w-24 font-light text-center flex items-center">
      <input
        type="radio"
        id={`language-${value}`}
        name="language"
        value={value}
        onChange={changeHandler}
        className="hidden peer"
        checked={checked}
      />
      <label
        htmlFor={`language-${value}`}
        className="w-full px-2 py-1 cursor-pointer border border-stroke rounded-md hover:bg-muted transition-all ease-in duration-100 peer-checked:bg-secondary peer-checked:border-primary"
      >
        {title}
      </label>
    </span>
  );
}

export default MusicLangButton;

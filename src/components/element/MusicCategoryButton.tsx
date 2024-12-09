import { Bool, OnChangeType } from "@/types/types";

interface MusicCategoryButtonProps {
  title: string;
  value: string;
  changeHandler: (event: OnChangeType) => void;
  checked: Bool;
}

function MusicCategoryButton({
  title,
  value,
  changeHandler,
  checked,
}: MusicCategoryButtonProps) {
  return (
    <>
      <span className="w-24 font-light text-center flex items-center">
        <input
          type="radio"
          id={`category-${value}`}
          name="category"
          value={value}
          onChange={changeHandler}
          className="hidden peer"
          checked={checked}
        />
        <label
          htmlFor={`category-${value}`}
          className="w-full px-2 py-1 cursor-pointer border border-stroke rounded-md hover:bg-muted transition-all ease-in duration-100 peer-checked:bg-secondary peer-checked:border-primary"
        >
          {title}
        </label>
      </span>
    </>
  );
}

export default MusicCategoryButton;

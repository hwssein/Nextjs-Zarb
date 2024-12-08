import { OnChangeType } from "@/types/types";

interface MusicCategoryButtonProps {
  title: string;
  value: string;
  changeHandler: (event: OnChangeType) => void;
}

function MusicCategoryButton({
  title,
  value,
  changeHandler,
}: MusicCategoryButtonProps) {
  return (
    <>
      <span className="w-24 font-light overflow-hidden text-center border border-stroke rounded-md hover:bg-muted transition-all ease-in duration-100 ">
        <input
          type="radio"
          id={`category-${value}`}
          name="category"
          value={value}
          onChange={changeHandler}
          className="hidden"
        />
        <label
          htmlFor={`category-${value}`}
          className="w-full block px-2 py-1 cursor-pointer"
        >
          {title}
        </label>
      </span>
    </>
  );
}

export default MusicCategoryButton;

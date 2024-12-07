import { Input } from "../ui/input";

function MusicInfoInput({ title }: { title: string }) {
  return (
    <>
      <span className="w-full flex flex-col items-start justify-start gap-1 sm:flex-row sm:items-center sm:gap-2">
        <label
          htmlFor={`music-${title.toLowerCase()}`}
          className="w-14 font-light"
        >
          {title}
        </label>
        <Input
          type="text"
          id={`music-${title.toLowerCase()}`}
          className="w-full bg-popover"
          required={title === "Artist" ? false : true}
        ></Input>
      </span>
    </>
  );
}

export default MusicInfoInput;

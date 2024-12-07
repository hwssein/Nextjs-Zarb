import MusicCategoryButton from "../element/MusicCategoryButton";
import MusicInfoInput from "../element/MusicInfoInput";
import MusicLangButton from "../element/MusicLangButton";

function AddMusicForm() {
  return (
    <>
      <form className="w-full flex flex-col items-center justify-start gap-2 sm:gap-3">
        <div className="w-full flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:gap-3">
          <MusicInfoInput title="Name" />
          <MusicInfoInput title="Artist" />
        </div>

        <MusicInfoInput title="URL" />

        <div className="w-full flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="w-20 text-center font-light">Category</span>

          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <MusicCategoryButton title="Remix" />
            <MusicCategoryButton title="Electronic" />
            <MusicCategoryButton title="Hip-Hop" />
            <MusicCategoryButton title="House " />
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="w-20 text-center font-light">Language</span>

          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <MusicLangButton title="Persian" />
            <MusicLangButton title="English" />
            <MusicLangButton title="Turkish" />
            <MusicLangButton title="Other" />
          </div>
        </div>
      </form>
    </>
  );
}

export default AddMusicForm;

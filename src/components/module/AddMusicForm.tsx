import { MusicFormProps, OnChangeType } from "@/types/types";

import MusicCategoryButton from "../element/MusicCategoryButton";
import MusicInfoInput from "../element/MusicInfoInput";
import MusicLangButton from "../element/MusicLangButton";

interface AddMusicFormProps {
  form: MusicFormProps;
  changeHandler: (event: OnChangeType) => void;
}

function AddMusicForm({ form, changeHandler }: AddMusicFormProps) {
  return (
    <>
      <form className="w-full flex flex-col items-center justify-start gap-2 sm:gap-3">
        <div className="w-full flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:gap-3">
          <MusicInfoInput
            title="Name"
            name="name"
            form={form}
            changeHandler={changeHandler}
          />
          <MusicInfoInput
            title="Artist"
            name="artist"
            form={form}
            changeHandler={changeHandler}
          />
        </div>

        <MusicInfoInput
          title="URL"
          name="url"
          form={form}
          changeHandler={changeHandler}
        />

        <div className="w-full flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="w-20 text-center font-light">Category</span>

          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <MusicCategoryButton
              title="Remix"
              value="remix"
              changeHandler={changeHandler}
            />
            <MusicCategoryButton
              title="Electronic"
              value="electronic"
              changeHandler={changeHandler}
            />
            <MusicCategoryButton
              title="Hip-Hop"
              value="hip-hop"
              changeHandler={changeHandler}
            />
            <MusicCategoryButton
              title="House"
              value="house"
              changeHandler={changeHandler}
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="w-20 text-center font-light">Language</span>

          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <MusicLangButton
              title="Persian"
              value="persian"
              changeHandler={changeHandler}
            />
            <MusicLangButton
              title="English"
              value="english"
              changeHandler={changeHandler}
            />
            <MusicLangButton
              title="Turkish"
              value="turkish"
              changeHandler={changeHandler}
            />
            <MusicLangButton
              title="Other"
              value="other"
              changeHandler={changeHandler}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default AddMusicForm;

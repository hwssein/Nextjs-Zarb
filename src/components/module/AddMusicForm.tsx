import { MusicFormProps, OnChangeType } from "@/types/types";

import MusicCategoryButton from "../element/MusicCategoryButton";
import MusicInfoInput from "../element/MusicInfoInput";
import MusicLangButton from "../element/MusicLangButton";
import FormButton from "../element/FormButton";
import MusicFileInput from "../element/MusicFileInput";

interface AddMusicFormProps {
  form: MusicFormProps;
  setForm: React.Dispatch<React.SetStateAction<MusicFormProps>>;
  changeHandler: (event: OnChangeType) => void;
  saveMusicHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

function AddMusicForm({
  form,
  setForm,
  changeHandler,
  saveMusicHandler,
}: AddMusicFormProps) {
  return (
    <>
      <form
        onSubmit={saveMusicHandler}
        className="w-full flex flex-col items-center justify-start gap-4 sm:gap-6"
      >
        <div className="w-full flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <MusicInfoInput
            title="Name"
            name="name"
            value={form.name}
            changeHandler={changeHandler}
          />
          <MusicInfoInput
            title="Artist"
            name="artist"
            value={form.artist}
            changeHandler={changeHandler}
          />
        </div>

        <MusicInfoInput
          title="URL"
          name="url"
          value={form.url}
          changeHandler={changeHandler}
        />

        <MusicFileInput
          title="Add MP3 File"
          name="mp3File"
          form={form}
          setForm={setForm}
        />

        <div className="w-full flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="w-20 text-center font-light">Category</span>

          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <MusicCategoryButton
              title="Remix"
              value="remix"
              changeHandler={changeHandler}
              checked={form.category === "remix" ? true : false}
            />
            <MusicCategoryButton
              title="Electronic"
              value="electronic"
              changeHandler={changeHandler}
              checked={form.category === "electronic" ? true : false}
            />
            <MusicCategoryButton
              title="Hip-Hop"
              value="hip-hop"
              changeHandler={changeHandler}
              checked={form.category === "hip-hop" ? true : false}
            />
            <MusicCategoryButton
              title="House"
              value="house"
              changeHandler={changeHandler}
              checked={form.category === "house" ? true : false}
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
              checked={form.language === "persian" ? true : false}
            />
            <MusicLangButton
              title="English"
              value="english"
              changeHandler={changeHandler}
              checked={form.language === "english" ? true : false}
            />
            <MusicLangButton
              title="Turkish"
              value="turkish"
              changeHandler={changeHandler}
              checked={form.language === "turkish" ? true : false}
            />
            <MusicLangButton
              title="Other"
              value="other"
              changeHandler={changeHandler}
              checked={form.language === "other" ? true : false}
            />
          </div>
        </div>

        <div className="w-3/6 mt-2">
          <FormButton title="Save" />
        </div>
      </form>
    </>
  );
}

export default AddMusicForm;

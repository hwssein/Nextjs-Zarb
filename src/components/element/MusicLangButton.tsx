function MusicLangButton({ title }: { title: string }) {
  return (
    <span className="w-24 font-light border border-stroke rounded-md text-center p-1 hover:bg-muted transition-all ease-in duration-100 cursor-pointer">
      <input
        type="radio"
        id={`language-${title.toLowerCase()}`}
        name="language"
        className="hidden"
      />
      <label htmlFor={`language-${title.toLowerCase()}`}>{title}</label>
    </span>
  );
}

export default MusicLangButton;

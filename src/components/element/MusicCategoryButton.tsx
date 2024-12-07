function MusicCategoryButton({ title }: { title: string }) {
  return (
    <>
      <span className="w-24 font-light border border-stroke rounded-md text-center p-1 hover:bg-muted transition-all ease-in duration-100 cursor-pointer">
        <input
          type="radio"
          id={`category-${title.toLowerCase()}`}
          name="category"
          className="hidden"
        />
        <label htmlFor={`category-${title.toLowerCase()}`}>{title}</label>
      </span>
    </>
  );
}

export default MusicCategoryButton;

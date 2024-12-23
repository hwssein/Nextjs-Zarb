import HeaderTextAnim1 from "../element/animation/HeaderTextAnim1";

function HomePageHeader() {
  return (
    <>
      <div className="w-full h-40 md:h-52 bg-[url(/images/homepage-header.jpg)] bg-cover bg-center rounded-md flex items-center justify-between gap-2 mb-2">
        <div className="w-3/6 rounded-md"></div>

        <div className="w-3/6 h-full flex justify-center items-center overflow-hidden">
          <HeaderTextAnim1 />
        </div>
      </div>
    </>
  );
}

export default HomePageHeader;

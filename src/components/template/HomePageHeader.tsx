import Image from "next/image";
import HeaderTextAnim1 from "../element/animation/HeaderTextAnim1";

function HomePageHeader() {
  return (
    <>
      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <div className="w-3/6 rounded-md">
          <Image
            src="/images/home-page-header.jpg"
            width={300}
            height={300}
            alt="homepage header"
            priority={true}
            className="w-full h-full rounded-md"
          ></Image>
        </div>

        <div className="w-3/6 flex justify-center items-center overflow-hidden">
          <HeaderTextAnim1 />
        </div>
      </div>
    </>
  );
}

export default HomePageHeader;

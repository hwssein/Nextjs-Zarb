import Image from "next/image";

function HomePageHeader() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-4 mb-4 sm:flex-row sm:justify-between">
        <div className="w-full flex items-center justify-center sm:w-1/2">
          <Image
            src="/images/homepage-new-header.jpg"
            alt="homepage header"
            width={400}
            height={400}
            priority={true}
            className="w-full rounded-md"
          ></Image>
        </div>

        <div className="w-full flex flex-col items-start justify-start sm:w-1/2">
          <h1 className="text-[var(--highlight)] uppercase font-bold text-2xl">
            zarb beat
          </h1>

          <h2 className="uppercase font-semibold text-xl mb-2">
            experience a Good Vibe
          </h2>

          <p>
            This is where power and energy combine. Transform every workout into
            a unique experience with our workout tracks, and become the best
            version of yourself
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePageHeader;

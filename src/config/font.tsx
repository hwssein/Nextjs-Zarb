import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../../public/font/en-font/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/font/en-font/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export default myFont;

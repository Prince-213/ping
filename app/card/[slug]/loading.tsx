import { BiLoader } from "react-icons/bi";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className=" flex items-center justify-center w-full h-screen">
      <BiLoader className=" animate-spin" />
    </div>
  );
}

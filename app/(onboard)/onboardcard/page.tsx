"use client";

import ContactTile from "@/app/(ui)/shared/components/ContactTile";
import { DownloadCloud } from "lucide-react";
import { TbExchange } from "react-icons/tb";
import Image from "next/image";
import { useState } from "react";
import { BiPhone } from "react-icons/bi";

import ConfettiExplosion from "react-confetti-explosion";

import { Button } from "@/components/ui/button";

import { IoGlobe, IoMail } from "react-icons/io5";
import Link from "next/link";

import axios from "axios";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { createSmartCard } from "@/lib/actions";

import { GiCloudDownload, GiGlobe } from "react-icons/gi";
import { QRCode } from "react-qrcode-logo";
import { getBaseUrl } from "@/lib/utils";

import dynamic from "next/dynamic";

const CreateCard = dynamic(
  () => import("@/app/(ui)/shared/cardlayouts/CreateCard"),
  {
    ssr: false,
  }
);

export default function Page() {
  const [file, setFile] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file); // Generate a temporary URL
      setTempImages({
        ...tempImages,
        profile: url,
      });
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file); // Generate a temporary URL
      setTempImages({
        ...tempImages,
        logo: url,
      });
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file); // Generate a temporary URL
      setTempImages({
        ...tempImages,
        cover: url,
      });
    }
  };

  const [tempImages, setTempImages] = useState<TempImages>({
    logo: "",
    profile: "",
    cover: "",
  });

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    images: {
      logo: "",
      profile: "",
      cover: "",
    },
    personal: {
      name: "",
      jobTitle: "",
      department: "",
      companyName: "",
      accreditations: "",
      headline: "",
      bio: "",
    },
    general: {
      email: "",
      phone: "",
      companyUrl: "",
      link: "",
      address: "",
    },
    social: {
      x: "",
      instagram: "",
      thread: "",
      linkedin: "",
      facebook: "",
      youtube: "",
      snapchat: "",
      tiktok: "",
      twitch: "",
    },
    chat: {
      whatsapp: "",
    },
  });

  const isNotEmpty = (obj: CardDetails): boolean => {
    return Object.values(obj).some((value) => {
      if (typeof value === "object" && value !== null) {
        return isNotEmpty(value); // Recursively check nested objects
      }
      return value !== ""; // Check if value is not an empty string
    });
  };

  const [loading, setLoading] = useState(false);

  const [stage, setStage] = useState(1);

  const uploadImageToCloudinary = async (blobUrl) => {
    const formData = new FormData();
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    formData.append("file", blob);
    formData.append("upload_preset", "ping_upload"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dkacqlejj"); // Replace with your Cloudinary cloud name

    try {
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dkacqlejj/image/upload`,
        formData
      );
      return uploadResponse.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const [isExploding, setIsExploding] = useState(false);

  const [url, setUrl] = useState("/card");

  const [logoLink, setLogoLink] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        Object.entries(cardDetails.images).map(async ([key, value]) => {
          if (value) {
            const uploadedUrl = await uploadImageToCloudinary(value);
            return { [key]: uploadedUrl };
          }
          return { [key]: value };
        })
      );

      // Convert array to object
      const newImages: CardImages = Object.assign({}, ...uploadedImages);

      // Update cardDetails with Cloudinary URLs
      const finalCardDetails = { ...cardDetails, images: newImages };

      try {
        const data = await createSmartCard(finalCardDetails);

        console.log(data.id);

        console.log("Final Card Details:", finalCardDetails);

        toast.success("Ping created successfully");

        setStage(3);

        setIsExploding(true);

        setLogoLink(data.logo);
        setUrl(`${getBaseUrl}/card/${data.id}`);
      } catch (e) {
        console.log(e);
        toast.error("Unsuccessful Ping");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Unsuccessful Ping");
    } finally {
      setLoading(false);
    }
  };

  const littleExplodeProps = {
    force: 0.4,
    duration: 3000,
    particleCount: 60,
    floorHeight: 1000,
    floorWidth: 1000,
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
      alert("Copied to clipboard!"); // Optional: Show feedback to the user
    } catch (err) {
      console.error("Failed to copy text:", err);
      alert("Failed to copy text!"); // Optional: Show error feedback
    }
  };

  const handleClick = () => {
    copyToClipboard(url);
  };

  const themes = [
    {
      id: 1,
      background: "#ffffff",
      button: "#008897",
      writing: "#000000",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#B7ECF1FF",
    },

    {
      id: 2,
      background: "#F3ECDC",
      writing: "#000000",
      button: "#EFE4D4",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#5A3A0AFF",
    },
    {
      id: 3,
      background: "#373534",
      button: "#E17B33",
      writing: "#f6f6f6",
      primaryText: "#D2D6D6",
      secondaryText: "#686868",
      buttonText: "#EED5C3FF",
    },
    {
      id: 4,
      background: "#ffffff",
      button: "#000000",
      writing: "#000000",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#ffffff",
    },
    {
      id: 5,
      background: "#245144",
      writing: "#f6f6f6",
      button: "#245144",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#C2E9DEFF",
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  const [callToAction, setCallToAction] = useState<boolean>(false);

  return (
    <div className=" w-full flex  h-screen relative">
      {isExploding && (
        <ConfettiExplosion
          className="  absolute top-0 z-50 "
          {...littleExplodeProps}
        />
      )}
      <div className=" w-[35%] flex items-center justify-center bg-orange-100 min-h-screen">
        <div className=" lg:w-[70%] relative overflow-hidden bg-white min-h-fit max-h-[80vh] overflow-y-scroll rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
          <div
            style={{
              background: ` ${themes[selectedTheme].button} `,
            }}
            className={` w-full h-[24vh]  relative `}
          >
            <Image
              src={`${cardDetails.images.cover}`}
              alt=""
              fill
              className=" object-center object-cover"
            />
          </div>

          {cardDetails.images.profile == "" &&
          cardDetails.images.logo == "" &&
          cardDetails.personal.companyName == "" &&
          cardDetails.personal.jobTitle == "" &&
          cardDetails.personal.department == "" &&
          cardDetails.images.logo == "" ? null : (
            <div
              className=" h-[24vh] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  -mt-14 rounded-xl overflow-hidden flex items-center w-[92%] mx-auto justify-between 
            "
            >
              {cardDetails.images.profile ? (
                <div
                  style={{
                    background: ` ${themes[selectedTheme].button} `,
                  }}
                  className={` h-full relative ${
                    cardDetails.personal.name == "" ? " w-full" : " w-[45%] "
                  } `}
                >
                  <Image
                    src={`${cardDetails.images.profile}`}
                    alt=""
                    fill
                    className=" object-center object-cover"
                  />
                </div>
              ) : null}
              {cardDetails.personal.name || cardDetails.images.logo ? (
                <div
                  style={{
                    background: ` ${themes[selectedTheme].background} `,
                    color: ` ${themes[selectedTheme].writing} `,
                  }}
                  className={` px-3 py-6 ${
                    cardDetails.images.profile == "" ? " w-full" : " w-[55%] "
                  } pt-8 h-full relative `}
                >
                  <div className=" space-y-2">
                    {cardDetails.personal.name != "" ? (
                      <h1 className=" capitalize font-bold text-3xl">
                        {cardDetails.personal.name}
                      </h1>
                    ) : (
                      <div className=" space-y-2">
                        <div
                          style={{
                            background: ` ${themes[selectedTheme].primaryText} `,
                          }}
                          className=" w-[35%] h-[1rem] rounded-full"
                        ></div>
                        <div
                          style={{
                            background: ` ${themes[selectedTheme].primaryText} `,
                          }}
                          className=" w-[55%] h-[1rem] rounded-full"
                        ></div>
                      </div>
                    )}
                    {cardDetails.personal.jobTitle != "" ? (
                      <h1 className=" font-medium capitalize text-base max-w-[70%] ">
                        {cardDetails.personal.jobTitle}{" "}
                        {cardDetails.personal.companyName && "at"}{" "}
                        {cardDetails.personal.companyName}.
                      </h1>
                    ) : (
                      <div className=" space-y-2 pt-4">
                        <div className=" w-[80%] h-[.6rem] bg-bgCol-300 rounded-full"></div>
                        <div className=" w-[60%] h-[.6rem] bg-bgCol-300 rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {cardDetails.images.logo != "" ? (
                    <Image
                      src={`${cardDetails.images.logo}`}
                      width={50}
                      height={50}
                      alt=""
                      className=" bottom-5 right-5 absolute"
                    />
                  ) : (
                    <h1 className=" bottom-5 right-5 absolute font-medium"></h1>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {callToAction && (
            <div className=" h-16 mt-5  gap-x-5 grid w-[92%] mx-auto grid-cols-2">
              <button className=" border-2 rounded-xl flex space-x-3 items-center justify-center h-full w-full">
                <h3
                  className=" capitalize font-semibold
              "
                >
                  exchange contact
                </h3>
                <TbExchange />
              </button>
              <button
                style={{
                  background: ` ${themes[selectedTheme].button} `,
                  color: ` ${themes[selectedTheme].buttonText} `,
                }}
                className="  rounded-xl flex items-center space-x-3 justify-center h-full w-full"
              >
                <h3 className=" capitalize font-semibold">save contact</h3>
                <DownloadCloud />
              </button>
            </div>
          )}

          <div className=" pt-10 px-6 space-y-8 flex flex-col">
            {cardDetails.personal.bio && (
              <div className=" space-y-3">
                <h2 className=" font-semibold text-2xl">About</h2>
                {cardDetails.personal.bio != "" ? (
                  <p className="  text-gray-400">{cardDetails.personal.bio}</p>
                ) : (
                  <div className=" space-y-2 pt-2">
                    <div className=" w-[80%] h-[.5rem] bg-gray-300 rounded-full"></div>
                    <div className=" w-[60%] h-[.5rem] bg-gray-300 rounded-full"></div>
                  </div>
                )}
              </div>
            )}

            <div className=" space-y-6 ">
              <h2 className=" font-semibold text-xl">Contact</h2>
              {cardDetails.general.email ? (
                <div className=" grid  gap-5 w-full  ">
                  {cardDetails.general.email == "" ? null : (
                    <ContactTile
                      accentColor={themes[selectedTheme].button}
                      title="Email"
                      content={cardDetails.general.email}
                      icon={<IoMail size={24} color="white" />}
                    />
                  )}
                  {cardDetails.general.companyUrl == "" ? null : (
                    <ContactTile
                      accentColor={themes[selectedTheme].button}
                      title="Website"
                      content={cardDetails.general.companyUrl}
                      icon={<IoGlobe size={24} color="white" />}
                    />
                  )}
                  {cardDetails.general.phone == "" ? null : (
                    <ContactTile
                      accentColor={themes[selectedTheme].button}
                      title="Phone"
                      content={cardDetails.general.phone}
                      icon={<BiPhone size={24} color="white" />}
                    />
                  )}
                </div>
              ) : (
                <div className=" flex space-x-2 items-center">
                  <div className=" w-10 h-10 rounded-[50%] bg-gray-300"></div>
                  <div className=" space-y-2 w-[80%] ">
                    <div className=" w-[80%] h-[.5rem] bg-gray-300 rounded-full"></div>
                    <div className=" w-[60%] h-[.5rem] bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            <div className=" space-y-6">
              <h2 className=" font-semibold text-xl">Socials</h2>
              <div className=" grid grid-cols-5 gap-5  w-full px-1 py-2 rounded-lg transition-all duration-200 ">
                {cardDetails.social.facebook && (
                  <Link
                    href={cardDetails.social.facebook}
                    className=" flex items-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100 rounded-2xl p-4 justify-center"
                  >
                    <Image
                      src={"/assets/icons/icons8-facebook-96(1).png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}
                {cardDetails.social.instagram && (
                  <Link
                    href={cardDetails.social.instagram}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100 rounded-2xl p-4"
                  >
                    <Image
                      src={"/assets/icons/icons8-instagram-96.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}

                {cardDetails.social.linkedin && (
                  <Link
                    href={cardDetails.social.linkedin}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100  rounded-2xl p-4"
                  >
                    <Image
                      src={"/assets/icons/icons8-linkedin-96.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}
                {cardDetails.social.x && (
                  <Link
                    href={cardDetails.social.x}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100  rounded-2xl p-4"
                  >
                    <Image
                      src={"/assets/icons/icons8-x-100.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}
                {cardDetails.social.thread && (
                  <Link
                    href={cardDetails.social.thread}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100  rounded-2xl p-4"
                  >
                    <Image
                      src={"/assets/icons/threads-app-icon.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}
              </div>
            </div>
            <div className=" space-y-6">
              <h2 className=" font-semibold text-xl">Messaging</h2>
              <div className=" grid grid-cols-5 gap-5  w-full px-1 py-2 rounded-lg transition-all duration-200 ">
                {cardDetails.chat.whatsapp && (
                  <div className=" flex items-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100 rounded-2xl p-4 justify-center">
                    <Image
                      src={"/assets/icons/icons8-whatsapp-96.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[65%] relative overflow-y-scroll pb-10 h-screen">
        <div className=" w-[90%] mx-auto space-y-10">
          <header className=" flex items-center pt-5  justify-between relative">
            <div className=" flex items-center flex-col space-y-1">
              <div
                className={` transition-all duration-200 ease-in-out text-white font-semibold flex items-center justify-center w-10 h-10 shadow-md rounded-[50%] ${
                  stage >= 1 ? "bg-primaryCol-100" : ""
                } `}
              >
                <p>1</p>
              </div>
              <p className=" text-sm text-primaryCol-100 font-medium">
                Customize your card
              </p>
            </div>

            <div className=" w-[40%] border-t-2 border-dashed -translate-y-3 left-[9%] absolute"></div>

            <div className=" flex items-center flex-col space-y-1">
              <div
                className={` transition-all duration-200 ease-in-out  font-semibold flex items-center justify-center w-10 h-10 shadow-md rounded-[50%] ${
                  stage >= 2
                    ? "bg-primaryCol-100 text-white"
                    : " text-primaryCol-100"
                } `}
              >
                <p>2</p>
              </div>
              <p className=" text-sm text-primaryCol-100 font-medium">
                Create An Account
              </p>
            </div>

            <div className=" w-[38%] border-t-2 border-dashed -translate-y-3 right-[7%] absolute"></div>

            <div className=" flex items-center flex-col space-y-1">
              <div
                className={` transition-all duration-200 ease-in-out  font-semibold flex items-center justify-center w-10 h-10 shadow-md rounded-[50%] ${
                  stage >= 3
                    ? "bg-primaryCol-100 text-white"
                    : " text-primaryCol-100"
                } `}
              >
                <p>3</p>
              </div>
              <p className=" text-sm text-primaryCol-100 font-medium">
                Get your Card
              </p>
            </div>
          </header>

          <div>
            <div
              className={` ${
                stage == 1 ? " block" : "hidden"
              } transition-all duration-200 ease-in-out `}
            >
              <CreateCard
                cardDetails={cardDetails}
                setCardDetails={setCardDetails}
                themes={themes}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                tempImages={tempImages}
                setTempImages={setTempImages}
                cto={callToAction}
                setCto={setCallToAction}
                handleCoverChange={handleCoverChange}
                handleImageChange={handleImageChange}
                handleLogoChange={handleLogoChange}
              />
            </div>

            <div
              className={` ${
                stage == 3 ? " block" : "hidden"
              } transition-all duration-200 ease-in-out `}
            >
              <div className=" min-h-[70vh] flex flex-col space-y-10 items-center w-full">
                <h1 className=" font-bold text-4xl text-center">
                  Your Smart Business Ping is Ready.{" "}
                </h1>

                <div className=" relative w-fit h-fit ">
                  <QRCode size={350} value={url} logoImage={logoLink} />
                </div>

                <div className=" flex items-center space-x-4">
                  <Button
                    onClick={handleClick}
                    className=" w-fit h-fit"
                    variant={"outline"}
                  >
                    <GiGlobe size={32} />
                    <p>Copy URL</p>
                  </Button>

                  <Button className=" w-fit h-fit" variant={"outline"}>
                    <GiCloudDownload size={32} />
                    <p>Download QR Code</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <footer className=" w-full flex items-center justify-between">
            <Button
              disabled={stage == 1 ? true : false}
              onClick={() => setStage(1)}
              variant={"outline"}
            >
              Previous
            </Button>

            <Button
              variant={"default"}
              onClick={handleSubmit}
              disabled={isNotEmpty(cardDetails) && stage != 3 ? false : true}
              className={` flex items-center space-x-2 ${
                isNotEmpty(cardDetails) && stage != 3
                  ? "opacity-100"
                  : "opacity-40"
              }  bg-primaryCol-200`}
            >
              <p>Next</p>
              {loading ? <FaSpinner className=" animate-spin" /> : null}
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}

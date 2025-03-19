/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";

import ConfettiExplosion from "react-confetti-explosion";

import { Button } from "@/components/ui/button";

import { Clipboard } from "flowbite-react";

import axios from "axios";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { createSmartCard } from "@/lib/actions";

import { GiCloudDownload } from "react-icons/gi";
import { QRCode } from "react-qrcode-logo";
import { getBaseUrl } from "@/lib/utils";

import dynamic from "next/dynamic";
import CardDefault from "@/app/(ui)/shared/cardlayouts/CardDefault";
import CardClassic from "@/app/(ui)/shared/cardlayouts/CardClassic";
import { ShineBorder } from "@/components/magicui/shine-border";

const CreateCard = dynamic(
  () => import("@/app/(ui)/shared/cardlayouts/CreateCard"),
  {
    ssr: false,
  }
);

export default function Page() {
  const [file, setFile] = useState(null);

  console.log(file);

  //ts-ig
  const handleImageChange = async (e: { target: { files: any[] } }) => {
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

  const handleLogoChange = async (e: { target: { files: any[] } }) => {
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

  const handleCoverChange = async (e: { target: { files: any[] } }) => {
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

  const uploadImageToCloudinary = async (blobUrl: string | URL | Request) => {
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

  const [layout, setLayout] = useState(1);

  const onLayoutChange = () => {
    console.log(cardDetails);
    if (layout == 1) {
      setLayout(2);
      setCardDetails({
        ...cardDetails,
        theme: {
          ...cardDetails.theme,
          layout: 2,
        },
      });
    } else {
      setLayout(1);
      setCardDetails({
        ...cardDetails,
        theme: {
          ...cardDetails.theme,
          layout: 1,
        },
      });
    }
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
      id: 4,
      background: "#ffffff",
      button: "#000000",
      writing: "#000000",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#ffffff",
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  const [callToAction, setCallToAction] = useState<boolean>(false);

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    theme: {
      color: selectedTheme,
      layout: layout,
      action: callToAction,
    },
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

  return (
    <div className=" w-full flex  h-screen relative">
      {isExploding && (
        <ConfettiExplosion
          className="  absolute top-0 z-50 "
          {...littleExplodeProps}
        />
      )}
      <div className=" w-[35%] flex items-center justify-center bg-orange-100 min-h-screen">
        {layout == 1 ? (
          <CardDefault
            callToAction={callToAction}
            cardDetails={cardDetails}
            themes={themes}
            selectedTheme={selectedTheme}
          />
        ) : (
          <CardClassic
            callToAction={callToAction}
            cardDetails={cardDetails}
            themes={themes}
            selectedTheme={selectedTheme}
          />
        )}
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
                onLayoutChange={onLayoutChange}
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

                <div className=" relative overflow-hidden w-fit h-fit p-10  rounded-3xl ">
                  <ShineBorder
                    borderWidth={10}
                    shineColor={["#F14A17FF", "#F57C4CFF", "#FFBE7B"]}
                  />
                  <QRCode size={350} value={url} logoImage={logoLink} />
                  <h2 className=" uppercase text-2xl font-medium text-center mt-4">
                    scan me
                  </h2>
                </div>

                <div className=" flex items-center space-x-4">
                  <div className="grid w-full max-w-80">
                    <div className="relative">
                      <label htmlFor="npm-install" className="sr-only">
                        Label
                      </label>
                      <input
                        id="npm-install"
                        type="text"
                        className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        value="copy & share link"
                        disabled
                        readOnly
                      />
                      <Clipboard.WithIconText
                        valueToCopy={`${getBaseUrl}/${url}`}
                      />
                    </div>
                  </div>

                  <Button className=" w-fit h-fit p-4" variant={"outline"}>
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

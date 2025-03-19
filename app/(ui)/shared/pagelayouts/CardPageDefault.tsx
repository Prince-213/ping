"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiMapPin, BiPhone } from "react-icons/bi";
import ContactTile from "../components/ContactTile";
import { IoGlobe, IoMail } from "react-icons/io5";
import { DownloadCloud } from "lucide-react";
import { TbExchange } from "react-icons/tb";
import { motion } from "motion/react";

const CardPageDefault = ({
  cardDetails,
  themes,
}: {
  cardDetails: CardDetails | null;

  themes: Theme[];
}) => {
  const selectedTheme = cardDetails?.theme.color || 1;

  return (
    <div className=" lg:w-[80%] relative overflow-hidden  min-h-fit max-h-screen overflow-y-scroll   ">
      <div
        style={{
          background: ` ${themes[selectedTheme].button} `,
        }}
        className={` w-full h-[28vh]  relative `}
      >
        <Image
          src={`${cardDetails?.images.cover}`}
          alt=""
          fill
          className=" object-center object-cover"
        />
      </div>
      <div
        className=" h-[30vh] shadow-lg shadow-gray-200 -mt-14 z-50 relative bg-white rounded-xl overflow-hidden flex items-center w-[92%] mx-auto justify-between 
            "
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: ` ${themes[1].button} `,
          }}
          className={` h-full relative w-[45%]`}
        >
          <Image
            src={`${cardDetails?.images.profile || ""}`}
            alt=""
            fill
            className=" object-top object-cover"
          />
        </motion.div>
        <div
          style={{
            background: ` ${themes[selectedTheme].background} `,
            color: ` ${themes[selectedTheme].writing} `,
          }}
          className={` px-3 py-6  w-[55%] pt-8 h-full relative `}
        >
          <div className=" space-y-2 pr-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" capitalize font-medium text-2xl text-balance"
            >
              {cardDetails?.personal.name}
            </motion.h1>{" "}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" font-medium text-base leading-normal max-w-[70%] text-balance capitalize  "
            >
              {cardDetails?.personal.jobTitle}{" "}
              {cardDetails?.personal.companyName && "at"}{" "}
              {cardDetails?.personal.companyName}.
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Image
              src={`${cardDetails?.images.logo}`}
              width={50}
              height={50}
              alt=""
              className=" bottom-5 right-5 absolute"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" h-16 mt-5  gap-x-5 grid w-[92%] mx-auto grid-cols-2"
      >
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
      </motion.div>

      <div className=" pt-5 pb-5 px-6 space-y-8 flex flex-col">
        <div className=" space-y-3">
          <h2 className=" font-semibold text-2xl">About</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="  text-gray-400 leading-loose w-full"
          >
            {cardDetails && (
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="  text-gray-600 text-pretty text-justify leading-loose"
              >
                {cardDetails.personal.bio}
              </motion.p>
            )}
          </motion.div>
        </div>

        {cardDetails && (
          <div className=" space-y-10">
            {Object.values(cardDetails.general).some(
              (value) => value.trim() !== ""
            ) && (
              <div className=" space-y-4 ">
                <h2 className=" font-semibold text-xl">Contact</h2>
                {Object.values(cardDetails.general).some(
                  (value) => value.trim() !== ""
                ) ? (
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
                    {cardDetails.general.address == "" ? null : (
                      <ContactTile
                        accentColor={themes[selectedTheme].button}
                        title="Address"
                        content={cardDetails.general.address}
                        icon={<BiMapPin size={24} color="white" />}
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
            )}

            {Object.values(cardDetails.social).some(
              (value) => value.trim() !== ""
            ) && (
              <div className=" space-y-2">
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
            )}
            {Object.values(cardDetails.chat).some(
              (value) => value.trim() !== ""
            ) && (
              <div className=" space-y-2">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPageDefault;

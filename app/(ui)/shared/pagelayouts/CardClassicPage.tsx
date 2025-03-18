"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiMapPin, BiPhone } from "react-icons/bi";
import { IoGlobe, IoMail } from "react-icons/io5";
import ClassicContactTile from "../components/ClassicContactTile";
import { motion } from "motion/react";

const CardClassicPage = ({
  cardDetails,
  themes,
}: {
  cardDetails: CardDetails | null;
  themes: Theme[];
}) => {
  const selectedTheme = cardDetails?.theme.color || 1;
  return (
    <div className=" lg:w-[80%] relative overflow-hidden bg-[#f2f2f2] min-h-fit max-h-screen overflow-y-scroll  ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
      </motion.div>

      <div
        className=" border -mt-14  overflow-hidden flex flex-col-reverse items-center w-[92%] mx-auto justify-between 
            "
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: ` ${themes[selectedTheme].button} `,
          }}
          className={` h-[50vh] relative ${" w-full"} `}
        >
          <Image
            src={`${cardDetails?.images.profile}`}
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
          className={` p-6 ${" w-full"} h-full relative `}
        >
          <div className=" space-y-2">
            {cardDetails?.personal.name != "" ? (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className=" capitalize  text-4xl"
              >
                {cardDetails?.personal.name}
              </motion.h1>
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
            {cardDetails?.personal.jobTitle != "" ? (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className=" font-medium text-xl text-gray-500 capitalize max-w-[70%] leading-relaxed    "
              >
                {cardDetails?.personal.jobTitle}{" "}
                {cardDetails?.personal.companyName && "at"}{" "}
                {cardDetails?.personal.companyName}.
              </motion.h1>
            ) : (
              <div className=" space-y-2 pt-4">
                <div className=" w-[80%] h-[.6rem] bg-bgCol-300 rounded-full"></div>
                <div className=" w-[60%] h-[.6rem] bg-bgCol-300 rounded-full"></div>
              </div>
            )}
          </div>

          {cardDetails?.images.logo != "" ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Image
                src={`${cardDetails?.images.logo}`}
                width={60}
                height={60}
                alt=""
                className=" top-7 right-5 absolute"
              />
            </motion.div>
          ) : (
            <h1 className=" bottom-5 right-5 absolute font-medium"></h1>
          )}
        </div>
      </div>

      {cardDetails?.theme.action && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="   bg-white shadow-md shadow-gray-200 p-1 rounded-full gap-x-5 grid w-[80%] -mt-8 z-50 relative mx-auto grid-cols-2"
        >
          <button className=" pl-2 text-sm rounded-xl h-[4.2rem] flex space-x-3 items-center justify-center w-full">
            <h3
              className=" capitalize font-semibold
              "
            >
              exchange contact
            </h3>
          </button>
          <button
            style={{
              background: ` ${themes[selectedTheme].button} `,
              color: ` ${themes[selectedTheme].buttonText} `,
            }}
            className="  flex items-center space-x-3 justify-center h-[4.2rem] rounded-full w-full"
          >
            <h3 className=" capitalize font-semibold text-sm">save contact</h3>
          </button>
        </motion.div>
      )}

      {cardDetails && (
        <div className="  pb-5 px-6 space-y-8 flex -mt-4 flex-col">
          <div className=" space-y-2 bg-white rounded-sm shadow-sm p-8">
            <h2 className=" font-semibold text-2xl">My Info</h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="  text-gray-600 text-balance leading-loose"
            >
              {cardDetails.personal.bio}
            </motion.p>
          </div>

          {Object.values(cardDetails.general).some(
            (value) => value.trim() !== ""
          ) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" space-y-6 bg-white rounded-sm shadow-sm p-6  "
            >
              <h2 className=" font-semibold text-2xl">Contact</h2>
              {cardDetails.general.email ? (
                <div className=" grid  gap-5 w-full  ">
                  {cardDetails.general.email == "" ? null : (
                    <ClassicContactTile
                      accentColor={themes[selectedTheme].button}
                      title="Email"
                      content={cardDetails.general.email}
                      icon={<IoMail size={24} />}
                    />
                  )}
                  {cardDetails.general.companyUrl == "" ? null : (
                    <ClassicContactTile
                      accentColor={themes[selectedTheme].button}
                      title="Website"
                      content={cardDetails.general.companyUrl}
                      icon={<IoGlobe size={24} />}
                    />
                  )}
                  {cardDetails.general.phone == "" ? null : (
                    <ClassicContactTile
                      accentColor={themes[selectedTheme].button}
                      title="Phone"
                      content={cardDetails.general.phone}
                      icon={<BiPhone size={24} />}
                    />
                  )}
                  {cardDetails.general.address == "" ? null : (
                    <ClassicContactTile
                      accentColor={themes[selectedTheme].button}
                      title="Address"
                      content={cardDetails.general.address}
                      icon={<BiMapPin size={24} />}
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
            </motion.div>
          )}

          {Object.values(cardDetails.social).some(
            (value) => value.trim() !== ""
          ) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" space-y-2 bg-white rounded-sm shadow-sm p-6 "
            >
              <h2 className=" font-semibold text-2xl">Socials</h2>
              <div className=" grid grid-cols-5 gap-5  w-full px-1 py-2 rounded-lg transition-all duration-200 ">
                {cardDetails.social.facebook && (
                  <motion.div>
                    <Link
                      href={cardDetails.social.facebook}
                      className=" flex items-center  justify-center"
                    >
                      <Image
                        src={"/assets/icons/icons8-facebook-96(1).png"}
                        width={50}
                        height={50}
                        alt=""
                      />
                    </Link>
                  </motion.div>
                )}
                {cardDetails.social.instagram && (
                  <Link
                    href={cardDetails.social.instagram}
                    className=" flex items-center  justify-center"
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
                    className=" flex items-center  justify-center"
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
                    className="flex items-center  justify-center"
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
                    className="flex items-center  justify-center"
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
            </motion.div>
          )}
          {Object.values(cardDetails.chat).some(
            (value) => value.trim() !== ""
          ) && (
            <div className=" space-y-2 bg-white rounded-sm shadow-sm p-6">
              <h2 className=" font-semibold text-2xl">Messaging</h2>
              <div className=" grid grid-cols-5 gap-5  w-full px-1 py-2 rounded-lg transition-all duration-200 ">
                {cardDetails.chat.whatsapp && (
                  <div className=" flex items-center  justify-center">
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
  );
};

export default CardClassicPage;

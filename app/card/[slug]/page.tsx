import ContactTile from "@/app/(ui)/shared/components/ContactTile";
import { getSmartCard } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiPhone } from "react-icons/bi";
import { IoGlobe, IoMail } from "react-icons/io5";

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await params;

  const cardDetails = await getSmartCard(data.slug);

  return (
    <div className=" w-full h-screen">
      <div className=" w-full flex items-center justify-center bg-orange-100 min-h-screen">
        <div className=" lg:w-[40%] w-full relative overflow-hidden bg-white lg:h-[90vh] h-full overflow-y-scroll lg:rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
          <div className=" w-full lg:h-[35vh] h-[25vh] bg-gray-200   relative ">
            <Image
              src={`${cardDetails?.images.cover}`}
              alt=""
              fill
              className=" object-center object-cover"
            />
          </div>

          <div
            className=" lg:h-[40vh] h-[25vh] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  -translate-y-20 rounded-xl overflow-hidden flex items-center w-[95%] mx-auto justify-between 
            "
          >
            <div className=" bg-primaryCol-200 w-[45%] h-full relative ">
              <Image
                src={`${cardDetails?.images.profile}`}
                alt=""
                fill
                className=" object-center object-cover"
              />
            </div>
            <div className=" px-3 py-6 w-[55%] h-full bg-bgCol-100 relative ">
              <div className=" space-y-2">
                {cardDetails?.personal.name != "" ? (
                  <h1 className=" font-bold text-3xl">
                    {cardDetails?.personal.name}
                  </h1>
                ) : (
                  <div className=" space-y-2">
                    <div className=" w-[30%] h-[1.2rem] bg-textCol-100 animate-pulse rounded-full"></div>
                    <div className=" w-[40%] h-[1.2rem] bg-textCol-100 animate-pulse rounded-full"></div>
                  </div>
                )}
                {cardDetails?.personal.jobTitle != "" ? (
                  <h1 className=" font-medium  text-base max-w-[70%] text-gray-600">
                    {cardDetails?.personal.jobTitle}{" "}
                    {cardDetails?.personal.companyName && "at"}{" "}
                    {cardDetails?.personal.companyName}.
                  </h1>
                ) : (
                  <div className=" space-y-2 pt-4">
                    <div className=" w-[80%] h-[.6rem] bg-bgCol-300 animate-pulse rounded-full"></div>
                    <div className=" w-[60%] h-[.6rem] bg-bgCol-300 animate-pulse rounded-full"></div>
                  </div>
                )}
              </div>

              {cardDetails?.images.logo != "" ? (
                <Image
                  src={`${cardDetails?.images.logo}`}
                  width={50}
                  height={50}
                  alt=""
                  className=" bottom-5 right-5 absolute"
                />
              ) : (
                <h1 className=" bottom-5 right-5 absolute font-medium">Logo</h1>
              )}
            </div>
          </div>

          <div className=" -translate-y-10  px-6 space-y-8 pb-12 flex flex-col">
            <div>
              <h2 className=" font-semibold text-2xl">About</h2>
              {cardDetails?.personal.bio != "" ? (
                <p className="  text-gray-400">{cardDetails?.personal.bio}</p>
              ) : (
                <div className=" space-y-2 pt-2">
                  <div className=" w-[80%] h-[.5rem] bg-gray-300 animate-pulse rounded-full"></div>
                  <div className=" w-[60%] h-[.5rem] bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              )}
            </div>
            <div className=" space-y-3">
              <h2 className=" font-semibold text-xl">Contact</h2>
              <div className=" grid lg:grid-cols-2 gap-10 w-full  ">
                {cardDetails?.general.email == "" ? (
                  <div className=" flex space-x-2 items-center">
                    <div className=" w-10 h-10 rounded-[50%] bg-gray-300"></div>
                    <div className=" space-y-2 w-[80%] ">
                      <div className=" w-[80%] h-[.5rem] bg-gray-300 animate-pulse rounded-full"></div>
                      <div className=" w-[60%] h-[.5rem] bg-gray-300 animate-pulse rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <ContactTile
                    title="Email"
                    content={cardDetails?.general.email || ""}
                    icon={<IoMail size={24} color="white" />}
                  />
                )}
                {cardDetails?.general.companyUrl == "" ? (
                  <div className=" flex space-x-2 items-center">
                    <div className=" w-10 h-10 rounded-[50%] bg-gray-300"></div>
                    <div className=" space-y-2 w-[80%] ">
                      <div className=" w-[80%] h-[.5rem] bg-gray-300 animate-pulse rounded-full"></div>
                      <div className=" w-[60%] h-[.5rem] bg-gray-300 animate-pulserounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <ContactTile
                    title="Website"
                    content={cardDetails?.general.companyUrl || ""}
                    icon={<IoGlobe size={24} color="white" />}
                  />
                )}
                {cardDetails?.general.phone == "" ? (
                  <div className=" flex space-x-2 items-center">
                    <div className=" w-10 h-10 rounded-[50%] bg-gray-300"></div>
                    <div className=" space-y-2 w-[80%] ">
                      <div className=" w-[80%] h-[.5rem] bg-gray-300 animate-pulse  rounded-full"></div>
                      <div className=" w-[60%] h-[.5rem] bg-gray-300 animate-pulse rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <ContactTile
                    title="Phone"
                    content={cardDetails?.general.phone || ""}
                    icon={<BiPhone size={24} color="white" />}
                  />
                )}
              </div>
            </div>
            <div className=" space-y-2">
              <h2 className=" font-semibold text-xl">Socials</h2>
              <div className=" grid grid-cols-5 gap-5  w-full px-1 py-2 rounded-lg transition-all duration-200 ">
                {cardDetails?.social.facebook && (
                  <Link
                    href={cardDetails.social.facebook}
                    className=" flex items-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100 rounded-2xl p-2 lg:p-4 justify-center"
                  >
                    <Image
                      src={"/assets/icons/icons8-facebook-96(1).png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}
                {cardDetails?.social.instagram && (
                  <Link
                    href={cardDetails.social.instagram}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100 rounded-2xl p-2 lg:p-4"
                  >
                    <Image
                      src={"/assets/icons/icons8-instagram-96.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}

                {cardDetails?.social.linkedin && (
                  <Link
                    href={cardDetails.social.linkedin}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100  rounded-2xl p-2 lg:p-4"
                  >
                    <Image
                      src={"/assets/icons/icons8-linkedin-96.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}
                {cardDetails?.social.x && (
                  <Link
                    href={cardDetails.social.x}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100  rounded-2xl p-2 lg:p-4"
                  >
                    <Image
                      src={"/assets/icons/icons8-x-100.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                )}
                {cardDetails?.social.thread && (
                  <Link
                    href={cardDetails.social.thread}
                    className=" flex items-center justify-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100  rounded-2xl p-2 lg:p-4"
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
            <div className=" space-y-3">
              <h2 className=" font-semibold text-xl">Messaging</h2>
              <div className=" grid grid-cols-5 gap-5  w-full px-1 py-2 rounded-lg transition-all duration-200 ">
                {cardDetails?.chat.whatsapp && (
                  <div className=" flex items-center bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100 rounded-2xl p-2 lg:p-4 justify-center">
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
    </div>
  );
};

export default page;

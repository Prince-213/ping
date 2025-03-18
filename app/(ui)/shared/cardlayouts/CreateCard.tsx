/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, Trash, X } from "lucide-react";
import { TbExchange } from "react-icons/tb";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  BiBadge,
  BiBuilding,
  BiPlus,
  BiSolidMapPin,
  BiSolidTrafficBarrier,
  BiUser,
} from "react-icons/bi";
import {
  BsExclamation,
  BsFacebook,
  BsGlobe2,
  BsInstagram,
  BsLinkedin,
  BsMailbox,
  BsPhone,
  BsThreads,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PhoneInput } from "@/components/ui/phoneinput";
import { FaEdit, FaRegEdit, FaUserEdit } from "react-icons/fa";

const CreateCard = ({
  cardDetails,
  setCardDetails,
  tempImages,
  setTempImages,
  selectedTheme,
  setSelectedTheme,
  handleImageChange,
  onLayoutChange,
  cto,
  setCto,
  handleCoverChange,
  handleLogoChange,
  themes,
}: {
  cardDetails: CardDetails;
  setCardDetails: Dispatch<SetStateAction<CardDetails>>;
  onLayoutChange: () => void;
  tempImages: TempImages;
  setTempImages: Dispatch<SetStateAction<TempImages>>;
  handleImageChange: (e: any) => Promise<void>;
  handleCoverChange: (e: any) => Promise<void>;
  handleLogoChange: (e: any) => Promise<void>;
  cto: boolean;
  setCto: Dispatch<SetStateAction<boolean>>;
  selectedTheme: number;
  setSelectedTheme: Dispatch<SetStateAction<number>>;
  themes: Theme[];
}) => {
  return (
    <div className=" space-y-10">
      <div className=" space-y-2 mb-5">
        <h1 className=" font-semibold  text-4xl">Create your first card</h1>
        <p>Ready to design a card? Pick a field and get started!</p>
      </div>
      <div className=" space-y-4 mb-5">
        <h1 className=" font-medium  text-2xl">Change card theme</h1>
        <div className=" h-16 flex items-center gap-6">
          <button
            onClick={onLayoutChange}
            className=" hover:shadow-md transition-all duration-200 flex items-center flex-col border-2 rounded-md p-2"
          >
            <TbExchange />
          </button>
          {themes.map((item, index) => {
            return (
              <button
                onClick={() => {
                  setSelectedTheme(index);
                  setCardDetails({
                    ...cardDetails,
                    theme: {
                      ...cardDetails.theme,
                      color: index,
                    },
                  });
                  console.log(cardDetails);
                }}
                key={index}
                style={{
                  background: ` linear-gradient(-45deg, ${item.primaryText} 50%, ${item.button}) 50%  `,
                }}
                className={`  relative  flex items-center justify-center to-yellow-600 from-50% to-50% h-full w-16 rounded-lg `}
              >
                <div
                  className={` flex items-center justify-center w-6 h-6  rounded-[50%] ${
                    index == selectedTheme
                      ? " bg-primaryCol-200 text-white "
                      : " bg-white"
                  } absolute`}
                >
                  {index == selectedTheme ? (
                    <Check size={14} />
                  ) : (
                    <BsExclamation />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className=" space-y-4 mb-5">
        <h1 className=" font-medium  text-2xl">Show call to action</h1>
        <label className="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={cto}
            onChange={() => {
              setCto(!cto);
              setCardDetails({
                ...cardDetails,
                theme: {
                  ...cardDetails.theme,
                  action: !cto,
                },
              });
              console.log(cardDetails);
            }}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Toggle me
          </span>
        </label>
      </div>
      <div className=" space-y-5 w-full ">
        <h1 className=" text-2xl font-medium">Add Images</h1>

        <div className=" w-[70%] grid grid-cols-3 gap-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={` h-24 flex flex-col items-center ${
                  cardDetails.images.logo != ""
                    ? " border-primaryCol-200 shadow-lg "
                    : "border-gray-200"
                } `}
              >
                {cardDetails.images.logo != "" ? (
                  <div className=" flex flex-col items-center">
                    <TbExchange />
                    <h1>Change company logo</h1>
                  </div>
                ) : (
                  <div className=" flex flex-col items-center">
                    <BiPlus />
                    <h1>Add company logo</h1>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-[30rem] rounded-xl p-0">
              <div className=" w-full">
                <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                  <h1 className=" font-medium text-xl">Add company logo</h1>
                  <button>
                    <X />
                  </button>
                </div>
                <div className=" p-4">
                  {tempImages.logo == "" ? (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className=" w-full h-40 flex items-center justify-center">
                      <Image
                        src={`${tempImages.logo}`}
                        alt=""
                        width={60}
                        height={60}
                        className=" "
                      />
                    </div>
                  )}
                </div>
                <div className=" flex items-center border-t-[2px] border-gray-100 justify-between w-full p-4 ">
                  <button
                    onClick={() => {
                      setTempImages({ ...tempImages, logo: "" });
                      setCardDetails({
                        ...cardDetails,
                        images: {
                          ...cardDetails.images,
                          logo: "",
                        },
                      });
                    }}
                  >
                    <Trash />
                  </button>

                  <div className=" space-x-2 ">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button
                      variant={"default"}
                      onClick={() => {
                        setCardDetails({
                          ...cardDetails,
                          images: {
                            ...cardDetails.images,
                            logo: tempImages.logo,
                          },
                        });
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={` h-24 flex flex-col items-center ${
                  cardDetails.images.profile != ""
                    ? " border-primaryCol-200 shadow-lg "
                    : "border-gray-200"
                } `}
              >
                {cardDetails.images.profile != "" ? (
                  <div className=" flex flex-col items-center">
                    <TbExchange />
                    <h1>Change Profile Picture</h1>
                  </div>
                ) : (
                  <div className=" flex flex-col items-center">
                    <BiPlus />
                    <h1>Add Profile Picture</h1>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-[30rem] rounded-xl p-0">
              <div className=" w-full">
                <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                  <h1 className=" font-medium text-xl">Add profile picture</h1>
                  {/* <button>
                        <X />
                      </button> */}
                </div>
                <div className=" p-4">
                  {tempImages.profile == "" ? (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <Image
                      src={`${tempImages.profile}`}
                      alt=""
                      width={200}
                      height={80}
                      className=" w-full rounded-lg"
                    />
                  )}
                </div>
                <div className=" flex items-center border-t-[2px] border-gray-100 justify-between w-full p-4 ">
                  <button
                    onClick={() => {
                      setTempImages({ ...tempImages, profile: "" });
                      setCardDetails({
                        ...cardDetails,
                        images: {
                          ...cardDetails.images,
                          profile: "",
                        },
                      });
                    }}
                  >
                    <Trash />
                  </button>

                  <div className=" space-x-2 ">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button
                      variant={"default"}
                      onClick={() => {
                        setCardDetails({
                          ...cardDetails,
                          images: {
                            ...cardDetails.images,
                            profile: tempImages.profile,
                          },
                        });
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={` h-24 flex flex-col items-center ${
                  cardDetails.images.cover != ""
                    ? " border-primaryCol-200 shadow-lg "
                    : "border-gray-200"
                } `}
              >
                {cardDetails.images.cover != "" ? (
                  <div className=" flex flex-col items-center">
                    <TbExchange />
                    <h1>Change Cover Photo</h1>
                  </div>
                ) : (
                  <div className=" flex flex-col items-center">
                    <BiPlus />
                    <h1>Add Cover Photo</h1>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-[30rem] rounded-xl p-0">
              <div className=" w-full">
                <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                  <h1 className=" font-medium text-xl">Add cover picture</h1>
                  {/* <button>
                        <X />
                      </button> */}
                </div>
                <div className=" p-4">
                  {tempImages.cover == "" ? (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <Image
                      src={`${tempImages.cover}`}
                      alt=""
                      width={200}
                      height={80}
                      className=" w-full rounded-lg"
                    />
                  )}
                </div>
                <div className=" flex items-center border-t-[2px] border-gray-100 justify-between w-full p-4 ">
                  <button
                    onClick={() => {
                      setTempImages({ ...tempImages, cover: "" });
                      setCardDetails({
                        ...cardDetails,
                        images: {
                          ...cardDetails.images,
                          cover: "",
                        },
                      });
                    }}
                  >
                    <Trash />
                  </button>

                  <div className=" space-x-2 ">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button
                      variant={"default"}
                      onClick={() => {
                        setCardDetails({
                          ...cardDetails,
                          images: {
                            ...cardDetails.images,
                            cover: tempImages.cover,
                          },
                        });
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className=" space-y-5 w-full ">
        <h1 className=" text-2xl font-medium">Add your details</h1>

        <div className=" space-y-4">
          <h3 className=" font-medium">Personal</h3>
          <div className=" w-full flex items-center space-x-10">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.personal.name != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.personal.name != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaUserEdit size={32} />
                      <h1>Name</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BiUser size={32} />
                      <h1>Name</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Name</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your name "
                      className=" space-y-4 py-6"
                      value={cardDetails.personal.name}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          personal: {
                            ...cardDetails.personal,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <button>
                      <Trash />
                    </button>

                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.personal.jobTitle != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.personal.jobTitle != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaEdit size={32} />
                      <h1>Job Title</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BiSolidTrafficBarrier size={32} />
                      <h1>Job Title</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Job Title</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your name "
                      className=" space-y-4 py-6"
                      value={cardDetails.personal.jobTitle}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          personal: {
                            ...cardDetails.personal,
                            jobTitle: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <button>
                      <Trash />
                    </button>

                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.personal.companyName != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.personal.companyName != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaEdit size={32} />
                      <h1>Company Name</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BiBuilding size={32} />
                      <h1>Company Name</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Company Name</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your company name "
                      className=" space-y-4 py-6"
                      value={cardDetails.personal.companyName}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          personal: {
                            ...cardDetails.personal,
                            companyName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <button>
                      <Trash />
                    </button>

                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.personal.bio != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.personal.bio != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaEdit size={32} />
                      <h1>Bio</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BiBadge size={32} />
                      <h1>Bio</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Bio</h1>
                  </div>
                  <div className=" p-4">
                    <textarea
                      placeholder="Enter bio "
                      className=" p-4 border-black border-2 rounded-lg w-full"
                      value={cardDetails.personal.bio}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          personal: {
                            ...cardDetails.personal,
                            bio: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {/* <button className="  space-y-2 ">
                  <div className="  h-fit space-y-2 w-fit rounded-xl p-3 bg-bgCol-200 flex items-center flex-col justify-center">
                    <Heading size={32} />
                    <h1>Headline</h1>
                  </div>
                </button> */}
          </div>
        </div>

        <div className=" space-y-4">
          <h3 className=" font-medium">General</h3>
          <div className=" w-full flex items-center space-x-10">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.general.email != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.general.email != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaRegEdit size={32} />
                      <h1>Email</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BsMailbox size={32} />
                      <h1>Email</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Email</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your email "
                      type="email"
                      className=" space-y-4 py-6"
                      value={cardDetails.general.email}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          general: {
                            ...cardDetails.general,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <button>
                      <Trash />
                    </button>

                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.general.phone != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.general.phone != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaRegEdit size={32} />
                      <h1>Phone</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BsPhone size={32} />
                      <h1>Phone</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Phone</h1>
                  </div>
                  <div className=" p-4">
                    <PhoneInput
                      value={cardDetails.general.phone}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          general: {
                            ...cardDetails.general,
                            phone: e,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <button>
                      <Trash />
                    </button>

                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.general.companyUrl != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.general.companyUrl != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaRegEdit size={32} />
                      <h1>Website</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BsGlobe2 size={32} />
                      <h1>Website</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Website</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your website url "
                      className="  "
                      value={cardDetails.general.companyUrl}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          general: {
                            ...cardDetails.general,
                            companyUrl: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 space-y-2 flex flex-col border-2 items-center ${
                    cardDetails.general.address != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  {cardDetails.general.companyUrl != "" ? (
                    <div className=" flex flex-col items-center">
                      <FaRegEdit size={32} />
                      <h1>Address</h1>
                    </div>
                  ) : (
                    <div className=" flex flex-col items-center">
                      <BiSolidMapPin size={32} />
                      <h1>Address</h1>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Address</h1>
                  </div>
                  <div className=" p-4">
                    <textarea
                      placeholder="Enter your address or business address "
                      className=" w-full border-2 p-3 "
                      value={cardDetails.general.address}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          general: {
                            ...cardDetails.general,
                            address: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className=" space-y-4">
          <h3 className=" font-medium">Social</h3>
          <div className=" w-full flex items-center space-x-10">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20  flex flex-col border-2 items-center ${
                    cardDetails.social.x != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  <BsTwitterX size={32} />
                  <h1>Twitter</h1>
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Username/url</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your twitter url "
                      type="text"
                      className=" space-y-4 py-6"
                      value={cardDetails.social.x}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          social: {
                            ...cardDetails.social,
                            x: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 flex flex-col border-2 items-center ${
                    cardDetails.social.instagram != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  <BsInstagram size={32} />
                  <h1>Instagram</h1>
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Username/url</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your instagram url "
                      type="text"
                      className=" space-y-4 py-6"
                      value={cardDetails.social.instagram}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          social: {
                            ...cardDetails.social,
                            instagram: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 flex flex-col border-2 items-center ${
                    cardDetails.social.thread != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  <BsThreads size={32} />
                  <h1>Threads</h1>
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-base">username/url</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your threads url "
                      type="text"
                      className=" space-y-4 py-6"
                      value={cardDetails.social.thread}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          social: {
                            ...cardDetails.social,
                            thread: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 flex flex-col border-2 items-center ${
                    cardDetails.social.linkedin != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  <BsLinkedin size={32} />
                  <h1>Linkedin</h1>
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-base">Username/url</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your linkedin url "
                      type="text"
                      className=" space-y-4 py-6"
                      value={cardDetails.social.linkedin}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          social: {
                            ...cardDetails.social,
                            linkedin: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20 flex flex-col border-2 items-center ${
                    cardDetails.social.facebook != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  <BsFacebook size={32} />
                  <h1>Facebook</h1>
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-base">Username/url</h1>
                  </div>
                  <div className=" p-4">
                    <Input
                      placeholder="Enter your facebook url "
                      type="text"
                      className=" space-y-4 py-6"
                      value={cardDetails.social.facebook}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          social: {
                            ...cardDetails.social,
                            facebook: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className=" space-y-4 pb-10">
          <h3 className=" font-medium">Messaging</h3>
          <div className=" w-full flex items-center space-x-10">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={` h-20  flex flex-col border-2 items-center ${
                    cardDetails.chat.whatsapp != ""
                      ? " border-primaryCol-200 shadow-lg  "
                      : "border-gray-200"
                  } `}
                >
                  <BsWhatsapp size={32} />
                  <h1>Whatsapp</h1>
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-[30rem] rounded-xl p-0">
                <div className=" w-full">
                  <div className=" flex items-center justify-between w-full px-4 py-4 border-b-[2px] border-gray-100">
                    <h1 className=" font-medium text-xl">Whatsapp</h1>
                  </div>
                  <div className=" p-4">
                    <PhoneInput
                      value={cardDetails.chat.whatsapp}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          chat: {
                            ...cardDetails.chat,
                            whatsapp: e,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=" flex items-center p-4 border-t-[2px] border-gray-100 justify-between w-full">
                    <div className=" space-x-2 ">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button variant={"default"}>Save</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;

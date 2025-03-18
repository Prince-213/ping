import React from "react";

const ClassicContactTile = ({
  title,
  content,
  icon,
  accentColor,
}: {
  title: string;
  content: string;
  icon: React.ReactNode;
  accentColor: string;
}) => {
  console.log(accentColor);
  return (
    <div className=" flex lg:flex-row items-center space-x-3 min-w-full  ">
      <div
        style={{}}
        className=" w-[3rem] h-[3rem] text-black
         flex items-center justify-center rounded-[50%]"
      >
        {icon}
      </div>
      <div className="  w-[70%]">
        <h3 className=" text-base font-semibold">{content}</h3>
        <h3 className=" text-gray-400 font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default ClassicContactTile;

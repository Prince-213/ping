import React from "react";

const ContactTile = ({
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
  return (
    <div className=" flex lg:flex-row items-center space-x-2 min-w-full  ">
      <div
        style={{
          background: accentColor,
        }}
        className=" w-[3rem] h-[3rem] flex items-center justify-center rounded-[50%]"
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

export default ContactTile;

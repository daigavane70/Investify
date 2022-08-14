import { Carousel } from "antd";
import React, { useState } from "react";

const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  zIndex: "-1",
};

export default function Home() {
  const [slide, setSlide] = useState(1);

  const onChange = (currentSlide) => {
    setSlide(currentSlide);
  };
  return (
    <div className="space-y-4 relative">
      <div className="h-[400px] relative">
        <div className="w-full h-full z-2 bg-black/20 top-0 left-0 absolute">
          Weclome to Investify
        </div>
        <Carousel afterChange={onChange} autoplay>
          {carouselData.map((data) => {
            return (
              <div>
                <div
                  className="flex justify-center items-center"
                  style={contentStyle}
                >
                  <img className="min-h-full min-w-full z-0" src={data}></img>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div>
        <h1 className="text-xl font-bold pb-2 border-b text-gray-500">
          Predicted Startups list
        </h1>
      </div>
    </div>
  );
}

const carouselData = [
  "https://i0.wp.com/www.inventiva.co.in/wp-content/uploads/2022/06/BgWmTW6J-startup-company-1.jpg",
  "https://startupdevkit.com/wp-content/uploads/2018/06/Teamwork-all-co-workers-fists-meet-in-middle-of-table-e1589582548280.jpg",
  "https://www.insureon.com/-/media/blog/posts/2019/photo_group-stands-around-conference-table.jpg?h=370&iar=0&w=750&rev=6052a645e3474734a6db5014292ce5d1",
];

import React from "react";
import HomeCard from "../../components/homecomponents/HomeCard";
import { homeCompletedData } from "../../data/Home";

function Mathematics() {
  // const englishCourses = courseCompletedData.filter(
  //   (course) => course.subject === "english"
  // );

  // console.log("English component rendered");
  // console.log("courseCompletedData:", courseCompletedData);
  // console.log("courseCompletedData length:", courseCompletedData?.length);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {homeCompletedData?.map((item, index) => (
        <HomeCard item={item} index={index} key={index} btn />
      ))}
    </div>
  );
}

export default Mathematics;

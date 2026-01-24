import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { courseService } from "../../../services/courseService";

const SingleProductPage = () => {
  const { courseId } = useParams();
  const [activetab, setactiveTab] = useState("about");
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [courseResponse, topicsResponse] = await Promise.all([
        courseService.getCourses(),
        courseService.getCourseTopics(courseId),
      ]);

      // Find the specific course from the courses list
      const coursesData = courseResponse?.data || courseResponse || [];
      const currentCourse = coursesData.find(
        (c) => (c.id || c._id) === courseId || String(c.id || c._id) === String(courseId)
      );

      if (currentCourse) {
        setCourse(currentCourse);
      }

      // Set topics
      const topicsData = topicsResponse?.data || topicsResponse || [];
      setTopics(Array.isArray(topicsData) ? topicsData : topicsData.topics || []);
    } catch (error) {
      console.error("Failed to fetch course details:", error);
      setError("Failed to load course details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
        <p className="text-red-500 mb-2">{error}</p>
        <button
          onClick={fetchCourseDetails}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full text-[#7D7F85] p-4 lg:p-8 overflow-y-scroll">
      <h1 className="w-full font-bold text-black text-[20px] lg:text-2xl mb-8">
        {course?.title || course?.name || "Course Details"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-3">
        <div className="lg:w-[80%] flex flex-col gap-2">
          <img
            src="/src/assets/images/single-course-page-img/shapes.svg"
            alt=""
            className="w-full h-full mb-2"
          />

          <div className="flex items-center justify-between mb-10">
            <div className="flex">
              <div className="flex items-center gap-2 border-r-[1px] border-r-[#D1D2D5] pr-3">
                <img
                  src="/src/assets/images/single-course-page-img/reviews.svg"
                  alt=""
                  className="w-14 lg:w-18"
                />
                <span className="text-[14px]">3.1</span>
              </div>
              <div className="flex items-center gap-2 pl-3">
                <img
                  src="/src/assets/images/single-course-page-img/mdi_users-group.svg"
                  alt=""
                />
                <span className="text-[14px]">124</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/images/single-course-page-img/solar_calendar-linear.svg"
                alt=""
                className="w-4 lg:w-6"
              />
              <span className="text-[10px] lg:text-[14px]">Last updated July, 2025</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span
              onClick={() => setactiveTab("about")}
              className={`${
                activetab == "about" ? "text-[#2D5BFF]" : null
              } cursor-pointer`}
            >
              About
            </span>
            <span
              onClick={() => setactiveTab("faq")}
              className={`${
                activetab == "faq" ? "text-[#2D5BFF]" : null
              } cursor-pointer`}
            >
              FAQ
            </span>
            <span
              onClick={() => setactiveTab("reviews")}
              className={`${
                activetab == "reviews" ? "text-[#2D5BFF]" : null
              } cursor-pointer`}
            >
              Reviews
            </span>
          </div>

          <div>
            {activetab == "about" ? (
              <p>
                {course?.description || "No description available for this course."}
              </p>
            ) : activetab == "faq" ? (
              <p>
                {course?.faq || "Frequently asked questions will be available soon."}
              </p>
            ) : activetab == "reviews" ? (
              <p>
                {course?.reviews?.length > 0
                  ? `${course.reviews.length} reviews available`
                  : "No reviews yet. Be the first to review this course!"}
              </p>
            ) : null}
          </div>
        </div>

        {/* rightside */}
        <div className="lg:w-[30%] flex flex-col gap-5 bg-[#F4F5F8] rounded-lg p-2 lg:mr-5">
          <h3 className="text-black font-bold text-[20px]">Subject content</h3>
          <div className="flex flex-col h-full gap-7 bg-white rounded-lg p-3">
            {topics.length > 0 ? (
              topics.map((item, index) => (
                <div key={item.id || item._id || index} className="flex gap-4">
                  <input
                    type="radio"
                    className="w-5"
                    checked={item.completed || false}
                    readOnly
                  />
                  <div>
                    <h3 className="text-black text-[14px]">{item?.title || item?.name}</h3>
                    <span className="text-[14px]">
                      {item?.lesson || item?.duration || `${item?.lessonsCount || 0} lessons`}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No topics available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

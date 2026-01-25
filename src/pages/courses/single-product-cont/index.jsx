import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import AppButton from "../../../components/form/AppButton";
import { progressService } from "../../../services/progressService";
import { courseService } from "../../../services/courseService";

const contentTypes = [
  { title: "Text", image: "text.svg" },
  { title: "Audio", image: "audio.svg" },
  { title: "Video", image: "video.svg" },
];

const SingleProductCont = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [activetab, setactiveTab] = useState("Text");
  const [lesson, setLesson] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchLessonData();
    }
  }, [courseId, lessonId]);

  const fetchLessonData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [topicsResponse, lessonResponse] = await Promise.all([
        courseService.getCourseTopics(courseId),
        lessonId ? progressService.getLessonProgress(lessonId) : Promise.resolve(null),
      ]);

      // Set topics
      const topicsData = topicsResponse?.data || topicsResponse || [];
      const topicsList = Array.isArray(topicsData) ? topicsData : topicsData.topics || [];
      setTopics(topicsList);

      // Set current lesson (either from API or first topic)
      if (lessonResponse?.data || lessonResponse) {
        setLesson(lessonResponse?.data || lessonResponse);
      } else if (topicsList.length > 0) {
        // Use first topic as current lesson if no specific lesson requested
        setLesson(topicsList[0]);
      }
    } catch (error) {
      console.error("Failed to fetch lesson data:", error);
      setError("Failed to load lesson. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextLesson = async () => {
    try {
      if (lessonId) {
        await progressService.completeLesson(lessonId);
      }
      // Find next lesson
      const currentIndex = topics.findIndex(
        (t) => (t.id || t._id) === (lesson?.id || lesson?._id)
      );
      if (currentIndex >= 0 && currentIndex < topics.length - 1) {
        const nextLesson = topics[currentIndex + 1];
        navigate(`/courses/${courseId}/lesson/${nextLesson.id || nextLesson._id}`);
      } else {
        navigate(`/courses/${courseId}`);
      }
    } catch (error) {
      console.error("Failed to complete lesson:", error);
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
          onClick={fetchLessonData}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  // Extract content from lesson data
  const textContent = lesson?.textContent || lesson?.content?.text || [];
  const audioContent = lesson?.audioContent || lesson?.content?.audio || [];
  const videoContent = lesson?.videoContent || lesson?.content?.video || [];

  return (
    <div className="w-full text-[#7D7F85] p-4 lg:p-8 overflow-y-scroll">
      <h1 className="w-full font-bold text-black text-[20px] lg:text-2xl mb-8">
        {lesson?.title || lesson?.name || "Lesson Content"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-3">
        <div
          className="lg:w-[80%] flex flex-col gap-2 rounded-lg border-[1px] border-[#ECEDF0] p-2
        "
        >
          <div className="flex items-center justify-between lg:justify-normal lg:max-w-fit gap-10 py-1 px-2 bg-[#F4F5F8] rounded-lg mb-3">
            {contentTypes.map((item, i) => (
              <div
                key={i}
                className={`flex gap-1 cursor-pointer ${
                  activetab == item?.title
                    ? "py-1 px-4 bg-white text-black"
                    : ""
                }`}
                onClick={() => setactiveTab(item?.title)}
              >
                <img
                  src={`/src/assets/images/single-course-page-img/${item?.image}`}
                  alt=""
                />
                <span>{item?.title}</span>
              </div>
            ))}
          </div>

          <img
            src="/src/assets/images/single-course-page-img/media-image.svg"
            alt=""
            className="w-full h-full mb-2"
          />

          <div className="flex justify-between">
            <span className=" text-black text-[18px] lg:text-[24px]">
              Identify and Draw Straight Lines - Lesson 1
            </span>
            <img
              src="/src/assets/images/single-course-page-img/download-icon.svg"
              alt=""
            />
          </div>

          <div className="flex items-center justify-between mb-5">
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
              <span className="text-[10px] lg:text-[14px]">
                Last updated July, 2025
              </span>
            </div>
          </div>

          <div className="border-[1px] border-[#F4F5F8] mb-5"></div>

          <div className="">
            {activetab === "Text" && (
              <div className="flex flex-col gap-8">
                {textContent.length > 0 ? (
                  textContent.map((text, textIndex) => (
                    <div key={textIndex} className="px-6">
                      <h1 className="text-black mb-2 font-bold">{text?.title}</h1>
                      {Array.isArray(text?.description) ? (
                        text.description.map((desc, descIndex) => (
                          <li key={descIndex}>{desc}</li>
                        ))
                      ) : (
                        <p>{text?.description || text?.content}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="px-6 text-gray-500">
                    {lesson?.description || "No text content available for this lesson."}
                  </p>
                )}
              </div>
            )}

            {activetab === "Audio" && (
              <div className="flex flex-col gap-4">
                {audioContent.length > 0 ? (
                  audioContent.map((media, mediaIndex) => (
                    <div
                      key={mediaIndex}
                      className="w-full lg:w-[80%] flex items-center gap-3 border-[1px] border-[#ECEDF0] p-3"
                    >
                      <img
                        src={media?.image || "/src/assets/images/single-course-page-img/audio-icon.svg"}
                        alt=""
                        className="w-[32px] lg:w-15"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[16px] lg:text-[20px]">{media?.title}</h1>
                        <span className="text-[14px]">{media?.duration}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No audio content available for this lesson.</p>
                )}
              </div>
            )}
            {activetab === "Video" && (
              <div className="flex flex-col gap-4">
                {videoContent.length > 0 ? (
                  videoContent.map((media, mediaIndex) => (
                    <div
                      key={mediaIndex}
                      className="w-full lg:w-[80%] flex items-center gap-3 border-[1px] border-[#ECEDF0] p-3"
                    >
                      <img
                        src={media?.image || "/src/assets/images/single-course-page-img/video-icon.svg"}
                        alt=""
                        className="w-[32px] lg:w-15"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[16px] lg:text-[20px]">{media?.title}</h1>
                        <span className="text-[14px]">{media?.duration}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No video content available for this lesson.</p>
                )}
              </div>
            )}
          </div>

          <div className="border-[1px] border-[#F4F5F8] my-3"></div>
          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="border-[1px] border-[#7D7F85] rounded-full px-8 py-2"
            >
              Cancel
            </button>
            <AppButton
              onClick={handleNextLesson}
              title="Next Lesson"
              className={`text-white px-8 py-2`}
              icon
              iconSrc="/src/assets/images/single-course-page-img/Arrow-Icons.png"
            />
          </div>
        </div>

        {/* rightside */}
        <div className="hidden lg:w-[30%] lg:flex flex-col gap-5 bg-[#F4F5F8] rounded-lg p-2 lg:mr-5">
          <h3 className="text-black font-bold text-[20px]">Subject content</h3>
          <div className="flex flex-col h-full gap-7 bg-white rounded-lg p-3">
            {topics.length > 0 ? (
              topics.map((item, index) => (
                <div
                  key={item.id || item._id || index}
                  className={`flex gap-4 cursor-pointer p-2 rounded ${
                    (item.id || item._id) === (lesson?.id || lesson?._id)
                      ? "bg-blue-50"
                      : ""
                  }`}
                  onClick={() =>
                    navigate(`/courses/${courseId}/lesson/${item.id || item._id}`)
                  }
                >
                  <input
                    type="radio"
                    className="w-5"
                    checked={item.completed || (item.id || item._id) === (lesson?.id || lesson?._id)}
                    readOnly
                  />
                  <div>
                    <h3 className="text-black text-[14px]">{item?.title || item?.name}</h3>
                    <span className="text-[14px]">
                      {item?.lesson || item?.duration || `Lesson ${index + 1}`}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No topics available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCont;

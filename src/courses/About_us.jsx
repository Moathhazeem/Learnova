import React from "react";
import "./About_us.css";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function AboutUs() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
const StoryLearnova = [
    {
        id: 1,
        title: t("setting.about_us_story_title_1", "The Beginning"),
        descriptions: [
            t("setting.about_us_story_desc_1_p1", "Learnova was founded by a group of passionate educators and developers who wanted to make learning accessible to everyone. They started working on the platform in 2021 as a small side project while testing ideas and collecting feedback from learners."),
            t("setting.about_us_story_desc_1_p2", "The first beta version of Learnova launched in early 2022 to a small group of students eager to explore online courses.")
        ]
    },
    {
        id: 2,
        title: t("setting.about_us_story_title_2", "First Students"),
        descriptions: [
            t("setting.about_us_story_desc_2_p1", "From day one, Learnova received requests from learners around the world who wanted early access. The platform began enrolling its first students and collecting feedback to improve the experience."),
            t("setting.about_us_story_desc_2_p2", "After implementing the payment and course management system, Learnova welcomed its first paid students in March 2022, months before the public launch.")
        ]
    },
    {
        id: 3,
        title: t("setting.about_us_story_title_3", "The Launch"),
        descriptions: [
            t("setting.about_us_story_desc_3_p1", "Learnova officially launched publicly in June 2022. Within the first week, hundreds of learners joined, exploring courses in technology, design, and professional skills."),
            t("setting.about_us_story_desc_3_p2", "The platform has been growing steadily ever since, adding new courses and instructors regularly to serve learners worldwide.")
        ]
    },
    {
        id: 4,
        title: t("setting.about_us_story_title_4", "About Learnova"),
        descriptions: [
            t("setting.about_us_story_desc_4_p1", "Learnova is an all-in-one online learning platform that makes it easy for anyone to gain new skills, grow professionally, and transform their life through education."),
            t("setting.about_us_story_desc_4_p2", "It is flexible, user-friendly, and affordable, allowing learners to study at their own pace without barriers.")
        ]
    },
    {
        id: 5,
        title: t("setting.about_us_story_title_5", "The Mission"),
        descriptions: [
            t("setting.about_us_story_desc_5_p1", "Learnova’s mission is to make high-quality education accessible to everyone, anywhere in the world."),
            t("setting.about_us_story_desc_5_p2", "We combine simplicity, flexibility, and expert-led courses to empower learners to achieve their personal and professional goals.")
        ]
    },
    {
        id: 6,
        title: t("setting.about_us_story_title_6", "The Name of Learnova"),
        descriptions: [
            t("setting.about_us_story_desc_6_p1", "The name Learnova comes from combining “Learn” + “Nova” (meaning “new” or “star”), symbolizing new learning opportunities and growth for everyone.")
        ]
    }
];
  return (
   <div className="about-us-container">
       {/* Breadcrumbs */}
                       <nav className="breadcrumbs-nav">
                           <Link to="/Home" className="Breadcrumbs">
                               {t("setting.home", "Home")}
                           </Link>
                           {pathname.map((value, index) => {
                               const to = "/" + pathname.slice(0, index + 1).join("/");
                               const isLast = index === pathname.length - 1;
                               const translationKey = value.toLowerCase().replace("%20", "_").replace(" ", "_");
       
                               return (
                                   <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                       <span className="breadcrumb-separator">
                                           {t("setting.breadcrumb_separator", ">")}
                                       </span>
                                       {isLast ? (
                                           <span className="current-page" style={{ textDecoration: 'none' }}>
                                               {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                           </span>
                                       ) : (
                                           <Link to={to} className="Breadcrumbs">
                                               {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                           </Link>
                                       )}
                                   </span>
                               );
                           })}
                        </nav>
                        {/* About Us Content */}
                        <div className="about-us-content">
                            <h2 className="about-us-description">{t("setting.about_us_description", "Empowering learners everywhere with simple, accessible, and high-quality courses.")}</h2>
                            <div className="about_us_Story">
                                <h2 className="Story_title">{t("setting.about_us_story_title", "The Story of Learnova")}</h2>
                                <div className="story-grid-container">
                                    {StoryLearnova.map((story) => (
                                        <div key={story.id} className="story-card">
                                            <h3 className="story-title">{story.title}</h3>
                                            <div className="story-description-box">
                                                {story.descriptions.map((desc, index) => (
                                                    <p key={index} className="story-text">
                                                        {desc}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
    </div>


  );
}
export default AboutUs;
import { useState } from "react";
import { Play, Pause, ChevronRight, ChevronDown, Check, Volume2, Settings, Maximize, BookOpen, Download, MessageSquare, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./Course_start.css";

function Course_start() {
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(x => x);
    const { t } = useTranslation();

    const courseData = {
        title: "Introduction to Logo Design",
        sections: [
            {
                id: "sec1", title: "Introduction to Logo Design", lessonCount: 3,
                lessons: [
                    { id: "l1", title: "Course Introduction", duration: "2:30", completed: true },
                    { id: "l2", title: "Tool you will use", duration: "2:30", completed: false },
                    { id: "l3", title: "Setting up Illustrator", duration: "3:00", completed: false }
                ]
            },
            {
                id: "sec2", title: "Understanding the brand before designing", lessonCount: 3,
                lessons: [
                    { id: "l4", title: "Brand Identity", duration: "5:00", completed: false },
                    { id: "l5", title: "Brand Research", duration: "4:30", completed: false },
                    { id: "l6", title: "Brand Guidelines", duration: "6:00", completed: false }
                ]
            },
            {
                id: "sec3", title: "Concept Development & Sketching", lessonCount: 4,
                lessons: [
                    { id: "l7", title: "Sketching Basics", duration: "3:30", completed: false },
                    { id: "l8", title: "Concept Ideation", duration: "4:00", completed: false },
                    { id: "l9", title: "Refining Concepts", duration: "5:00", completed: false },
                    { id: "l10", title: "Digital Sketching", duration: "3:00", completed: false }
                ]
            },
            {
                id: "sec4", title: "Logo Design Principles", lessonCount: 2,
                lessons: [
                    { id: "l11", title: "Design Principles", duration: "6:00", completed: false },
                    { id: "l12", title: "Visual Hierarchy", duration: "4:00", completed: false }
                ]
            },
            {
                id: "sec5", title: "Designing the Logo Digitally", lessonCount: 5,
                lessons: [
                    { id: "l13", title: "Illustrator Basics", duration: "5:00", completed: false },
                    { id: "l14", title: "Vector Drawing", duration: "4:30", completed: false },
                    { id: "l15", title: "Typography", duration: "3:00", completed: false },
                    { id: "l16", title: "Color Application", duration: "4:00", completed: false },
                    { id: "l17", title: "Final Touches", duration: "5:30", completed: false }
                ]
            },
            {
                id: "sec6", title: "Color & Typography in Logo Design", lessonCount: 2,
                lessons: [
                    { id: "l18", title: "Color Theory", duration: "6:00", completed: false },
                    { id: "l19", title: "Typography Basics", duration: "4:00", completed: false }
                ]
            },
            {
                id: "sec7", title: "Exporting & Presenting the Logo", lessonCount: 3,
                lessons: [
                    { id: "l20", title: "Export Formats", duration: "3:00", completed: false },
                    { id: "l21", title: "Presentation Tips", duration: "4:00", completed: false },
                    { id: "l22", title: "Client Delivery", duration: "5:00", completed: false }
                ]
            }
        ]
    };

    const allLessons = courseData.sections.flatMap(s => s.lessons);
    const totalLessons = allLessons.length;
    const completedCount = 3;
    const percentage = Math.round((completedCount / totalLessons) * 100);

    const [currentLesson, setCurrentLesson] = useState(allLessons[1]);
    const [openSections, setOpenSections] = useState({ sec1: true });
    const [activeTab, setActiveTab] = useState('overview');
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoplay, setAutoplay] = useState(true);

    const currentLessonIndex = allLessons.findIndex(l => l.id === currentLesson.id);

    const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    const goPrev = () => { if (currentLessonIndex > 0) setCurrentLesson(allLessons[currentLessonIndex - 1]); };
    const goNext = () => { if (currentLessonIndex < allLessons.length - 1) setCurrentLesson(allLessons[currentLessonIndex + 1]); };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <BookOpen size={14} /> },
        { id: 'resources', label: 'Resources', icon: <Download size={14} /> },
        { id: 'qa', label: 'Q&A', icon: <MessageSquare size={14} /> },
        { id: 'notes', label: 'Notes', icon: <FileText size={14} /> },
    ];

    return (
        <div className="course_start-page">
            <div className="course_start-container">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">{t('setting.home', 'Home')}</Link>
                    <span className="breadcrumb-separator"><ChevronRight size={14} /></span>
                    <Link to="/Course" className="Breadcrumbs">Course</Link>
                    <span className="breadcrumb-separator"><ChevronRight size={14} /></span>
                    <Link to="/Course" className="Breadcrumbs">Adobe Illustrator Logo Design</Link>
                    <span className="breadcrumb-separator"><ChevronRight size={14} /></span>
                    <span className="current-page">Introduction to Logo Design</span>
                </nav>

                {/* Main Layout */}
                <div className="course_start_main">

                    {/* ── Left Sidebar ── */}
                    <div className="left_side_course">
                        <h3 className="course_start_title">Course Content</h3>

                        {/* Progress */}
                        <div className="progress-container">
                            <div className="progress-labels">
                                <span className="progress-label-percentage">{percentage}% Complete</span>
                                <span className="progress-label-text">{completedCount}/{totalLessons} Complete</span>
                            </div>
                            <div className="progress-bar-track">
                                <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="course_list">
                            {courseData.sections.map((section) => (
                                <div key={section.id} className="section_block">
                                    <div
                                        className={`section_header ${openSections[section.id] ? 'open' : ''}`}
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <span className="section_title_text">{section.title}</span>
                                        <ChevronDown size={18} className={`section_chevron ${openSections[section.id] ? 'open' : ''}`} />
                                    </div>
                                    <span className="section_lesson_count">{section.lessonCount} Lessons</span>

                                    <div className={`section_content ${openSections[section.id] ? 'expanded' : 'collapsed'}`}>
                                        {section.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className={`lesson_item ${currentLesson.id === lesson.id ? 'active' : ''}`}
                                                onClick={() => setCurrentLesson(lesson)}
                                            >
                                                <div className={`lesson_status_icon ${lesson.completed ? 'done' : ''}`}>
                                                    {lesson.completed
                                                        ? <Check size={11} />
                                                        : <Play size={9} />}
                                                </div>
                                                <div className="lesson_info">
                                                    <h5>{lesson.title}</h5>
                                                    <p><Play size={9} /> {lesson.duration}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right Main ── */}
                    <div className="right_side_course">

                        {/* Video Player */}
                        <div className="video_player_wrapper">
                            <div className="video_placeholder">
                                <button className="play_btn_center" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                                </button>
                            </div>
                            {/* Controls Bar */}
                            <div className="video_controls">
                                <div className="video_seek_bar">
                                    <div className="seek_fill" style={{ width: '40%' }} />
                                    <div className="seek_thumb" style={{ left: '40%' }} />
                                </div>
                                <div className="video_controls_row">
                                    <div className="controls_left">
                                        <button className="ctrl_btn" onClick={() => setIsPlaying(!isPlaying)}>
                                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                        </button>
                                        <button className="ctrl_btn"><Volume2 size={16} /></button>
                                        <div className="volume_bar_track">
                                            <div className="volume_bar_fill" style={{ width: '60%' }} />
                                        </div>
                                        <span className="time_label">1:00 / 2:30</span>
                                    </div>
                                    <div className="controls_right">
                                        <button className="ctrl_btn"><Settings size={16} /></button>
                                        <button className="ctrl_btn"><Maximize size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lesson Info */}
                        <div className="lesson_info_bar">
                            <div className="lesson_info_top">
                                <h2 className="lesson_main_title">{currentLesson.title}</h2>
                                <div className="lesson_nav_controls">
                                    <span className="autoplay_label">Autoplay</span>
                                    <div className={`autoplay_toggle ${autoplay ? 'on' : ''}`} onClick={() => setAutoplay(!autoplay)}>
                                        <div className="toggle_thumb" />
                                    </div>
                                    <button className="nav_btn" onClick={goPrev} disabled={currentLessonIndex === 0}>
                                        <ChevronRight size={14} className="icon_flip" /> Prev
                                    </button>
                                    <button className="nav_btn" onClick={goNext} disabled={currentLessonIndex === allLessons.length - 1}>
                                        Next <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="lesson_meta">Lesson {currentLessonIndex + 1} of {totalLessons}&nbsp;&nbsp;·&nbsp;&nbsp;{currentLesson.duration}</p>

                            {/* Tabs */}
                            <div className="lesson_tabs">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`tab_btn ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'overview' && (
                                <div className="tab_content">
                                    <p>In this lesson, we'll take the component we built with the Render Props pattern and refactor it completely using modern React Hooks. You'll see how Hooks can significantly reduce boilerplate and make logic easier to share across your application.</p>
                                    <h4>What you'll learn:</h4>
                                    <ul>
                                        <li><Check size={14} className="check_icon" /> Identifying the core state logic</li>
                                        <li><Check size={14} className="check_icon" /> Replacing render props with useToggle</li>
                                        <li><Check size={14} className="check_icon" /> Cleaning up the component tree</li>
                                        <li><Check size={14} className="check_icon" /> Performance considerations</li>
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'resources' && (
                                <div className="tab_content"><p>No resources available for this lesson.</p></div>
                            )}
                            {activeTab === 'qa' && (
                                <div className="tab_content"><p>No questions yet. Be the first to ask!</p></div>
                            )}
                            {activeTab === 'notes' && (
                                <div className="tab_content"><p>Your notes will appear here.</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course_start;
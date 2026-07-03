import { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronRight, ChevronDown, Check, Volume2, VolumeX, Settings, Maximize, Minimize, BookOpen, Download, MessageSquare, FileText, Upload, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

import "./Course_start.css";

const courseData = {
    title: "Introduction to Logo Design",
    sections: [
        {
            id: "sec1", title: "Introduction to Logo Design", lessonCount: 3,
            lessons: [
                { id: "l1", title: "Course Introduction", duration: "2:30", completed: false, videoUrl: "public/video/demo.mp4" },
                { id: "l2", title: "Tool you will use", duration: "2:30", completed: false, videoUrl: "public/video/demo.mp4" },
                { id: "l3", title: "Setting up Illustrator", duration: "3:00", completed: false, videoUrl: "public/video/demo.mp4" }
            ]
        },
        {
            id: "sec2", title: "Understanding the brand before designing", lessonCount: 3,
            lessons: [
                {
                    id: "l4", title: "Introduction about global brand", duration: "5:00", completed: true, type: 'reading',
                    content: {
                        heading: "Introduction About Global Brand",
                        sections: [
                            {
                                title: "What is a Global Brand ?",
                                paragraphs: [
                                    "A global brand is a brand that is recognized and available in many countries around the world, not just in its home market. It represents a product or service that has widespread acceptance, a consistent identity across cultures, and a uniform message wherever it operates.",
                                    "A global brand goes beyond local borders and creates a unified experience for customers in different regions. It carries an image that is universally understood, though sometimes it may be adapted slightly to suit local preferences."
                                ]
                            },
                            {
                                title: 'What Makes a Brand "Global"?',
                                intro: "A brand becomes global when it meets several key criteria:",
                                bullets: [
                                    { label: "Wide Geographic Presence", text: "The brand is active in multiple continents and countries, not only in its country of origin." },
                                    { label: "Consistent Brand Identity", text: "The brand uses the same core message, logo, values, and positioning in different markets. This helps customers recognize it anywhere." },
                                    { label: "Universal Appeal", text: "The brand's promise or value proposition resonates with people from different cultures and demographic groups." },
                                    { label: "Strong Brand Equity", text: "Global brands are well-known, trusted, and often carry a reputation for quality or uniqueness." }
                                ]
                            }
                        ]
                    }
                },
                { id: "l5", title: "How understanding your brand", duration: "2:30", completed: true },
                {
                    id: "l6", title: "Assignment about your brand", duration: "10:00", completed: false, type: 'assignment',
                    instructions: [
                        "When selecting and defining the brand to be developed for the project, the following conditions and criteria must be met:",
                        "Brand Identity Clarity: The brand must have a clear name, logo, official colors, and approved fonts that reflect its personality and facilitate its recognition among competitors.",
                        "Mission and Vision: The brand must have a mission that explains its purpose and a vision that defines its future aspirations and what it aims to achieve in the long term.",
                        "Target Audience: It is essential to accurately define the target audience (age, gender, geographic location, interests, income level) so that the identity and marketing are designed to suit them.",
                        "Unique Value Proposition: The brand must offer a clear competitive advantage that distinguishes it from competitors, whether in terms of price, quality, service, technology, or user experience.",
                        "Scalability: Ideally, the brand should be capable of future scalability, whether through adding new products, entering new markets, or developing digital services.",
                        "Digital Presence: The brand must have, or be able to build, a strong digital presence through a website, social media, or apps.",
                        "Visual Consistency: All design elements must be consistent across all platforms to ensure a strong brand image for customers.",
                        "Customer Relationship Potential: A successful brand focuses on the customer experience and works to earn their trust and loyalty.",
                        "Brand Personality: The brand's personality (formal, youthful, luxurious, innovative, social, etc.) must be defined, as this influences communication and design style.",
                        "Market Relevance: The brand must be relevant to the needs of the Palestinian market (or target market) and address a real problem."
                    ]
                }
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

function Course_start() {
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(x => x);
    const { t } = useTranslation();
    const [volume, setVolume] = useState(50);
    const [isMuted, setMuted] = useState(false);
    const [preVolume, setPreVolume] = useState(50);
    const [video, setVideo] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(150);
    const playerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [isLooping, setIsLooping] = useState(false);
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('pdf');
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [course, setCourse] = useState(courseData); // تمرير البيانات الافتراضية الثابتة هنا
    const handleVideoEnd = (lessonId) => {
        //if (!completedLessons.includes(lessonId)) {
        //  setCompletedLessons(prev => [...prev, lessonId]);
        //}
        setCourse(prevCourse => {
            return {
                ...prevCourse,
                sections: prevCourse.sections.map(section => ({
                    ...section,
                    lessons: section.lessons.map(lesson => {
                        if (lesson.id === lessonId) {
                            return { ...lesson, completed: true }; // تحديث حالة الدرس المكتمل
                        }
                        return lesson;
                    })
                }))
            };
        });
    }


    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        if (videoRef.current) {
            videoRef.current.playbackRate = newSpeed;
        }
        setShowSettings(false);
    }
    const toggleLoop = () => {
        const nextLoop = !isLooping;
        setIsLooping(nextLoop);
        if (videoRef.current) {
            videoRef.current.loop = nextLoop;
        }
        setShowSettings(false);
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    }
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    }
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    const handleFullscreen = () => {
        if (!playerRef.current) return;
        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen().catch((err) => {
                console.error(`failed to enter fullscreen mode: ${err.message}`)
            });
        } else {
            document.exitFullscreen();
        }
    }
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    const handleTimeChange = (e) => {
        const NewTime = Number(e.target.value);
        setCurrentTime(NewTime);
        if (videoRef.current) {
            videoRef.current.currentTime = NewTime;
        }
    }

    const handleVideoChange = (e) => {
        setVideo(e.target.value);
    }
    const toggleMute = () => {
        if (isMuted) {
            setVolume(preVolume);
            setIsMuted(false);
        }
        else {
            setPreVolume(volume !== 0 ? volume : 50);
            setVolume(0);
            setIsMuted(true);
        }
    }
    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0) {
            setIsMuted(false);
        }
        else {
            setIsMuted(true);
        }
    }
    const allLessons = course.sections.flatMap(s => s.lessons);
    const totalLessons = allLessons.length;
    const completedCount = completedLessons.length;
    const percentage = Math.round((completedCount / totalLessons) * 100)

    //const allLessons = courseData.sections.flatMap(s => s.lessons);
    //const totalLessons = allLessons.length;
    //const completedCount = 10;
    //const percentage = Math.round((completedCount / totalLessons) * 100);

    const [currentLesson, setCurrentLesson] = useState(course.sections[0].lessons[0]);
    const [markedComplete, setMarkedComplete] = useState({});
    const [openSections, setOpenSections] = useState({ sec1: true, sec2: true });
    const [activeTab, setActiveTab] = useState('overview');



    const [autoplay, setAutoplay] = useState(true);
    const videoAutoplay = useRef(null);
    const [showControls, setShowControls] = useState(true);
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
        setShowControls(true)
    }
    useEffect(() => {
        if (showControls) {
            const timer = setTimeout(() => { setShowControls(false); }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showControls, isPlaying])

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            }
            else {
                videoRef.current.pause()
            }
        }
    }, [isPlaying]);
    useEffect(() => {
        if (videoRef.current && autoplay) {

            if (videoRef.current.currentTime == 0) {
                setIsPlaying(true);
                videoRef.current.play();
            }
        }
    }, [currentLesson.videoUrl, autoplay])
    const [noteText, setNoteText] = useState('');
    const [clickNote, setClickNote] = useState(false);
    const [saveNotice, setSaveNotice] = useState([
    ]);
    const handleSaveNotice = () => {
        setClickNote(true)
        if (noteText.trim() !== '') {
            const newNote = {
                id: saveNotice.length + 1,
                content: noteText
            };
            setSaveNotice([...saveNotice, newNote]);
            setNoteText('');
            setClickNote(false);
        }
    }
    const deleteNote = (id) => {
        setSaveNotice(saveNotice.filter(note => note.id !== id));
    };
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        if (e.target.files[0]) setSelectedFile(e.target.files[0]);
    };
    const handleDrop = (e) => { e.preventDefault(); if (e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]); };
    const [newQuestion, setNewQuestion] = useState('');
    const [expandedQA, setExpandedQA] = useState(0);
    const [questions, setQuestions] = useState([
        { id: 1, question: 'How do I install Adobe Illustrator on Windows ?', answer: 'You can download the installer from Adobe.org and follow the installation wizard.' },
        { id: 2, question: 'How do I install Adobe Illustrator on Windows ?', answer: '' },
    ]);
    const resources = [
        { id: 1, name: 'Summary lesson 1', type: 'Link', icon: 'link', link: 'https://drive.google.com/file/d/1Pd-Mc1Mhc-Sx5gRWNIHm7mNNQ5GIYPMK/view?usp=drive_link' },
        { id: 2, name: 'Summary lesson 1.zip', type: 'Download', icon: 'download', link: 'https://drive.google.com/file/d/1Pd-Mc1Mhc-Sx5gRWNIHm7mNNQ5GIYPMK/view?usp=drive_link' },
    ];
    const handleAskQuestion = () => {
        if (!newQuestion.trim()) return;
        setQuestions(prev => [...prev, { id: Date.now(), question: newQuestion.trim(), answer: '' }]);
        setNewQuestion('');
    };

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
                            {course.sections.map((section) => (
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
                                                <div
                                                    className={`lesson_status_icon flex items-center justify-center size-6 rounded-full transition-all duration-300 ease-in-out ${lesson.completed ? 'done bg-sky-600 border-2 border-sky-600 text-white shadow-sm' : 'border-2 border-slate-300 bg-white text-slate-500 hover:border-slate-400'} ${lesson.type === 'assignment' ? 'assignment' : ''}`}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: '24px',   // تحكم بالحجم المناسب لتصميمك
                                                        height: '24px',
                                                        borderRadius: '50%',
                                                        border: lesson.completed ? 'none' : '2px solid',
                                                        backgroundColor: lesson.completed ? '#1072BA' : 'transparent', // غير اللون الأزرق حسب الهوية المطلوبة
                                                        color: lesson.completed ? '#ffffff' : 'inherit'
                                                    }}
                                                >
                                                    {lesson.completed ? (
                                                        // أيقونة الصح البيضاء داخل الدائرة الزرقاء الممتلئة
                                                        <Check size={12} strokeWidth={3} className="text-white" />
                                                    ) : lesson.type === 'assignment' ? (
                                                        <FileText size={9} />
                                                    ) : (
                                                        <Play size={9} />
                                                    )}
                                                </div>
                                                <div className="lesson_info">
                                                    <h5>{lesson.title}</h5>
                                                    <p>{lesson.type === 'assignment' ? <FileText size={9} /> : <Play size={9} />} {lesson.duration}</p>
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

                        {/* Video Player OR Reading Material OR Assignment */}
                        {currentLesson.type === 'reading' ? (
                            <div className="reading_material_wrapper">
                                <div className="reading_material_header">
                                    <div className="reading_material_header_left">
                                        <div className="reading_material_icon"><BookOpen size={18} /></div>
                                        <div>
                                            <h3 className="reading_material_title">Reading Material</h3>
                                            <span className="reading_material_meta"><Clock size={12} /> {currentLesson.duration}</span>
                                        </div>
                                    </div>
                                    <button
                                        className={`mark_complete_btn ${markedComplete[currentLesson.id] ? 'completed' : ''}`}
                                        onClick={() => setMarkedComplete(prev => ({ ...prev, [currentLesson.id]: !prev[currentLesson.id] }))}
                                    >
                                        <Check size={14} />
                                        {markedComplete[currentLesson.id] ? 'Completed' : 'Mark as Complete'}
                                    </button>
                                </div>
                                <div className="reading_material_body">
                                    <h2 className="reading_main_heading">{currentLesson.content.heading}</h2>
                                    {currentLesson.content.sections.map((sec, si) => (
                                        <div key={si} className="reading_section">
                                            <h3 className="reading_section_title">{sec.title}</h3>
                                            {sec.paragraphs && sec.paragraphs.map((p, pi) => (
                                                <p key={pi} className="reading_paragraph">{p}</p>
                                            ))}
                                            {sec.intro && <p className="reading_paragraph">{sec.intro}</p>}
                                            {sec.bullets && (
                                                <ul className="reading_bullets">
                                                    {sec.bullets.map((b, bi) => (
                                                        <li key={bi} className="reading_bullet_item">
                                                            <span className="reading_bullet_dot" />
                                                            <span><strong>{b.label}</strong><br />{b.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : currentLesson.type === 'assignment' ? (
                            <div className="assignment_wrapper">
                                <div className="assignment_header">
                                    <div className="assignment_header_icon"><Upload size={20} /></div>
                                    <div>
                                        <h3 className="assignment_title">Assignment Submission</h3>
                                        <span className="assignment_due">Due: No deadline</span>
                                    </div>
                                </div>
                                <div className="assignment_instructions">
                                    <h4>Instructions</h4>
                                    {currentLesson.instructions.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                                <div
                                    className="assignment_upload_area"
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />
                                    <Upload size={32} className="upload_icon" />
                                    <span className="upload_label">Upload your work</span>
                                    <span className="upload_sub">Drag and drop or click to browse files</span>
                                    {selectedFile && <span className="upload_filename">{selectedFile.name}</span>}
                                    <button className="select_file_btn" onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}>Select File</button>
                                </div>
                                <div className="assignment_submit_row">
                                    <button className="submit_assignment_btn">Submit Assignment</button>
                                </div>
                            </div>
                        ) : (
                            <div className="video_player_wrapper" ref={playerRef}>
                                <video ref={videoRef}
                                    key={currentLesson.videoUrl}
                                    className="video_player"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    autoPlay={autoplay}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    src={currentLesson.videoUrl}
                                    onEnded={() => handleVideoEnd(currentLesson.id)}
                                />
                                <div className={`video_placeholder ${isPlaying ? 'playing' : ''}`}>

                                    <button className="play_btn_center" onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying || (autoplay && videoRef.current.currentTime == 0) ? <Pause size={30} /> : <Play size={30} />}
                                    </button>
                                </div>
                                <div className="video_controls">
                                    <div className="video_seek_bar" style={{ position: "relative" }}>
                                        <input type="range" min="0" max={duration} value={currentTime} onChange={handleTimeChange} className="video_progress_input" />
                                        <div className="seek_fill" style={{ width: `${progressPercentage}%` }} />
                                        <div className="seek_thumb" style={{ left: `${progressPercentage}%` }} />
                                    </div>
                                    <div className="video_controls_row">
                                        <div className="controls_left">
                                            <button className="ctrl_btn" onClick={() => setIsPlaying(!isPlaying)}>
                                                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                            </button>
                                            <button className="ctrl_btn" onClick={toggleMute}>
                                                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                            </button>
                                            <div className="volume_bar_track" style={{ position: "relative" }}>
                                                <div className="volume_bar_fill" style={{ width: `${volume}%` }} />
                                                <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="volume_bar_input" />
                                            </div>
                                            <div className="time_container">
                                                <span className="time_label">{formatTime(currentTime)} / {formatTime(duration)}</span>
                                            </div>
                                        </div>
                                        <div className="controls_right">
                                            <div className="settings_container">
                                                <button className="ctrl_btn" onClick={() => setShowSettings(!showSettings)}><Settings size={16} /></button>
                                                {showSettings && (
                                                    <div className="settings_popup">

                                                        {/* خيار السرعة */}
                                                        <div className="settings_option">
                                                            <span>Speed</span>
                                                            <select value={speed} onChange={(e) => handleSpeedChange(Number(e.target.value))}>
                                                                <option value="0.5">0.5x</option>
                                                                <option value="1">Normal</option>
                                                                <option value="1.5">1.5x</option>
                                                                <option value="2">2x</option>
                                                            </select>
                                                        </div>

                                                        <hr style={{ border: '0.5px solid rgba(255,255,255,0.1)' }} />

                                                        {/* خيار التكرار */}
                                                        <div className="settings_option" onClick={toggleLoop} style={{ cursor: 'pointer' }}>
                                                            <span>Loop video</span>
                                                            <span style={{ color: isLooping ? '#0088ff' : '#aaa' }}>
                                                                {isLooping ? 'On' : 'Off'}
                                                            </span>
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                            <button className="ctrl_btn" onClick={handleFullscreen}>
                                                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
                            <p className="lesson_meta">Lesson {currentLessonIndex + 1} of {totalLessons}&nbsp;&nbsp;·&nbsp;&nbsp;{formatTime(duration)}</p>

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
                                    <p>A global brand is more than just selling products worldwide. It's about creating a unified identity, trusted reputation, and emotional connection with customers across different cultures and countries. Global brands must balance consistency with cultural sensitivity to truly succeed.</p>
                                    <h4>What you'll learn:</h4>
                                    <ul>
                                        <li><Check size={14} className="check_icon" /> How define your brand</li>
                                        <li><Check size={14} className="check_icon" /> How define your compltive</li>
                                        <li><Check size={14} className="check_icon" /> Example about brand</li>
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'resources' && (
                                <div className="tab_content">
                                    <div className="resources_grid">
                                        {resources.map(r => {
                                            const driveMatch = r.link.includes('drive.google.com') ? r.link.match(/\/d\/([a-zA-Z0-9-_]+)/) : null;
                                            const downloadUrl = driveMatch ? `https://docs.google.com/uc?export=download&id=${driveMatch[1]}` : r.link;
                                            return (
                                                <div
                                                    key={r.id}
                                                    className="resource_card"
                                                    onClick={() => window.open(r.type === 'Download' ? downloadUrl : r.link, '_blank', 'noopener,noreferrer')}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div className="resource_layout" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>

                                                        <div className="resource_icon">
                                                            {r.icon === 'link' ? (
                                                                <FileText size={20} className="res_icon_blue" />
                                                            ) : (
                                                                /* استخدام وسم الرابط الأصلي لمنع حظر النوافذ المنبثقة */
                                                                <a
                                                                    href={downloadUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    download={r.name}
                                                                    onClick={(e) => e.stopPropagation()} // منع فتح الكرت الخارجي
                                                                    title="Download file"
                                                                    style={{
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        padding: 0,
                                                                        cursor: 'pointer',
                                                                        display: 'inline-flex',
                                                                        color: 'inherit'
                                                                    }}
                                                                >
                                                                    <Download size={20} className="res_icon_blue" />
                                                                </a>
                                                            )}
                                                        </div>

                                                        <div className="resource_info">
                                                            <span className="resource_name">{r.name}</span>
                                                            <span className="resource_type">{r.type}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'qa' && (
                                <div className="tab_content">
                                    <h4 className="qa_heading">Questions &amp; Answers</h4>
                                    <div className="qa_list">
                                        {questions.map((q, i) => (
                                            <div key={q.id} className="qa_item" onClick={() => setExpandedQA(expandedQA === i ? -1 : i)}>
                                                <div className="qa_question_row">
                                                    <MessageSquare size={16} className="qa_icon" />
                                                    <span className="qa_question_text">{q.question}</span>
                                                </div>
                                                {expandedQA === i && q.answer && (
                                                    <div className="qa_answer">
                                                        <div className="qa_answer_bar" />
                                                        <p>{q.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <textarea
                                        className="qa_textarea"
                                        placeholder="Ask a question about this lesson"
                                        value={newQuestion}
                                        onChange={e => setNewQuestion(e.target.value)}
                                        rows={4}
                                    />
                                    <div className="qa_actions">
                                        <button className="ask_btn" onClick={handleAskQuestion}>Ask Question</button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'notes' && (
                                <div className="tab_content">
                                    <h4 className="notes_heading">My Notes</h4>
                                    <textarea
                                        className="notes_textarea"
                                        placeholder="Take notes for this lesson"
                                        value={noteText}
                                        onChange={e => setNoteText(e.target.value)}
                                        rows={6}
                                    />
                                    <div className="notes_actions" onClick={handleSaveNotice}>
                                        <button className="save_notes_btn" >Save Notes</button>
                                    </div>
                                    <div className="notes_notice">
                                        {saveNotice && saveNotice.map((note, index) => (
                                            <div key={note.id} className="note_item">
                                                <p className="note_content">{note.content}</p>
                                                <button className="delete_note_btn" onClick={() => deleteNote(note.id)}>Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Course_start;
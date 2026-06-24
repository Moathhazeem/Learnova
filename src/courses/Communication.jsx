import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
    Search, ChevronRight, Bell, MessageSquare as Message,
    SlidersHorizontal, CheckCircle2, Trophy, ClipboardList,
    ClipboardEdit, Upload, CalendarClock, Check, Trash2, Send, Paperclip, X
} from 'lucide-react';
import './Communication.css';

const AVATAR_DIMITRI = 'https://i.pravatar.cc/45?img=11';
const AVATAR_GEORGE = 'https://i.pravatar.cc/45?img=52';
const AVATAR_ALEX = 'https://i.pravatar.cc/45?img=47';

const messagesList = [
    {
        id: 1,
        name: 'Dimitri Abdelhak',
        avatar: AVATAR_DIMITRI,
        subject: 'Assignment review',
        preview: "I've looked at the work. The idea is ....",
        time: '10:30 AM',
        unread: true,
    },
    {
        id: 2,
        name: 'George Smith',
        avatar: AVATAR_GEORGE,
        subject: 'Course material update',
        preview: 'The fourth assignment has been uploaded ....',
        time: '2 days ago',
        unread: true,
    },
    {
        id: 3,
        name: 'Alex Johnson',
        avatar: AVATAR_ALEX,
        subject: 'Assignment grade',
        preview: 'Congratulations on scoring 98% on the late....',
        time: '3 days ago',
        unread: false,
    },
    {
        id: 4,
        name: 'Alex Johnson',
        avatar: AVATAR_ALEX,
        subject: 'Course material update',
        preview: 'The fifth assignment has been uploaded ....',
        time: '6 days ago',
        unread: false,
    },
];


const initialConversations = {
    1: [
        { id: 1, sender: 'them', text: "I've looked at the work. The idea is clear, but you have problems with contrast and visual hierarchy.", time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Could you explain further? Where exactly is the mistake?', time: '10:40 AM' },
        { id: 3, sender: 'them', text: "The title is visually weak. The color is too close to the background, and there's no clear difference between the title and the subheading. The title should be the first thing people see.", time: '10:45 AM' },
        { id: 4, sender: 'me', text: 'is there any problem with the color or font size to text ?', time: '10:48 AM' },
    ],
    2: [
        { id: 1, sender: 'them', text: 'The fourth assignment has been uploaded. Please check it out.', time: '2 days ago' },
    ],
    3: [
        { id: 1, sender: 'them', text: 'Congratulations on scoring 98% on the latest assignment!', time: '3 days ago' },
    ],
    4: [
        { id: 1, sender: 'them', text: 'The fifth assignment has been uploaded. Good luck!', time: '6 days ago' },
    ],
};

function Communication() {
    const notificationsList = [
        {
            id: 1,
            icon: <Trophy size={20} />,
            iconBg: '#fef9c3',
            iconColor: '#ca8a04',
            title: 'Achievement Unlocked',
            description: "You've completed 10 courses. Keep up the great work!",
            time: '5 hours ago',
            unread: true,
        },
        {
            id: 2,
            icon: <ClipboardList size={20} />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            title: 'Assignment Graded',
            description: 'Your Adobe illustrator Design project has been graded. Score: 95/100',
            time: '1 days ago',
            unread: true,
        },
        {
            id: 3,
            icon: <ClipboardEdit size={20} />,
            iconBg: '#fdf4ff',
            iconColor: '#9333ea',
            title: 'Assignment Due Tomorrow',
            description: 'Your logo design assignment is due tomorrow at 11:00 PM',
            time: '2 days ago',
            unread: true,
        },
        {
            id: 4,
            icon: <Upload size={20} />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            title: 'New Assignment Posted',
            description: 'Complete the Adobe logo ES6 exercises before Friday',
            time: '1 hours ago',
            unread: false,
        },
        {
            id: 5,
            icon: <CalendarClock size={20} />,
            iconBg: '#fdf4ff',
            iconColor: '#9333ea',
            title: 'Live Session Starting Soon',
            description: 'Your React Advanced Patterns session starts in 15 minutes',
            time: '30 min ago',
            unread: false,
        },
    ];
    const fileInputRef = useRef(null);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(x => x);
    const [OpenNot, setOpenNot] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [activeTab, setActiveTab] = useState('notifications');
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [notifications, setNotifications] = useState(notificationsList);
    const [messages, setMessages] = useState(messagesList);

    // Messages state
    const [selectedConvId, setSelectedConvId] = useState(1);
    const [conversations, setConversations] = useState(initialConversations);
    const [inputText, setInputText] = useState('');
    const chatMessagesRef = useRef(null);
    const [msgFilter, setMsgFilter] = useState('All');
    const [msgFiltersOpen, setMsgFiltersOpen] = useState(false);

    const selectedUser = messages.find(m => m.id === selectedConvId);
    const currentMessages = conversations[selectedConvId] || [];

    const filteredMessages = messages.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.subject.toLowerCase().includes(search.toLowerCase());
        if (!matchesSearch) return false;
        if (msgFilter === 'Unread') return m.unread;
        if (msgFilter === 'Read') return !m.unread;
        if (msgFilter === 'Teacher') return ['Dimitri Abdelhak', 'George Smith'].includes(m.name);
        if (msgFilter === 'Student') return ['Alex Johnson'].includes(m.name);
        return true;
    });

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTo({
                top: chatMessagesRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [currentMessages]);

    const filteredNotifications = notifications.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.description.toLowerCase().includes(search.toLowerCase());
        if (!matchesSearch) return false;
        if (selectedFilter === 'Unread') return n.unread;
        if (selectedFilter === 'Read') return !n.unread;
        if (selectedFilter === 'Assignments') return n.title.toLowerCase().includes('assignment');
        return true;
    });

    const unreadMessageCount = filteredMessages.filter(m => m.unread).length;
    const unreadNotificationCount = filteredNotifications.filter(n => n.unread).length;

    const handleMarkAsRead_Messages = (id) => {
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === id && msg.unread ? { ...msg, unread: false } : msg
            )
        );
    };
    const handleMarkAsRead_Notifications = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id && notification.unread ? { ...notification, unread: false } : notification
            )
        );
    };

    const handleMarkAllAsRead = () => {
        if (activeTab === 'notifications') {
            setNotifications(notifications.map(item => ({ ...item, unread: false })));
        } else if (activeTab === 'messages') {
            setMessages(messages.map(item => ({ ...item, unread: false })));
        }
    };

    const handleDeleteConversation = (idToDelete) => {
        const updatedMessages = messages.filter(m => m.id !== idToDelete);
        setMessages(updatedMessages);

        setConversations(prev => {
            const copy = { ...prev };
            delete copy[idToDelete];
            return copy;
        });

        if (updatedMessages.length > 0) {
            setSelectedConvId(updatedMessages[0].id);
        } else {
            setSelectedConvId(null);
        }
    };

    const handleSendMessage = () => {
        if (inputText.trim() === '' && attachedFiles.length === 0) return;
        const newMsg = {
            id: currentMessages.length + 1,
            sender: 'me',
            text: inputText.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            files: attachedFiles.length > 0 ? attachedFiles : undefined,
        };
        setConversations(prev => ({
            ...prev,
            [selectedConvId]: [...(prev[selectedConvId] || []), newMsg],
        }));
        setInputText('');
        setAttachedFiles([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleopenNotification = () => {
        setOpenNot(true);
    }
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = (id) => {
        setAttachedFiles(prev => prev.filter(file => file.id !== id));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type,
            previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
            rawFile: file
        }));
        setAttachedFiles(prev => [...prev, ...newFiles]);
        if (files.length > 0) {
            // Here you can handle the files
            console.log('Selected files:', files);
            // For example, you can add them to the message input
            const fileNames = files.map(f => f.name).join(', ');
            setInputText(prev => prev ? `${prev} ${fileNames}` : fileNames);
        }
    };

    const handleFileClick = (file) => {
        let url = file.previewUrl;
        if (!url && file.rawFile) {
            url = URL.createObjectURL(file.rawFile);
        }
        if (url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert(`File URL not available for "${file.name}"`);
        }
    };

    return (
        <div className="communication-page">
            <div className="comm-container">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">
                        {t('setting.home', 'Home')}
                    </Link>
                    {pathname.map((value, index) => {
                        const to = '/' + pathname.slice(0, index + 1).join('/');
                        const isLast = index === pathname.length - 1;
                        const translationKey = value.toLowerCase().replace('%20', '_').replace(' ', '_');
                        const fallbackText = decodeURIComponent(value).replace(/[_-]/g, ' ');
                        if (value.toLowerCase() === 'home') return null;
                        return (
                            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="breadcrumb-separator"><ChevronRight size={14} /></span>
                                {isLast ? (
                                    <span className="current-page">{t(`setting.${translationKey}`, fallbackText)}</span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, fallbackText)}</Link>
                                )}
                            </span>
                        );
                    })}
                </nav>

                {/* Header */}
                <div className="comm-header">
                    <h1>{t('setting.Communication_Center', 'Communication Center')}</h1>
                    <p>{t('setting.Communication_Center_description', 'Stay updated with your courses and connect with instructors')}</p>
                </div>

                {/* Tabs Row + Mark all read */}
                <div className="comm-tabs-row">
                    <div className="comm-tabs">
                        <button
                            className={`comm-tab ${activeTab === 'notifications' ? 'comm-tab--active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell size={18} />
                            <span>{t('Notifications', 'Notifications')}</span>
                            {unreadNotificationCount > 0 && (
                                <span className="comm-badge">{unreadNotificationCount}</span>
                            )}
                        </button>
                        <button
                            className={`comm-tab ${activeTab === 'messages' ? 'comm-tab--active' : ''}`}
                            onClick={() => setActiveTab('messages')}
                        >
                            <Message size={18} />
                            <span>{t('Messages', 'Messages')}</span>
                            {unreadMessageCount > 0 && (
                                <span className="comm-badge comm-badge--red">{unreadMessageCount}</span>
                            )}
                        </button>
                    </div>

                    <button className="comm-mark-all-read" onClick={handleMarkAllAsRead}>
                        <CheckCircle2 size={18} />
                        <span>Mark all read</span>
                    </button>
                </div>

                {/* Search + Filter Row */}
                <div className="comm-search-filter-row">
                    <div className="comm-search-bar">
                        <Search size={18} className="comm-search-icon" />
                        {activeTab === 'notifications' ? (
                            <input
                                type="text"
                                placeholder="Search notifications"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        ) : (
                            <input
                                type="text"
                                placeholder="Search messages"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        )}
                    </div>

                    {/* Unified Filter Dropdown */}
                    <div className="comm-filter-wrapper">
                        {activeTab === 'notifications' ? (
                            <>
                                <button className="comm-filter-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
                                    <SlidersHorizontal size={18} />
                                    <span>Filters</span>
                                </button>
                                {filtersOpen && (
                                    <div className="filtter-div">
                                        {['All', 'Unread', 'Read', 'Assignments'].map(f => (
                                            <div
                                                key={f}
                                                className={`filtter-btn ${selectedFilter === f ? 'active' : ''}`}
                                                onClick={() => { setSelectedFilter(f); setFiltersOpen(false); }}
                                            >
                                                <Check size={16} />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <button className="comm-filter-btn" onClick={() => setMsgFiltersOpen(!msgFiltersOpen)}>
                                    <SlidersHorizontal size={18} />
                                    <span>Filters</span>
                                </button>
                                {msgFiltersOpen && (
                                    <div className="filtter-div blue-dropdown">
                                        <div className="filtter-header">
                                            <SlidersHorizontal size={15} />
                                            <span>Filters</span>
                                        </div>
                                        {['All', 'read', 'Unread', 'Teachar', 'Student'].map(f => {
                                            const normalizedFilter = f === 'read' ? 'Read' : f === 'Teachar' ? 'Teacher' : f;
                                            return (
                                                <div
                                                    key={f}
                                                    className={`msg-filtter-btn ${msgFilter === normalizedFilter ? 'active' : ''}`}
                                                    onClick={() => { setMsgFilter(normalizedFilter); setMsgFiltersOpen(false); }}
                                                >
                                                    <span>{f}</span>
                                                    {msgFilter === normalizedFilter && <Check size={15} />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* ── NOTIFICATIONS TAB ── */}
                {activeTab === 'notifications' && (
                    <div className="comm-list">
                        {filteredNotifications.map(n => (
                            <div
                                key={n.id}
                                className={`comm-item ${n.unread ? 'comm-item--unread' : ''}`}
                                onClick={() => {
                                    setSelectedNotification(n);
                                    handleMarkAsRead_Notifications(n.id);
                                }}
                            >
                                <div className="comm-item-icon" style={{ backgroundColor: n.iconBg, color: n.iconColor }}>
                                    {n.icon}
                                </div>
                                <div className="comm-item-body">
                                    <div className="comm-item-title">{n.title}</div>
                                    <div className="comm-item-desc">{n.description}</div>
                                    <div className="comm-item-time">{n.time}</div>
                                </div>
                                {n.unread && <span className="comm-unread-dot" />}
                            </div>
                        ))}
                    </div>
                )}

                {/* ── NOTIFICATION MODAL (POP-UP WINDOW) ── */}
                {selectedNotification && (
                    <div className="comm-modal-overlay" onClick={() => setSelectedNotification(null)}>
                        <div className="comm-modal-content" onClick={e => e.stopPropagation()}>
                            <button className="comm-modal-close" onClick={() => setSelectedNotification(null)}>
                                <X size={20} />
                            </button>
                            <div className="comm-modal-header">
                                <div className="comm-modal-icon" style={{ backgroundColor: selectedNotification.iconBg, color: selectedNotification.iconColor }}>
                                    {selectedNotification.icon}
                                </div>
                                <div>
                                    <h2 className="comm-modal-title">{selectedNotification.title}</h2>
                                    <span className="comm-modal-time">{selectedNotification.time}</span>
                                </div>
                            </div>
                            <div className="comm-modal-body">
                                <p>{selectedNotification.description}</p>
                            </div>
                            <div className="comm-modal-footer">
                                <button className="comm-modal-btn" onClick={() => setSelectedNotification(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── MESSAGES TAB ── */}
                {activeTab === 'messages' && (
                    <div className="messages-layout">
                        {/* Left: conversation list */}
                        <div className="conv-list">
                            {filteredMessages.map(m => (
                                <div
                                    key={m.id}
                                    className={`conv-item ${selectedConvId === m.id ? 'conv-item--active' : ''} ${m.unread ? 'conv-item--unread' : ''}`}
                                    onClick={() => {
                                        setSelectedConvId(m.id);
                                        handleMarkAsRead_Messages(m.id);
                                    }}
                                >
                                    <img src={m.avatar} alt={m.name} className="conv-avatar" />
                                    <div className="conv-body">
                                        <div className="conv-top-row">
                                            <span className="conv-name">{m.name}</span>
                                            <span className="conv-time">{m.time}</span>
                                        </div>
                                        <div className="conv-subject">{m.subject}</div>
                                        <div className="conv-preview">{m.preview}</div>
                                    </div>
                                    {m.unread && <span className="comm-unread-dot" />}
                                </div>
                            ))}
                        </div>

                        {/* Right: chat panel */}
                        {selectedUser && (
                            <div className="chat-panel">
                                {/* Chat header */}
                                <div className="chat-panel-header">
                                    <div className="chat-panel-user">
                                        <img src={selectedUser.avatar} alt={selectedUser.name} className="chat-panel-avatar" />
                                        <div>
                                            <div className="chat-panel-name">{selectedUser.name}</div>
                                            <div className="chat-panel-subject">{selectedUser.subject}</div>
                                        </div>
                                    </div>
                                    <button
                                        className="chat-delete-btn"
                                        title="Delete conversation"
                                        onClick={() => handleDeleteConversation(selectedConvId)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Messages area */}
                                <div ref={chatMessagesRef} className="chat-messages">
                                    {currentMessages.map(msg => (
                                        <div key={msg.id} className={`chat-msg-row ${msg.sender === 'me' ? 'chat-msg-row--me' : 'chat-msg-row--them'}`}>
                                            {msg.sender === 'them' && (
                                                <img src={selectedUser.avatar} alt="avatar" className="chat-msg-avatar" />
                                            )}
                                            <div className="chat-msg-content">
                                                <div className={`chat-bubble ${msg.sender === 'me' ? 'chat-bubble--me' : 'chat-bubble--them'}`}>
                                                    {msg.text && <div className="chat-bubble-text">{msg.text}</div>}
                                                    {msg.files && msg.files.length > 0 && (
                                                        <div className="chat-bubble-files">
                                                            {msg.files.map(file => (
                                                                <div key={file.id} className="chat-bubble-file-card" onClick={() => handleFileClick(file)}>
                                                                    {file.previewUrl ? (
                                                                        <div className="chat-bubble-file-preview-img-wrap">
                                                                            <img src={file.previewUrl} alt={file.name} className="chat-bubble-file-img" />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="chat-bubble-file-icon">📄</div>
                                                                    )}
                                                                    <div className="chat-bubble-file-info">
                                                                        <span className="chat-bubble-file-name" title={file.name}>{file.name}</span>
                                                                        <span className="chat-bubble-file-size">{file.size}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`chat-msg-time ${msg.sender === 'me' ? 'chat-msg-time--me' : ''}`}>
                                                    {msg.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {attachedFiles.length > 0 && (
                                    <div className="attached-files-preview-container" style={{ margin: '0 16px', width: 'auto' }}>
                                        {attachedFiles.map((file) => (
                                            <div key={file.id} className="file-preview-card">
                                                {/* إذا كان الملف صورة: اعرض الصورة مصغرة */}
                                                {file.previewUrl ? (
                                                    <div className="preview-image-wrapper">
                                                        <img src={file.previewUrl} alt={file.name} className="attached-img-thumb" />
                                                    </div>
                                                ) : (
                                                    /* إذا كان ملفاً عادياً (PDF, Doc...): اعرض أيقونة مجلد أو ملف */
                                                    <div className="preview-file-icon">📄</div>
                                                )}

                                                {/* تفاصيل الملف (الاسم والحجم) */}
                                                <div className="file-preview-info">
                                                    <span className="file-preview-name" title={file.name}>{file.name}</span>
                                                    <span className="file-preview-size">{file.size}</span>
                                                </div>

                                                {/* زر (X) لحذف المرفق إذا لم يعد يريده المستخدم */}
                                                <button className="remove-file-btn" onClick={() => handleRemoveFile(file.id)}>
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Input bar */}
                                <div className="chat-input-bar">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                    <button className="chat-attach-btn" title="Attach file" onClick={triggerFileInput}>
                                        <Paperclip size={18} />
                                    </button>
                                    <input
                                        type="text"
                                        className="chat-input"
                                        placeholder="Type your message"
                                        value={inputText}
                                        onChange={e => setInputText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button className="chat-send-btn" onClick={handleSendMessage}>
                                        <Send size={16} />
                                        <span>Send</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Communication;
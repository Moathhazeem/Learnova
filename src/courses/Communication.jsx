import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
    Search, ChevronRight, Bell, MessageSquare as Message,
    SlidersHorizontal, CheckCircle2, Trophy, ClipboardList,
    ClipboardEdit, Upload, CalendarClock, Check
} from 'lucide-react';
import './Communication.css';



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
    const messagesList = [
        {
            id: 1,
            icon: <Message size={20} />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            name: 'Dimitri Abdelhak',
            title: "Assignment review",
            description: "I've looked at the work. The idea is ....",
            time: '1 days ago',
            unread: false,
        },
        {
            id: 2,
            icon: <Message size={20} />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            name: 'George Smith',
            title: "Course material update",
            description: "The fourth assignment has been uploaded ....",
            time: '2 days ago',
            unread: false,
        },
        {
            id: 3,
            icon: <Message size={20} />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            name: 'Alex Johnson',
            title: "Assignment grade",
            description: "Congratulations on scoring 98% on the late....",
            time: '3 days ago',
            unread: true,
        },
        {
            id: 4,
            icon: <Message size={20} />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            name: 'Alex Johnson',
            title: "Course material update",
            description: "The fifth assignment has been uploaded ....",
            time: '1 hour ago',
            unread: true,
        },
    ];
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(x => x);
    const [activeTab, setActiveTab] = useState('notifications');
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const [notifications, setNotifications] = useState(notificationsList);

    const filtered = notifications.filter(n => {
        // Search filter
        const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.description.toLowerCase().includes(search.toLowerCase());

        // Category filter
        if (!matchesSearch) return false;
        if (selectedFilter === 'Unread') return n.unread;
        if (selectedFilter === 'Read') return !n.unread;
        if (selectedFilter === 'Assignments') return n.title.toLowerCase().includes('assignment');
        return true;
    });

    const handleMarkAsRead = (id) => {
        setNotifications(
            notifications.map(item => item.id === id ? { ...item, unread: false } : item)
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map(item => ({ ...item, unread: false }))
        );
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
                            <span className="comm-badge">3</span>
                        </button>
                        <button
                            className={`comm-tab ${activeTab === 'messages' ? 'comm-tab--active' : ''}`}
                            onClick={() => setActiveTab('messages')}
                        >
                            <Message size={18} />
                            <span>{t('Messages', 'Messages')}</span>
                            <span className="comm-badge comm-badge--red">5</span>
                        </button>
                    </div>

                    <button className="comm-mark-all-read" onClick={handleMarkAllAsRead}>
                        <CheckCircle2 size={18} />
                        <span>Mark all read</span>
                    </button>
                </div>

                {/* Search + Filter */}
                <div className="comm-search-filter-row">
                    <div className="comm-search-bar">
                        <Search size={18} className="comm-search-icon" />
                        <input
                            type="text"
                            placeholder="Search notifications"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="comm-filter-wrapper">
                        <button className="comm-filter-btn" onClick={() => { setFiltersOpen(!filtersOpen) }}>
                            <SlidersHorizontal size={18} />
                            <span>Filters</span>
                        </button>
                        {filtersOpen && (
                            <div className="filtter-div">
                                <div className={`filtter-btn ${selectedFilter === 'All' ? 'active' : ''}`} onClick={() => { setSelectedFilter('All'); setFiltersOpen(false); }}>
                                    <Check size={16} />
                                    <span>All</span>
                                </div>
                                <div className={`filtter-btn ${selectedFilter === 'Unread' ? 'active' : ''}`} onClick={() => { setSelectedFilter('Unread'); setFiltersOpen(false); }}>
                                    <Check size={16} />
                                    <span>Unread</span>
                                </div>
                                <div className={`filtter-btn ${selectedFilter === 'Read' ? 'active' : ''}`} onClick={() => { setSelectedFilter('Read'); setFiltersOpen(false); }}>
                                    <Check size={16} />
                                    <span>Read</span>
                                </div>
                                <div className={`filtter-btn ${selectedFilter === 'Assignments' ? 'active' : ''}`} onClick={() => { setSelectedFilter('Assignments'); setFiltersOpen(false); }}>
                                    <Check size={16} />
                                    <span>Assignments</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {activeTab === "notifications" && (
                    <>
                        {/* Notification List */}
                        <div className="comm-list" >
                            {filtered.map(n => (
                                <div key={n.id} className={`comm-item ${n.unread ? 'comm-item--unread' : ''}`} onClick={() => { handleMarkAsRead(n.id) }}>
                                    <div
                                        className="comm-item-icon"
                                        style={{ backgroundColor: n.iconBg, color: n.iconColor }}
                                    >
                                        {n.icon}
                                    </div>
                                    <div className="comm-item-body" >
                                        <div className="comm-item-title">{n.title}</div>
                                        <div className="comm-item-desc">{n.description}</div>
                                        <div className="comm-item-time">{n.time}</div>
                                    </div>
                                    {n.unread && <span className="comm-unread-dot" />}
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {activeTab === "messages" && (
                    <>
                        {/* Message List */}
                        <div className="comm-list">
                            {messagesList.map(m => (
                                <div key={m.id} className={`comm-item ${m.unread ? 'comm-item--unread' : ''}`}>
                                    <div
                                        className="comm-item-icon"
                                        style={{ backgroundColor: m.iconBg, color: m.iconColor }}
                                    >
                                        {m.icon}
                                    </div>
                                    <div className="comm-item-body" >
                                        <div className="comm-item-title">{m.title}</div>
                                        <div className="comm-item-desc">{m.description}</div>
                                        <div className="comm-item-time">{m.time}</div>
                                    </div>
                                    {m.unread && <span className="comm-unread-dot" />}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Communication;
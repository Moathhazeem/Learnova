const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
router.get('/in-progress/:userId', async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            user: req.params.userId,
            isCompleted: false
        }).populate('course');
        res.status(200).json({
            success: true, data: enrollments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});
router.get('/progress/update', async (req, res) => {
    try {
        const { userId, courseId, progressPercentage, timeLeft } = req.body;
        let enrollment = await Enrollment.findOne({ user: userId, course: courseId })
        if (!enrollment) {
            enrollment = new Enrollment({
                user: userId,
                course: courseId,
                progressPercentage,
                timeLeft
            });
        } else {
            enrollment.progressPercentage = progressPercentage;
            enrollment.timeLeft = timeLeft;
            enrollment.lastAccessed = Date.now();
            if (progressPercentage >= 100) {
                enrollment.isCompleted = true;
            }
        }
        await enrollment.save();
        res.status(200).json({ success: true, message: "Progress updated successfully", data: enrollment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.get('/recommendations/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userEnrollments = await Enrollment.find({ user: userId }).populate('course');
        const watchedCourseIds = userEnrollments.map(e => e.course.title);
        const allCourses = await Course.find();
        if (watchedCoursesTitles.length === 0) {
            const defaultCourses = allCourses.slice(0, 4);
            return res.status(200).json({ success: true, data: defaultCourses });
        }

        const watchedIdsStr = userEnrollments.map(e => e.course._id.toString());
        const availableCourses = allCourses.filter(c => !watchedIdsStr.includes(c._id.toString()));

        if (availableCourses.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }
        // 3. تجهيز البرومت (Prompt) الموجه لـ Gemini
        const prompt = `
            You are an AI recommendation system for an e-learning platform named Learnova.
            The user has watched/is currently studying these courses: ${JSON.stringify(watchedCoursesTitles)}.
            
            Here is the list of available courses they haven't taken yet:
            ${JSON.stringify(availableCourses.map(c => ({ id: c._id, title: c.title, category: c.category, tags: c.tags })))}

            Task: Select the best 4 courses from the available courses that match the user's interests based on what they watched.
            Output format: Return ONLY a valid JSON array containing ONLY the MongoDB course IDs (_id) of the selected 4 courses. Example: ["id1", "id2", "id3", "id4"]. Do not include markdown code blocks or extra text.
            `;

        // 4. استدعاء نموذج Gemini (مثل gemini-2.5-flash)
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const responseText = response.text.trim();

        // تنظيف النص في حال أضاف النموذج علامات Markdown
        const cleanJsonText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const recommendedIds = JSON.parse(cleanJsonText);
        const recommendedCourses = await Course.find({ _id: { $in: recommendedIds } });
        res.status(200).json({
            success: true,
            message: "AI-login recommendations fetched successfully",
            data: recommendedCourses
        });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        // نظام احتياطي (Fallback): في حال حدث خطأ مع الـ API، نرجع كورسات عشوائية لكي لا تتوقف الواجهة
        const fallbackCourses = await Course.find().limit(4);
        res.status(200).json({
            success: true,
            message: "Fallback recommendations due to AI error",
            data: fallbackCourses
        });
    }
});

module.exports = router;
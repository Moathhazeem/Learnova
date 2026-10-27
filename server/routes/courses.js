const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const upload = require('../middleware/upload')
// Course Catalog
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.delete('/:id', courseController.deleteCourse);
// Enrollments & Progress
router.post('/enroll', courseController.enrollCourse);
router.get('/in-progress/:userId', courseController.getInProgressCourses);
router.post('/progress/update', courseController.updateProgress);

// AI Recommendations
router.get('/recommendations/:userId', courseController.getRecommendations);

module.exports = router;
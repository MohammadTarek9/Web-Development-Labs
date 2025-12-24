const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    instructor: req.body.instructor,
    price: req.body.price,
    category: req.body.category,
    enrolledStudents: req.body.enrolledStudents || 0
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.instructor = req.body.instructor || course.instructor;
    course.price = req.body.price || course.price;
    course.category = req.body.category || course.category;
    course.enrolledStudents = req.body.enrolledStudents || course.enrolledStudents;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

/*
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Intro to Web Development",
    "description": "Learn HTML, CSS, and JavaScript basics",
    "instructor": "John Doe",
    "price": 99.99,
    "category": "Web Development",
    "enrolledStudents": 0
  }'

curl http://localhost:3000/courses

curl http://localhost:3000/courses/693020533b17c341cf4b2cbf


curl -X PUT http://localhost:3000/courses/693020533b17c341cf4b2cbf \
  -H "Content-Type: application/json" \
  -d '{
    "price": 149.99,
    "enrolledStudents": 25
  }'


curl -X DELETE http://localhost:3000/courses/693020533b17c341cf4b2cbf
*/
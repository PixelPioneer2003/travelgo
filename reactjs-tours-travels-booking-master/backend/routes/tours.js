const express = require('express');
const tourControllers = require('../Controllers/tourControllers.js');
const verifyToken = require('../utils/verifyToken.js');

const { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } = tourControllers;
const { verifyAdmin } = verifyToken;

const router = express.Router();

// Create new tour 
router.post('/', verifyAdmin, createTour);

// Update tour 
router.put('/:id', verifyAdmin, updateTour);

// Delete tour 
router.delete('/:id', verifyAdmin, deleteTour);

// Get single tour 
router.get('/:id', getSingleTour);

// Get all tour 
router.get('/', getAllTour);

// Get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getReviews,
  addReview,
  likeReview,
} = require('../controllers/reviewController');

router.get('/:companyId', getReviews);
router.post('/', addReview);
router.put('/:id/like', likeReview);

module.exports = router;

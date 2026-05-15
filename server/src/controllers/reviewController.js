const Review = require('../models/Review');
const Company = require('../models/Company');

const getReviews = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { sort = 'date' } = req.query;
    
    let sortObj = { createdAt: -1 };
    if (sort === 'date') sortObj = { createdAt: -1 };
    else if (sort === 'rating') sortObj = { rating: -1 };
    else if (sort === 'relevance') sortObj = { likes: -1 };

    const reviews = await Review.find({ companyId }).sort(sortObj);

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { companyId, fullName, subject, reviewText, rating } = req.body;
    if (!companyId || !fullName || !rating)
      return res.status(400).json({ success: false, message: 'companyId, fullName, and rating are required' });

    const review = await Review.create({
      companyId,
      fullName,
      subject: subject || '',
      reviewText: reviewText || '',
      rating: Number(rating),
    });

    // Recalculate company average rating
    const reviews = await Review.find({ companyId });
    let total = 0;
    reviews.forEach((r) => (total += r.rating));
    const avg = reviews.length > 0 ? Math.round((total / reviews.length) * 10) / 10 : 0;
    
    await Company.findByIdAndUpdate(companyId, {
      averageRating: avg,
      reviewCount: reviews.length,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review)
      return res.status(404).json({ success: false, message: 'Review not found' });
      
    review.likes = (review.likes || 0) + 1;
    await review.save();
    
    res.json({ success: true, data: { likes: review.likes } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getReviews, addReview, likeReview };

const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompany,
  addCompany,
  updateCompany,
} = require('../controllers/companyController');

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', addCompany);
router.put('/:id', updateCompany);

module.exports = router;

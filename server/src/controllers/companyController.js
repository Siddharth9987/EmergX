const Company = require('../models/Company');

const getCompanies = async (req, res) => {
  try {
    const { search, city, sort = 'name' } = req.query;
    
    // Build filter query
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (city && city !== 'all') {
      filter.city = { $regex: new RegExp(`^${city}$`, 'i') };
    }

    // Build sort object
    let sortObj = { name: 1 };
    if (sort === 'name') sortObj = { name: 1 };
    else if (sort === 'rating') sortObj = { averageRating: -1 };
    else if (sort === 'date') sortObj = { createdAt: -1 };

    const companies = await Company.find(filter).sort(sortObj);
    res.json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company)
      return res.status(404).json({ success: false, message: 'Company not found' });
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addCompany = async (req, res) => {
  try {
    const { name, location, foundedOn, city } = req.body;
    if (!name)
      return res.status(400).json({ success: false, message: 'Company name is required' });

    const newCompany = await Company.create({
      name,
      location: location || '',
      foundedOn: foundedOn || '',
      city: city || '',
    });
    
    res.status(201).json({ success: true, data: newCompany });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!company)
      return res.status(404).json({ success: false, message: 'Company not found' });
      
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCompanies, getCompany, addCompany, updateCompany };

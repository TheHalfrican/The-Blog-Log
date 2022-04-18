const router = require('express').Router();
const { Blog , User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all product and JOIN with user data
    const blogData = await Blog.findAll({});

    // Serialize data so the template can read it
    const blog = blogData.map((blog) => blog.get({ plain: true }));

    let backgroundpic = "pages"
    if (req.session.logged_in) {
      backgroundpic = "main"
    }

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blog,
      logged_in: req.session.logged_in,
      blog_title: req.session.blog_title,
      layout: backgroundpic
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
      });
  
      const blogs = blogData.get({ plain: true });
  
      res.render('blogs', {
        ...blogs,
        blog_title: req.session.blog_title,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        name: req.session.name,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  router.get('*', (req, res) => {
    res.render('404');
  });
  
  module.exports = router;
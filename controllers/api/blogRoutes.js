const router = require("express").Router();
const { Blog } = require("../../models");


router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
    });

    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

      
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with that id!' });

      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // update product
  router.put("/:id", (req, res) => {
    // update product data
    Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      // .then((product) => {
      //   // find all associated tags from ProductTag
      //   return ProductTag.findAll({ where: { product_id: req.params.id } });
      // })
      // .then((productTags) => {
      //   // get list of current tag_ids
      //   const productTagIds = productTags.map(({ tag_id }) => tag_id);
      //   // create filtered list of new tag_ids
      //   const newProductTags = req.body.tagIds
      //     .filter((tag_id) => !productTagIds.includes(tag_id))
      //     .map((tag_id) => {
      //       return {
      //         product_id: req.params.id,
      //         tag_id,
      //       };
      //     });
      //   // figure out which ones to remove
      //   const productTagsToRemove = productTags
      //     .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      //     .map(({ id }) => id);
  
      //   // run both actions
      //   return Promise.all([
      //     ProductTag.destroy({ where: { id: productTagsToRemove } }),
      //     ProductTag.bulkCreate(newProductTags),
      //   ]);
      // })
      // .then((updatedProductTags) => res.json(updatedProductTags))
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
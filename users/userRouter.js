const express = 'express';
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router();
router.use((req, res, next) => {
    console.log('User Router!');
    next();
  });


router.post('/', [validateUser], (req, res) => {

});

router.post('/:id/posts', [ validateUserId , validatePost ], (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', [ validateUserId ], (req, res) => {

});

router.get('/:id/posts', [ validateUserId ],(req, res) => {

});

router.delete('/:id', [ validateUserId ], (req, res) => {

});

router.put('/:id', [ validateUserId ], (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.findById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user ID"});
        
        // error handling middleware option:
        // next({ message: "Invalid id; hub not found"});
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error processing request',
      });
    });
};





function validateUser(req, res, next) {
    const User = req.body;
    if (User && Object.keys(User).length > 0) {
        next();
      } else if (!User.name ){
        res.status(400).json({ message: 'missing required name field' });
      }
      else {
        res.status(400).json({ message: "missing user data" });
      
        // error handling middleware option:
        // next({ message: "Please include request body" }));
      }
    };
      

function validatePost(req, res, next) {
    const Post = req.body;
    if (Post && Object.keys(Post).length > 0) {
        next();
      } else if (!Post.text ){
        res.status(400).json({ message: 'missing required text field' });
      }
      else {
        res.status(400).json({ message: "missing post data" });
      
        // error handling middleware option:
        // next({ message: "Please include request body" }));
      }
    
};

module.exports = router;

const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router()
router.use((req, res, next) => {
    console.log('User Router!');
    next();
  });


router.post('/', [validateUser], (req, res) => {
    const newUser = req.body
    Users.insert(newUser)
    .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: 'There was an error while saving the user to the database',
        });
      });
});

router.post('/:id/posts', [ validateUserId , validatePost ], (req, res) => {
    const Post = { ...req.body, user_id: req.params.id };

    Posts.insert(Post)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the post for the user',
      });
    });
});

router.get('/', (req, res) => {
    Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The users could not be retrieved.',
      });
    });
});

router.get('/:id', [ validateUserId ], (req, res) => {
    const id = req.params.id;
    Users.getById(id)
       .then(user => {
           res.status(200).json(user);
       })
       .catch(error => {
         // log error to database
         console.log(error);
         res.status(500).json({
           error: '"This users information could not be retrieved."',
         });
       });
});

router.get('/:id/posts', [ validateUserId],(req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the posts of this user',
      });
    });
});

router.delete('/:id', [ validateUserId ], (req, res) => {
    Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'This user has been removed' });
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing this user',
      });
    });
});

router.put('/:id', [ validateUserId, validateUser ], (req, res) => {
    Users.update(req.params.id, req.body)
    .then(count => {
        if (count === 1) {
          res.status(200).json({ message: 'This user has been updated' });
        } else {
          res.status(404).json({ message: 'This user was not found' });
        }
      })
      .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error updating the user',
        });
      });
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.getById(id)
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

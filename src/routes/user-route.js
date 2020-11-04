const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/userController.js');
router.post('/register-user', async(req, res)=>{
    await registerUser(req.body, 'user', res);
});
router.post('/register-admin', async(req, res)=>{
    await registerUser(req.body, 'admin', res);
});

router.post('/register-super-admin', async(req, res)=>{
    await registerUser(req.body, 'superadmin', res);
});

router.post('/login-user', async(req, res)=>{
   await loginUser(req.body, 'user', res);
});

router.post('/login-admin', async(req, res)=>{
    await loginUser(req.body, 'admin', res);
});

router.post('/login-super-admin', async(req, res)=>{
    await loginUser(req.body, 'superadmin', res);
});

router.post('/user-protected', async(req, res)=>{

});

router.post('/admin-protected', async(req, res)=>{

});

router.post('/super-admin-protected', async(req, res)=>{

});

router.get('/profile', async(req, res)=>{


});



module.exports = router;
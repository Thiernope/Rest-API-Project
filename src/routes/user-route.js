const express = require('express');
const router = express.Router();
const {registerUser, loginUser, userAuth, serializeUser,roleCheck } = require('../controllers/userController.js');
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

router.post('/user-protected', roleCheck(['users']),async(req, res)=>{

});

router.post('/admin-protected', userAuth, roleCheck(['admin']), async(req, res)=>{

});

router.post('/super-admin-protected', userAuth, roleCheck(['superadmin']), async(req, res)=>{

});

router.get('/users/profile', userAuth, async(req, res)=>{
return res.json(serializeUser(req.user));
});



module.exports = router;
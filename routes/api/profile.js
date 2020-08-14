const express = require('express');
const router = express.Router();


// @route  GET api/users/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) => {
    res.json({
        msg: "profile endpoint works",
        status: 200
    })
})

module.exports = router;
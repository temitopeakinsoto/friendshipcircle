const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        msg: "Test endpoint works",
        status: 200
    })
})


module.exports = router;
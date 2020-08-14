const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        msg: "Post endpoint works",
        status: 200
    })
})

module.exports = router;
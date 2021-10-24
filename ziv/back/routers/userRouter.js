const express = require('express');
const router = express.Router();
router.use(express.json());

router.post('/',(request,response)=>{
    const username= request.headers;
    return response.send(username.username)
})


module.exports = router
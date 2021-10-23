const express = require('express');
const router = express.Router();
router.use(express.json());

router.post('/',(request,response)=>{
    const body= request.body;
    return response.send(body.username)
})


module.exports = router
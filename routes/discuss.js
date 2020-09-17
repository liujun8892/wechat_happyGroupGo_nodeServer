var express = require('express');
var router = express.Router();
let {addDiscussService} = require('../service/discuss')

// 获取店铺详情
router.get('/addDiscuss', (req,res,next)=>{
    console.log('addDiscuss....')
    addDiscussService(req,res).then(()=>{
    })
});


module.exports = router;

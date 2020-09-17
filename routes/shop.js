var express = require('express');
var router = express.Router();
let {getShopDetailService} = require('../service/shop')

// 获取店铺详情
router.get('/getShopDetail', (req,res,next)=>{
    console.log('getShopDetail....')
    getShopDetailService(req,res).then(()=>{
    })
});


module.exports = router;

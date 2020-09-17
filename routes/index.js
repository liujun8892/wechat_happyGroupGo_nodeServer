var express = require('express');
var router = express.Router();
let {getTypeService,getShopListService} = require('../service/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next()
});

// 获取首页类型列表
router.get('/getType', (req,res,next)=>{
  getTypeService(req,res).then(()=>{
  })
});

// 获取首页商铺列表
router.get('/getShopList', (req,res,next)=>{
  console.log('getShopList...')
  getShopListService(req,res).then(()=>{
  })
});

module.exports = router;

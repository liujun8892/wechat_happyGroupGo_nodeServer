var express = require('express');
var router = express.Router();
let {addOrder,getOrderListService,getOrderDetailService,updateOrderStatusService} = require('../service/order')

// 添加订单
router.get('/addOrder', (req,res,next)=>{
    console.log('addOrder....')
    addOrder(req,res).then(()=>{
    })
});

// 获取订单列表
router.get('/getOrderList', (req,res,next)=>{
    console.log('getOrderListService....')
    getOrderListService(req,res).then(()=>{
    })
});

// 获取订单列表
router.get('/getOrderDetail', (req,res,next)=>{
    console.log('getOrderDetailService....')
    getOrderDetailService(req,res).then(()=>{
    })
});

// 改变订单状态  --- 0 未支付 1 已支付  2 已完成(评论完后)
router.get('/updateOrderStatus', (req,res,next)=>{
    console.log('updateOrderStatus....')
    updateOrderStatusService(req,res).then(()=>{
    })
});


module.exports = router;

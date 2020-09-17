let Database = require('../dao/mysql_connect')
let db = new Database()

// 添加评论服务
async function addDiscussService(req, res) {
    let query = req.query
    if (!(query.orderId&&query.type&&query.createTime&&query.content&&query.uid&&query.star&&query.client)) return res.send({code:400,msg:'传入参数不完整'})
    let result = {}
    // 查询订单
    result.orderRes = await db.getOrderById(query.orderId)
    let goodsId = result.orderRes[0].goods_id
    // `查询商品详情`
    if (query.type==='1'){
        // 查询团购信息
        result.orderDetail = await db.getGroupItemById(goodsId)
    }else if (query.type==='2') {
        // 查询优惠券信息
        result.orderDetail = await db.getCouponDetail(goodsId)
    }else {
        // 电影信息
    }
    let shopId = result.orderDetail[0].shop
    // 添加评论
    result.discussRes = await db.addDiscuss(shopId,query.createTime,query.content,query.star,query.uid)
    // 更新店铺的评论信息
    result.shopInfo = await db.updateShopDiscuss(query.star,query.client,shopId)
    // 更改订单状态
    result.orderStatus = await db.updateOrderStatus(2,query.orderId)
    console.log(result)
    res.send({code:200,msg:'评论成功!'})
}

module.exports = {
    addDiscussService,
}
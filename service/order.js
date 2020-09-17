let Database = require('../dao/mysql_connect')
let db = new Database()

// 添加订单服务
async function addOrder(req, res) {
    let query = req.query
    if (!query) return res.send({code:400,msg:'传入参数不完整'})
    let params = [query.goods_id,query.user_id,query.goods_num,query.create_time,query.order_number,query.state,query.type,query.order_price]
    // 添加订单
    let  result = await db.addOrder(params)
    if(query.type==='1'){
        // 团购销售数量增加
        let res = await db.groupAmountAdd(query.goods_num,query.goods_id)
        console.log(res)
    }else if(query.type==='2') {
        // 优惠券数量添加
        let res = await db.couponAmountAdd(query.goods_num,query.goods_id)
        console.log(res)
    }
    res.send(result)
}

// 获取美食团购、优惠券、电影的订单列表
async function getOrderListService(req, res) {
    let query = req.query
    if (!query) return res.send({code:400,msg:'传入参数不完整'})
    // 获取订单列表
    let resultList = await db.getOrderList(query.userId)
    let resultPayCompleteList = await db.getOrderPayComplete(query.userId)
    resultList.push(...resultPayCompleteList)
    // 封装返回结果
    let result = {}
    // 美食团购,优惠券订单
    result.group = []
    // 电影订单
    result.movie = []
    resultList.forEach(item => {
        if (item.type<3){
            result.group.push(item)
        }else {
            result.movie.push(item)
        }
    })
    res.send(result)
}

// 查询某个订单详情
async function getOrderDetailService(req, res) {
    let query = req.query
    if (!(query.id&&query.type)) return res.send({code:400,msg:'传入参数不完整'})
    // 获取订单详情
    let resultData = await db.getOrderItem(query.id,query.type)
    // 封装返回结果
    let result = {}
    result.order = resultData[0]
    let goodsId = result.order.goods_id
    // 详情
    if (result.order.type===1){
        // 团购详情
        let groupRes = await db.getGroupDetail(goodsId)
        result.details = groupRes
    }else if (result.order.type===2){
        // 优惠券详情
        let couponRes = await db.getCouponDetail(goodsId)
        result.details = couponRes
    }
    console.log(result)
    res.send(result)
}

// 改变订单状态
async function updateOrderStatusService(req, res) {
    let query = req.query
    if (!(query.state&&query.orderId)) return res.send({code:400,msg:'传入参数不完整'})
    // 获取订单详情
    let resultData = await db.updateOrderStatus(query.state,query.orderId)
    let result ={}
    if (resultData.affectedRows===1){
        result = {code:200,msg:'订单状态更新成功'}
    }else {
        result = {code:500,msg:'订单状态更新失败'}
    }
    res.send(result)
}


module.exports = {
    addOrder,
    getOrderListService,
    getOrderDetailService,
    updateOrderStatusService
}
let Database = require('../dao/mysql_connect')
let db = new Database()

// 获得商铺详情服务
async function getShopDetailService(req, res) {
    let id = req.query.id
    if (!id) return res.send({code:400,msg:'传入参数不完整'})
    let result = {}
    result.info = (await db.getShopDetailById(id))[0]
    result.groupBuy = await db.getShopGroupBuyById(id)
    result.bannerList = await db.getShopBannerById(id)
    result.foodMenu = await db.getShopFoodMenuById(id)
    result.commentList = await db.getShopCommentById(id)
    console.log(result)
    res.send(result)
}

module.exports = {
    getShopDetailService,
}
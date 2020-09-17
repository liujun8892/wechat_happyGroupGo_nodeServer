let Database = require('../dao/mysql_connect')
let db = new Database()

// 获得类型服务
async function getTypeService(req, res) {
    if (!req.query.pid) return res.send({code:400,msg:'传入参数不完整'})
    let result = await db.getType(req.query.pid)
    res.send(result)
}

// 获得商店列表服务
async function getShopListService(req, res) {
    if (!req.query._id) return res.send({code:400,msg:'传入参数不完整'})
    if (req.query._id==='0'){
        // 获取的是默认的推荐商铺列表
        // 查询一级美食分类
        let result = await db.getType('1')
        // 查询二级美食分类
        let pids = []
        result.forEach(item=>pids.push(item._id))
        let resultSecond = await db.getTypeByPids(pids)
        // 封装二级美食分类的ids
        let ids = []
        resultSecond.forEach(item=>ids.push(item._id))
        // 查询商铺视图
        let shopList = await db.getShopList(ids)
        res.send(shopList)
    }else {
        // 获取的是用户选择的美食分类商品列表
        let result = await db.getTypeByPids(req.query._id)
        // 封装美食分类的ids
        let ids = []
        result.forEach(item=>ids.push(item._id))
        // 查询商铺视图
        let shopList = await db.getShopList(ids)
        res.send(shopList)
    }
}

module.exports = {
    getTypeService,
    getShopListService
}
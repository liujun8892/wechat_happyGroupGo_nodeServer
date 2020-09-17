let Database = require('../dao/mysql_connect')
let db = new Database()

// 获得电影和影院列表服务
async function getMovieCinemaList(req, res) {
    let result = {}
    // 获取最热的10条电影
    result.movie = await db.getMovieList()
    // 获取影院列表
    result.cinema = await db.getCinemaList()
    res.send(result)
}

// 获取电影详情服务
async function getMovieDetailService(req, res) {
    if(!req.query.id) return res.send({code:400,msg:'输入的参数不完整!'})
    let result = {}
    // 根据id获取电影
    result.movieInfo = (await db.getMovieById(req.query.id))[0]
    // 根据id获取电影详情
    result.cinemaInfo = await db.getMovieDetail(req.query.id)
    res.send(result)
}

// 获取影院详情服务
async function getCinemaDetailService(req, res) {
    if(!req.query.id) return res.send({code:400,msg:'输入的参数不完整!'})
    let result = {}
    // 根据id获取影院信息
    result.cinemaInfo = (await db.getCinemaById(req.query.id))[0]
    // 根据id获取电影详情
    result.movieInfo = await db.getCinemaDetail(req.query.id)
    res.send(result)
}

module.exports = {
    getMovieCinemaList,
    getMovieDetailService,
    getCinemaDetailService
}
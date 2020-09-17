let express = require('express')
let router = express.Router()
let http =require('https')
let Database = require('../dao/mysql_connect')

router.get('/',(req,res,next)=>{
    let appid = 'wx695592169176a095'
    let secret = '71ec37b510319979116f98b22f42dc50'
    let js_code = req.query.code
    // console.log(js_code)
    let grant_type = 'authorization_code'

    let http_request = {
        host: 'api.weixin.qq.com',
        path: '/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+js_code+'&grant_type='+grant_type
    }

    // 请求微信登录
    let req2 = http.request(http_request,(res1 => {
        res1.setEncoding('utf8')
        res1.on('data',(chunk => {
            // 储存微信返回的用户信息
            new Database().userLogin(req,res,chunk)
        }))
    }))

    req2.on('error',(err => {
        console.log(err)}))

    req2.write('data\n')
    req2.end()
})

module.exports = router


var express = require('express');
var router = express.Router();
// var Database = require("./mysql_connect");
var WXPay = require("weixin-pay");//npm install weixin-pay
var fs = require("fs");
    var wxpay = WXPay({
        appid: 'wxee55836134168e35a',//小程序appid
        mch_id: '14264644611',//商户号
        partner_key: 'Ori543454Jha5sijqIp03343a13453ll1a', //微信商户平台API密钥
        pfx: fs.readFileSync('./apiclient_cert.p12') //微信商户平台证书 公众平台小程序 下载
    });

/* GET home page. */
router.get('/', function(req, res, next) {
    // new Database().pay(req,res);
    wxpay.getBrandWCPayRequestParams({
        openid: req.query.openid,//用户openid 应该在小程序端传输过来 req.query.XX ....
        body: '公众号支付测试',//介绍 如:汉堡
        detail: '公众号支付测试',//详细 如:麦当劳XXXXXX汉堡...
        out_trade_no: '20150331'+Math.random().toString().substr(2, 10),//订单号 必须每次都不一样
        total_fee: req.query.total_money,//金额 分为单位
        spbill_create_ip: '192.168.2.210',//客户端ip 通过方法获取
        notify_url: 'https://geekori.com/node1/back'//异步通知地址
    }, function(err, result){
        // in express
        //res.render('wxpay/jsapi', { payargs:result })
        if(err){
            console.log(err);
        }
        else
        res.send(result);//返回下单需要的信息
    });
})
router.use('/back',wxpay.useWXCallback(function(msg,req, res, next){
    res.success();
}))
module.exports = router;

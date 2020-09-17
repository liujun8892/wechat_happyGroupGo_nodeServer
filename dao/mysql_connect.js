const mysql = require('mysql')
const config = require('../config/db.json')

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
            port: config.db.port,
            charset: config.db.charset,
            timezone: config.db.timezone,
            multipleStatement: config.db.multipleStatement
        })
    }

    // 首页
    // 根据父id获取美食分类
    getType(pid){
        if (!pid) return
        let sql = 'SELECT * FROM m_type WHERE pid = ?'
        let val = [pid]
        return this.query(this.connection,sql,val)
    }

    // 根据父id数组获取美食分类
    getTypeByPids(pids){
        if (!pids) return
        let sql = 'SELECT * FROM m_type WHERE pid in (?)'
        let val = [pids]
        return this.query(this.connection,sql,val)
    }

    // 美团店铺列表
    getShopList(_ids){
        if (!_ids) return
        let sql = 'SELECT * FROM v_shop_info WHERE TYPE IN (?) ORDER BY client_num DESC LIMIT 0,15'
        let val = [_ids]
        return this.query(this.connection,sql,val)
    }

    // 店铺详情页
    // 根据id获取美团店铺详情
    getShopDetailById(id){
        if (!id) return
        let sql = 'SELECT * FROM v_shop_info WHERE _id=?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 根据id获取美团店铺团购活动
    getShopGroupBuyById(id){
        if (!id) return
        let sql = 'SELECT * FROM m_group_buy WHERE shop =?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 根据id获取美团店铺轮播图片地址
    getShopBannerById(id){
        if (!id) return
        let sql = 'SELECT * FROM m_shop_images WHERE shop =?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 根据id获取美团店铺推荐菜单
    getShopFoodMenuById(id){
        if (!id) return
        let sql = 'SELECT * FROM m_food WHERE shop = ? LIMIT 0,20'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 根据id获取美团店铺的评论
    getShopCommentById(id){
        if (!id) return
        let sql = 'SELECT * FROM v_disscuss WHERE shop_id = ? LIMIT 0,20'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 添加订单
    addOrder(params){
        if (!params) return
        let sql = 'INSERT INTO m_order (goods_id,user_id,goods_num,create_time\n' +
            ',order_number,state,type,order_price) values (?)'
        let val = [params]
        return this.query(this.connection,sql,val)
    }

    // 团购销售数量添加
    groupAmountAdd(count,id){
        if (!(count&&id)) return
        let sql = 'UPDATE m_group_buy SET sell_num = sell_num + ? WHERE _id =?'
        let val = [count,id]
        return this.query(this.connection,sql,val)
    }

    // 优惠券销售量添加
    couponAmountAdd(count,id){
        if (!(count||id)) return
        let sql = 'UPDATE m_coupon SET sell_num = sell_num + ? WHERE _id =?'
        let val = [count,id]
        return this.query(this.connection,sql,val)
    }

    // 获取美食团购、优惠券、电影的订单列表
    getOrderList(userId){
        if (!(userId)) return
        let sql = 'SELECT * FROM v_order WHERE user_id=? AND state<2 ORDER BY state, create_time DESC'
        let val = [userId]
        return this.query(this.connection,sql,val)
    }

    // 获取美食团购、优惠券、电影的订单列表
    getOrderPayComplete(userId){
        if (!(userId)) return
        let sql = 'SELECT * FROM v_order WHERE user_id=? AND state=2 ORDER BY  create_time DESC'
        let val = [userId]
        return this.query(this.connection,sql,val)
    }

    // 查询某个订单视图
    getOrderItem(orderId,orderType){
        if (!(orderId&&orderType)) return
        let sql = 'SELECT * FROM v_order WHERE _id=? AND TYPE=?'
        let val = [orderId,orderType]
        return this.query(this.connection,sql,val)
    }

    // 查询团购详情
    getGroupDetail(goodsId){
        if (!(goodsId)) return
        let sql = 'SELECT * FROM v_group_details WHERE group_id=?'
        let val = [goodsId]
        return this.query(this.connection,sql,val)
    }

    // 查询优惠券详情
    getCouponDetail(goodsId){
        if (!(goodsId)) return
        let sql = 'SELECT * FROM m_coupon WHERE _id=?'
        let val = [goodsId]
        return this.query(this.connection,sql,val)
    }

    // 改变订单状态
    updateOrderStatus(state,orderId){
        if (!(state&&orderId)) return
        let sql = 'UPDATE m_order SET state=? WHERE _id=?'
        let val = [state,orderId]
        return this.query(this.connection,sql,val)
    }

    // 根据订单id查询订单
    getOrderById(orderId){
        if (!(orderId)) return
        let sql = 'SELECT * FROM m_order WHERE _id=?'
        let val = [orderId]
        return this.query(this.connection,sql,val)
    }

    // 根据id查询某个团购商品
    getGroupItemById(id){
        if (!(id)) return
        let sql = 'SELECT * FROM m_group_buy WHERE _id=?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 添加评论
    addDiscuss(shopId,createTime,content,star,uid){
        if (!(shopId&&createTime&&content&&star&&uid)) return
        let sql = 'INSERT INTO m_disscuss (shop_id,create_time,content,star,uid) VALUES (?,?,?,?,?)'
        let val = [shopId,createTime,content,star,uid]
        return this.query(this.connection,sql,val)
    }

    // 更改店铺的评价信息
    updateShopDiscuss(starNum,clientNum,id){
        if (!(starNum&&clientNum&&id)) return
        let sql = 'UPDATE m_shop SET star_num=star_num+?,client_num=client_num+? WHERE _id= ?'
        let val = [starNum,clientNum,id]
        return this.query(this.connection,sql,val)
    }

    // 查询电影列表
    getMovieList(){
        let sql = 'SELECT * FROM m_movie ORDER BY people DESC LIMIT 0,10'
        return this.query(this.connection,sql)
    }

    // 查询影院列表
    getCinemaList(){
        let sql = 'SELECT * FROM m_cinema'
        return this.query(this.connection,sql)
    }

    // 查询某个电影
    getMovieById(id){
        if (!(id)) return
        let sql = 'SELECT * FROM m_movie WHERE _id=?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 查询某个电影详情
    getMovieDetail(id){
        if (!(id)) return
        let sql = 'SELECT * FROM v_movie_cinema WHERE MID=?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 获取某个影院信息
    getCinemaById(id) {
        if (!(id)) return
        let sql = 'SELECT * FROM m_cinema WHERE _id= ?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 查询某个电影院详情
    getCinemaDetail(id){
        if (!(id)) return
        let sql = 'SELECT * FROM v_movie_cinema WHERE cid=?'
        let val = [id]
        return this.query(this.connection,sql,val)
    }

    // 用户登录/注册
    userLogin(req,res,info){
        var info = eval('('+info+')')
        console.log(info)
        let unionid = info.unionid?info.unionid:info.openid
        this.connection.query('select * from m_users where unionid =?',[unionid],(err,result)=>{
            if (result.length>0){
                // 登录
                console.log('select.....')
                console.log(result)
                info._id = result[0]._id
                res.send(info)
            }else {
                // 注册
                this.connection.query('insert into m_users set ?',{unionid:unionid,create_time:this.getCurrentFormatDate(),head:req.query.head,nick_name:req.query.nickname},(err,result)=>{
                    if (err){
                        console.log(err)
                    }else {
                        console.log('insert...')
                        console.log(result)
                        info._id = result.insertId
                        res.send(info)
                    }
                })
            }
        })
    }

    // 封装定义promise查询对象
    query(conn,sql,params =[]){
        if (!conn) return
        return new Promise((resolve,reject)=>{
            conn.query(sql,params,(err,res)=>{
                if (err){
                    console.log(err)
                    reject(err)
                }else {
                    resolve(res)
                }
            })
        })

    }

    // 获得当前格式化时间
    getCurrentFormatDate(){
        let date = new Date()
        let month = date.getMonth()+1
        if (month<10){
            month = '0'+month
        }
        let day = date.getDate()
        if (day<10){
            day = '0'+day
        }
        let hours = date.getHours()
        if (hours<10){
            hours = '0'+day
        }
        let minutes = date.getMinutes()
        if (minutes<10){
            minutes = '0'+minutes
        }
        let seconds = date.getSeconds()
        if (seconds<10){
            seconds = '0'+seconds
        }
        return date.getFullYear()+'_'+month+'_'+day+' '+hours+":"+minutes+':'+seconds
    }
}

module.exports = Database
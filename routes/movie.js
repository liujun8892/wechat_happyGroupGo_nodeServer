var express = require('express');
var router = express.Router();
let {getMovieCinemaList,getMovieDetailService,getCinemaDetailService} = require('../service/movie')

// 获得电影和影院列表服务
router.get('/getMovieCinemaList', (req,res,next)=>{
    console.log('getMovieCinemaList....')
    getMovieCinemaList(req,res).then(()=>{
    })
});

// 获得电影和影院列表服务
router.get('/getMovieDetail', (req,res,next)=>{
    console.log('getMovieCinemaList....')
    getMovieDetailService(req,res).then(()=>{
    })
});

// 获得电影和影院列表服务
router.get('/getCinemaDetail', (req,res,next)=>{
    console.log('getMovieCinemaList....')
    getCinemaDetailService(req,res).then(()=>{
    })
});

module.exports = router;

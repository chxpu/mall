var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

// 监听数据库mongoDB连接状态
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

// 查询商品列表
router.get("/list",function (req,res,next) {
  //获取前端提交的参数
  let page = parseInt(req.param("page"));
  let pageSieze = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page-1)*pageSieze;
  let params = {};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=99;break;
      case '1':priceGt = 100;priceLte=499;break;
      case '2':priceGt = 500;priceLte=999;break;
      case '3':priceGt = 1000;priceLte=1999;break;
      case '4':priceGt = 2000;priceLte=4999;break;
    }
    params = {
      // 设置价格区间参数salePrice: priceGt - priceLte
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }
  // skip()跳过几条数据;limit()取几条数据
  let goodsModel = Goods.find(params).skip(skip).limit(pageSieze);
  //sort 1生序
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else {
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});

// 加入购物车，向服务器提交数据一般用post较安全，
router.post("/addCart", function (req, res, next) {
  var userId = '100000077';
  var productId = req.body.productId;
  var User = require('./../models/user');
  // 通过User模型执行MongoDB查询api
  User.findOne({userId: userId}, function (err,userDoc) {
    if(err) {
      res.json({
        status:1,
        msg: err.message
      })
    }
    else {
      console.log("userDoc: "+userDoc);
      if(userDoc){
        let goodsItem = '';
        userDoc.cartList.forEach(function (item) {
          if(item.productId == productId){
            goodsItem = item;
            item.productNum ++;
          }

        });
        if(goodsItem){
          userDoc.save(function (err2, doc2) {
            if(err2) {
              res.json({
                status:1,
                msg: err2.message
              })
            }
            else {
              res.json({
                status:0,
                msg:'successMSG',
                result:'success!'
              })
            }
          })
        }
        else{
          //商品不存在
          Goods.findOne({productId:productId}, function (err1, doc) {
            if(err1) {
              res.json({
                status:1,
                msg: err1.message
              })
            }
            else {
              if(doc){
                doc.productNum = 1;
                doc.checked = 1;
                // 将查询到的商品文档加入到用户文档的购物车列表中
                userDoc.cartList.push(doc);
                userDoc.save(function (err2, doc2) {
                  if(err2) {
                    res.json({
                      status:1,
                      msg: err2.message
                    })
                  }
                  else {
                    res.json({
                      status:0,
                      msg:'successMSG',
                      result:'success!'
                    })
                  }
                })
              }
            }
          });
        }
      }
    }
  })
});

module.exports = router;

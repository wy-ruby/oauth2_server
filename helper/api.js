'use strict';

var request = require('request');
var crypto = require('crypto');

/*
 * 登陆访问接口
 */
exports.userLogin = function(tel, pass) {
    var req_data = {'mobile': tel, 'password': pass};
    var private_key = "GjcfbhCIJ2owQP1Kxn64DqSk5X4YRZ7u";
    var vercy = JSON.stringify(req_data) + private_key;
    console.log(vercy)
    var md5sum = crypto.createHash('md5');
    md5sum.update(vercy);
    var sign_data = md5sum.digest('hex');
    console.log(sign_data);
    var options = {
        url: 'http://test.poly.ourjujia.com/api/v1/login',
        method: 'POST',
        json: true,
        timeout: 30000,
        body: {
          sign: sign_data,
          data: JSON.stringify(req_data)
        }
    };
    request(options, function (err, res, body) {
      if (!err && res.statusCode == 200)
        console.log(body)
    });
};

/**
 * 获取家庭列表接口
 * user_id # 用户ID
 * ticket # session登录验证
 * family_id #家庭ID
 */
exports.familyUserQueryFamilies = function(user_id, ticket) {
  var req_data = {'user_id': user_id, 'ticket': ticket};
  var private_key = "GjcfbhCIJ2owQP1Kxn64DqSk5X4YRZ7u";
  var vercy = JSON.stringify(req_data) + private_key;
  var md5sum = crypto.createHash('md5');
  md5sum.update(vercy);
  var sign_data = md5sum.digest('hex');
  var options = {
      url: 'http://test.poly.ourjujia.com/api/v1/family_user_queryfamilies',
      method: 'POST',
      json: true,
      timeout: 30000,
      body: {
        sign: sign_data,
        data: JSON.stringify(req_data)
      }
  };
  request(options, function (err, res, body) {
    if (!err && res.statusCode == 200){
        for (family in body.data.familis) {
          console.log(family)
        }
    }  
  });
};
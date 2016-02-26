'use strict'
const request = require('co-request');
const assert = require('assert');

var opentm_ids = {}
/**
* {access_token, template_id, to_user_openid, url, data: {}}
*/
function send(params) {
  // 1. check params
  ["access_token", "template_id", "to_user_openid", "url", "data"].forEach(function (key) {
    assert(params[key], key + ' is must required.');
  });

  return doSend(params.access_token, params.to_user_openid, params.template_id, params.url, params.data);
}

function checkOpenTmId(opentm_id) {
  return opentm_id.indexOf('OPENTM') === 0 || opentm_id.indexOf('TM') === 0;
}

function doSend(access_token, touser, template_id, url, data) {
  return request({
    uri: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token,
    method: 'POST',
    json: {
      touser: touser,
      template_id: template_id,
      url: url,
      data: data
    }
  }).then(function (res) {
    var body = res.body;
    if (body.errcode) {
      var error = new Error(body.errmsg);
      error.name = 'WechatAPIError';
      error.code = body.errcode;
      throw error;
    }
    return body;
  });
}

/**
* get template_id use opentm_id
*/
function addTemplate(opentm_id, access_token) {
  // check opentm_id
  assert(checkOpenTmId(params.opentm_id), 'opentm_id must start with "OPENTM" or "TM"');

  return request({
    uri: 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=' + access_token,
    method: 'POST',
    json: {
      template_id_short: opentm_id
    }
  }).then(function (res) {
    var body = res.body;
    if (body.errcode) {
      var error = new Error(body.errmsg);
      error.name = 'WechatAPIError';
      error.code = body.errcode;
      throw error;
    }
    return body.template_id;
  });
}

function delTemplate(access_token, template_id) {
  return request({
    uri: 'https://api.weixin.qq.com/cgi-bin/template/del_private_template?access_token=' + access_token,
    method: 'POST',
    json: {
      template_id: template_id
    }
  }).then(function (res) {
      var body = res.body;
      if (body.errcode) {
        var error = new Error(body.errmsg);
        error.name = 'WechatAPIError';
        error.code = body.errcode;
        throw error;
      }
      return body;
    })
}

function listTemplate(access_token) {
  return request('https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=' + access_token)
    .then(function (res) {
      var body = JSON.parse(res.body);
      if (body.errcode) {
        var error = new Error(body.errmsg);
        error.name = 'WechatAPIError';
        error.code = body.errcode;
        throw error;
      }
      return body.template_list;
    })
}

module.exports = {
  send: send,
  add: addTemplate,
  list: listTemplate,
  delete: delTemplate
}

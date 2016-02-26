# wechat-access-token
send, add, list and delete wechat template message

# Install
`npm install wechat-template-msg`

# Usage

## Promise
```
var wxtm = require("wechat-template-msg");

wxtm.send({
  access_token: 'access_token',
  template_id: 'ngqIpbwh8bUfcSsECmogfXcV14J0tQlEpBO27izEYtY',
  to_user_openid: 'OPENID',
  url: 'http://weixin.qq.com/download',
  data: {
    "first": {
       "value":"恭喜你购买成功！",
       "color":"#173177"
     },
     "keynote1":{
         "value":"巧克力",
         "color":"#173177"
     },
     "keynote2": {
         "value":"39.8元",
         "color":"#173177"
     },
     "keynote3": {
         "value":"2014年9月22日",
         "color":"#173177"
     },
     "remark":{
         "value":"欢迎再次购买！",
         "color":"#173177"
     }
  }
}).then(console.log);

wxtm.add('OPENTM217772013', 'access_token').then(console.log);

wxtm.list('access_token').then(console.log);

wxtm.delete(access_token, template_id).then(console.log);

```
## yield

```
var wxtm = require("wechat-template-msg");

var rs = yield wxtm.send({
  access_token: 'access_token',
  template_id: 'ngqIpbwh8bUfcSsECmogfXcV14J0tQlEpBO27izEYtY',
  to_user_openid: 'OPENID',
  url: 'http://weixin.qq.com/download',
  data: {
    "first": {
       "value":"恭喜你购买成功！",
       "color":"#173177"
     },
     "keynote1":{
         "value":"巧克力",
         "color":"#173177"
     },
     "keynote2": {
         "value":"39.8元",
         "color":"#173177"
     },
     "keynote3": {
         "value":"2014年9月22日",
         "color":"#173177"
     },
     "remark":{
         "value":"欢迎再次购买！",
         "color":"#173177"
     }
  }
});
console.log('rs: ', rs);

var addrs = yield wxtm.add('OPENTM217772013', 'access_token');
console.log('addrs: ', addrs);

var listrs = yield wxtm.list('access_token');
console.log('listrs: ', listrs);

var delrs = yield wxtm.delete(access_token, template_id);
console.log('delrs: ', delrs);
```

[see more on wechat official doc](http://mp.weixin.qq.com/wiki/5/6dde9eaa909f83354e0094dc3ad99e05.html)

var Koa = require('koa');
var Router = require('koa-router');
var fs = require('fs');

// var app = require('koa')();
// var router = require('koa-router')();

var app = new Koa();
var router = new Router();

// var bodyParser = require('koa-bodyparser');
// app.use(bodyParser());

var koaBody = require('koa-body')();
// app.use(koaBody());

// app.use(ctx => {
//   ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
// });

//test
// router.get('/', (ctx, next) => {
//     ctx.body = 'hello koa!'
//     console.log(ctx.router)
// })

// User infos
const userList = require('./user/info.js')
router.get('/api/userinfo/:username/:password', (ctx, next) => {
    const params = ctx.params
    const paramsUsername = params.username
    const paramsPassword = params.password

    const user = userList.data.filter(item => {
        if(item.username == paramsUsername && item.password == paramsPassword) {
            return item
        }
    })
    ctx.body = user[0]
})

// register user
router.post('/api/registerUser/', koaBody, (ctx, next) => {
    console.log('user registration')
    // console.log(userList)
    // console.log('ctx request body', ctx.request.body)
    const newUserId = userList.data[userList.data.length -1].id + 1
    const newUser = {
        id: newUserId,
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
    userList.data.push(newUser)

    const newContents = 'module.exports = ' + JSON.stringify(userList)
    // console.log(newContents)
    fs.writeFile('./mock/user/info.js', newContents, function(err) {
        // console.log()
    })

    ctx.body = {
        errno: 0,
        msg: 'ok'
    }
})

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);

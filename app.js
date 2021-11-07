// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
// 載入 express-handlebars
const exphbs = require('express-handlebars')
// 載入 Todo model
const Todo = require('./models/todo')
// 載入 mongoose
const mongoose = require('mongoose')
// 引用路由器
const routes = require('./routes')
// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 取得資料庫連線狀態
const db = mongoose.connection
// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
//樣板引擎指定為 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 設定首頁路由
// 將 request 導入路由器
app.use(routes)
// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

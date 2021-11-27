// 載入 express 並建構應用程式伺服器
const express = require('express')
// 載入 express-handlebars
const exphbs = require('express-handlebars')
// 載入 Todo model
const Todo = require('./models/todo')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
const { prototype } = require('express-handlebars/lib/express-handlebars')
const PORT = process.env.PORT || 3000
const app = express()
require('./config/mongoose')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
//樣板引擎指定為 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 設定首頁路由 將 request 導入路由器
app.use(routes)
// 設定 port 3000
app.listen(prototype, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

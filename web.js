const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.set('view engine', 'handlebars')

app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/'
}));

app.get('/', function (req, res) {
    res.render('main', {layout : 'index'})
});

app.use(express.static('public'));

function web(){
    app.listen(3000, ()=>{console.log("Server is Ready!")});
};

module.exports = web;
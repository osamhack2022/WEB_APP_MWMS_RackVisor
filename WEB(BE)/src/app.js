const express = require("express");
const path = require("path");
const session = require("express-session");
const { sequelize } = require("sequelize");
const morgan = require("morgan");

//라우터 import

const app = express();

app.set('port', process.env.PORT || 8003);

sequelize.sync({force: flase})
    .then(()=> {
        console.log("DB connected");
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    //todo add session settings
}));

//라우터 연결

//404 Error
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), ()=> {
    console.log('port', app.get('port'), ' connected');
});
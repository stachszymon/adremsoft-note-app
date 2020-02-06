require('dotenv').config();
const
    createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    sassMiddleware = require('node-sass-middleware'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    { connection } = mongoose,
    app = express();

const PORT = process.env.port || 3000;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
    .then(res => console.log('Connected to database'))
    .catch(err => console.warn(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
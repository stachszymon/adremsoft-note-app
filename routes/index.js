const router = require('express').Router();

const notesRoutes = require('./note.routes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/note', notesRoutes);

module.exports = router;
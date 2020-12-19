var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Partidas = require('../models/partidas');

router.use(bodyParser.json());


/* GET users listing. */
router.route('/')
.get(async (req, res, next) => {

  try{
    const partidas = await Partidas.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(partidas);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
    
})
.post((req, res, next) => {
  
  Partidas.create(req.body)
  .then((partida) => {
      console.log('Partida criado ', partida);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partida);
  }, (err) => next(err))
  .catch((err) => next(err));

})

router.route('/:id')
.get(async (req, res, next) => {
  let err;
  res.setHeader('Content-Type', 'application/json');
  try{
    const resp = await Partidas.findById(req.params.id).populate('time_A').populate('time_B');
    if(resp != null){
      res.statusCode = 200;
      res.json(resp);
    }else{
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  
  }catch(errParam){
    console.log(errParam);
    res.statusCode = 404;
    res.json({});
  }  

})
.delete((req, res, next) => {
  
  Partidas.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));


})
.put((req, res, next) => {
  
    Partidas.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((partida) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partida);
  }, (err) => next(err))
  .catch((err) => next(err));

})


module.exports = router;

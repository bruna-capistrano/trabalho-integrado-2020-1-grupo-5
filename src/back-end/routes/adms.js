var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Adms = require('../models/adms');

router.use(bodyParser.json());


/* GET users listing. */
router.route('/')
.get(async (req, res, next) => {

  try{
    const adms = await Adms.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(adms);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
    
})
.post((req, res, next) => {
  
  Adms.create(req.body)
  .then((adm) => {
      console.log('Adm criado ', adm);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(adm);
  }, (err) => next(err))
  .catch((err) => next(err));

})

router.route('/:id')
.get(async (req, res, next) => {
  let err;
  res.setHeader('Content-Type', 'application/json');
  try{
    const resp = await Adms.findById(req.params.id);
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
  
  Adms.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));


})
.put((req, res, next) => {
  
    Adms.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((adm) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(adm);
  }, (err) => next(err))
  .catch((err) => next(err));

})


module.exports = router;

var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  dbConn.query('SELECT ol_id,date_format(ol_fecha_inicio_labores, "%d-%m-%Y") as ol_fecha_inicio_labores,date_format(ol_fecha_inicio_convocatoria, "%d-%m-%Y") as ol_fecha_inicio_convocatoria,date_format(ol_fecha_fin_convocatoria, "%d-%m-%Y") as ol_fecha_fin_convocatoria,ol_titulo,ol_descripcion,ol_horario,ol_salario,ol_estado,e.ep_razon_social FROM oferta_laboral ol, empresas e WHERE e.ep_id=ol.ol_ep_id   ', function (err, rows) {

    if (err) {
      req.flash('error', err);
      res.render('index', { data: '' });
    } else {
      res.render('index', { data: rows });
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login',function(req,res,next){
  email=req.body.email;
  password=req.body.password;
  //console.log(email);
  dbConn.query("SELECT * FROM usuario WHERE us_correo='"+email+"' AND us_password='"+password+"'",function(err,rows){
    if(err) {
        req.flash('error', err);  
        console.log(err);
    } else {
        console.log(rows);
        if(rows.length){
          req.session.idu=rows[0]["id"];
          req.session.user=rows[0]["fullname"];
          req.session.admin=true;      
          res.redirect("/admin");
        }else{
          //req.flash('success', 'El usuario no existe'); 
          res.redirect("/");
        }
    }
  });
});

router.get('/admin', function(req, res, next) {
  if(req.session.admin){
    res.render('admin/index');
  }else{
    res.redirect("/login");
  }
});

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;

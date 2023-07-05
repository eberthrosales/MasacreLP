var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.get('/usuario', function(req, res, next) {

    dbConn.query('SELECT * FROM usuario ',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            
            res.render('admin/usuario-list',{data:''});   
        } else {
            
            res.render('admin/usuario-list',{data:rows});
        }
    });


    
  });
  // Cambiar a añadir usuario
router.get('/usuario-add', function (req, res, next) {
    res.render('admin/usuario-add');
  })
  // Añadir usuario
  router.post('/usuario-add', function (req, res, next) {
  
   
    let dni = req.body.dni;
    let correo = req.body.correo;
    let celular = req.body.celular;
    let direccion = req.body.direccion;
    let rol = req.body.rol;
    let usuario = req.body.usuario;
    let password = req.body.password;
  
    var form_data = {
    
      us_dni_ruc: dni,
      us_correo: correo,
      us_celular: celular,
      us_rol: rol,
      us_usuario: usuario,
      us_password: password
    }

    console.log(form_data);
  
    dbConn.query('INSERT INTO usuario SET ?', form_data, function (err, result) {
      if (err) {
        req.flash('error', err)
      } else {
        req.flash('success', 'Usuario agregado con exito');
        res.redirect('../admin/usuario');
      }
    })
  })

  // Editar Usuario
router.get('/usuario-edit/(:id)', function (req, res, next) {
    let id = req.params.id;
    dbConn.query('SELECT * FROM usuario WHERE us_id = ' + id, function (err, rows, fields) {
      if (err) throw err
      // if user not found
      if (rows.length <= 0) {
        req.flash('error', 'No se encontro el registro con el us_id = ' + id)
        res.redirect('/usuario')
      }
      // if book found
      else {
        // render to edit.ejs
        res.render('admin/usuario-edit', {
          id: rows[0].us_id,
          dni: rows[0].us_dni_ruc,
          correo: rows[0].us_correo,
          celular: rows[0].us_celular,
          rol: rows[0].us_rol,
          usuario: rows[0].us_usuario,
          password: rows[0].us_password
        })
      }
    })
  })
  // Actualizar usuario
  router.post('/usuario-edit/:id', function (req, res, next) {
    let id = req.params.id;
    let dni = req.body.dni;
    let correo = req.body.correo;
    let celular = req.body.celular;
    let rol = req.body.rol;
    let usuario = req.body.usuario;
    let password = req.body.password;
  
    var form_data = {
      us_dni_ruc: dni,
      us_correo: correo,
      us_celular: celular,
      us_rol: rol,
      us_usuario: usuario,
      us_password: password
    }
    // update query
    dbConn.query('UPDATE usuario SET ? WHERE us_id = ' + id, form_data, function (err, result) {
      if (err) {
        req.flash('error', err)
      } else {
        req.flash('success', 'Usuario editado con exito');
        res.redirect('../../admin/usuario');
      }
    })
  })

  // Eliminar usuario
router.get('/usuario-del/(:id)', function (req, res, next) {
    let id = req.params.id;
    dbConn.query('DELETE FROM usuario WHERE us_id = ' + id, function (err, result) {
      if (err) {
        req.flash('error', err)
        res.redirect('/usuario')
      } else {
        req.flash('success', 'Usuario eliminado con exito ID = ' + id)
        res.redirect('../usuario')
      }
    })
  })



//egresados

  router.get('/egresados', function(req, res, next) {

    dbConn.query('SELECT * FROM egresados ',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            
            res.render('admin/egresados-list',{data:''});   
        } else {
            
            res.render('admin/egresados-list',{data:rows});
        }
    });


    
  });
    // Cambiar a añadir egresados
router.get('/egresados-add', function (req, res, next) {
    res.render('admin/egresados-add');
  })
  // Añadir egresados
  router.post('/egresados-add', function (req, res, next) {
  
   
    let nombre = req.body.nombre;
    let paterno = req.body.paterno;
    let materno = req.body.materno;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let genero = req.body.genero;
    let carrera = req.body.carrera;
  
    var form_data = {
    
      eg_nombre: nombre,
      eg_paterno: paterno,
      eg_materno: materno,
      eg_fecha_nacimiento: fecha_nacimiento,
      eg_genero: genero,
      eg_carrera: carrera
    }
    console.log(form_data);

    dbConn.query('INSERT INTO egresados SET ?', form_data, function (err, result) {
      if (err) {
        req.flash('error', err)
      } else {
        req.flash('success', 'Egresado agregado con exito');
        res.redirect('../admin/egresados');
      }
    })
  })

// Editar Egresados
router.get('/egresados-edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('SELECT * FROM egresados WHERE eg_id = ' + id, function (err, rows, fields) {
    if (err) throw err
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'No se encontro el registro con el eg_id = ' + id)
      res.redirect('/egresados')
    }
    // if book found
    else {
      // render to edit.ejs
      res.render('admin/egresados-edit', {
        id: rows[0].eg_id,
        nombre: rows[0].eg_nombre,
        paterno: rows[0].eg_paterno,
        materno: rows[0].eg_materno,
        fecha_nacimiento: rows[0].eg_fecha_nacimiento,
        genero: rows[0].eg_genero,
        carrera: rows[0].eg_carrera
      })
    }
  })
})
// Actualizar egresados
router.post('/egresados-edit/:id', function (req, res, next) {
  let id = req.params.id;
  let nombre = req.body.nombre;
  let paterno = req.body.paterno;
  let materno = req.body.materno;
  let fecha_nacimiento = req.body.fecha_nacimiento;
  let genero = req.body.genero;
  let carrera = req.body.carrera;

  var form_data = {
    eg_nombre: nombre,
    eg_paterno: paterno,
    eg_materno: materno,
    eg_fecha_nacimiento: fecha_nacimiento,
    eg_genero: genero,
    eg_carrera: carrera
  }
  // update query
  dbConn.query('UPDATE egresados SET ? WHERE eg_id = ' + id, form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'Egresado editado con exito');
      res.redirect('../../admin/egresados');
    }
  })
})

// Eliminar egresado
router.get('/egresdos-del/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('DELETE FROM egresados WHERE eg_id = ' + id, function (err, result) {
    if (err) {
      req.flash('error', err) 
      res.redirect('/egresados')
    } else {
      req.flash('success', 'Egresados eliminado con exito ID = ' + id)
      res.redirect('../egresados')
    }
  })
})


//docente

router.get('/docente', function(req, res, next) {

  dbConn.query('SELECT * FROM docente ',function(err,rows)     {

      if(err) {
          req.flash('error', err);
          
          res.render('admin/docente-list',{data:''});   
      } else {
          
          res.render('admin/docente-list',{data:rows});
      }
  });


  
});
  // Cambiar a añadir docentes
router.get('/docente-add', function (req, res, next) {
  res.render('admin/docente-add');
})
// Añadir docentes
router.post('/docente-add', function (req, res, next) {

 
  let nombres = req.body.nombres;
  let paterno = req.body.paterno;
  let materno = req.body.materno;
  let fecha_nacimiento = req.body.fecha_nacimiento;
  let genero = req.body.genero;
  let carrera = req.body.carrera;
  let nivel_instruccion = req.body.nivel_instruccion;
  let experiencia_laboral = req.body.experiencia_laboral;

  var form_data = {
  
    dc_nombres: nombres,
    dc_paterno: paterno,
    dc_materno: materno,
    dc_fecha_nacimiento: fecha_nacimiento,
    dc_genero: genero,
    dc_carrera: carrera,
    dc_nivel_instruccion: nivel_instruccion,
    dc_experiencia_laboral: experiencia_laboral
  }
  console.log(form_data);

  dbConn.query('INSERT INTO docente SET ?', form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'Docente agregado con exito');
      res.redirect('../admin/docente');
    }
  })
})

// Editar Docentes
router.get('/docente-edit/(:id)', function (req, res, next) {
let id = req.params.id;
dbConn.query('SELECT * FROM docente WHERE dc_id = ' + id, function (err, rows, fields) {
  if (err) throw err
  // if user not found
  if (rows.length <= 0) {
    req.flash('error', 'No se encontro el registro con el dc_id = ' + id)
    res.redirect('/docente')
  }
  // if book found
  else {
    // render to edit.ejs
    res.render('admin/docente-edit', {
      id: rows[0].dc_id,
      nombres: rows[0].dc_nombres,
      paterno: rows[0].dc_paterno,
      materno: rows[0].dc_materno,
      fecha_nacimiento: rows[0].dc_fecha_nacimiento,
      genero: rows[0].dc_genero,
      carrera: rows[0].dc_carrera,
      nivel_instruccion: rows[0].dc_nivel_instruccion,
      experiencia_laboral: rows[0].dc_experiencia_laboral
    })
  }
})
})
// Actualizar docentes
router.post('/docente-edit/:id', function (req, res, next) {
let id = req.params.id;
let nombres = req.body.nombres;
let paterno = req.body.paterno;
let materno = req.body.materno;
let fecha_nacimiento = req.body.fecha_nacimiento;
let genero = req.body.genero;
let carrera = req.body.carrera;
let nivel_instruccion = req.body.nivel_instruccion;
let experiencia_laboral = req.body.experiencia_laboral;

var form_data = {
  eg_nombres: nombres,
  eg_paterno: paterno,
  eg_materno: materno,
  eg_fecha_nacimiento: fecha_nacimiento,
  eg_genero: genero,
  eg_carrera: carrera,
  dc_nivel_instruccion: nivel_instruccion,
  dc_experiencia_laboral: experiencia_laboral
}

// update query
dbConn.query('UPDATE docente SET ? WHERE dc_id = ' + id, form_data, function (err, result) {
  if (err) {
    req.flash('error', err)
  } else {
    req.flash('success', 'Docente editado con exito');
    res.redirect('../../admin/docente');
    }
  })
})

// Eliminar docente
router.get('/docente-del/(:id)', function (req, res, next) {
let id = req.params.id;
dbConn.query('DELETE FROM docente WHERE dc_id = ' + id, function (err, result) {
  if (err) {
    req.flash('error', err)
    res.redirect('docente')
  } else {
    req.flash('success', 'Docente eliminado con exito ID = ' + id)
    res.redirect('../docente')
    }
  })
})

//empresas

router.get('/empresa', function(req, res, next) {

  dbConn.query('SELECT * FROM empresas ',function(err,rows)     {

      if(err) {
          req.flash('error', err);
          
          res.render('admin/empresas-list',{data:''});   
      } else {
          
          res.render('admin/empresas-list',{data:rows});
      }
  });


  
});
// Cambiar a añadir empresas
router.get('/empresas-add', function (req, res, next) {
  res.render('admin/empresas-add');
})
// Añadir empresas
router.post('/empresas-add', function (req, res, next) {

 
  let razon_social = req.body.razon_social;
  let rubro = req.body.rubro;
  let direccion = req.body.direccion;
  let fecha_creacion = req.body.fecha_creacion;


  var form_data = {
  
    ep_razon_social: razon_social,
    ep_rubro: rubro,
    ep_direccion: direccion,
    ep_fecha_creacion: fecha_creacion
  }

  dbConn.query('INSERT INTO empresa SET ?', form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'Empresa agregada con exito');
      res.redirect('../admin/empresas');
    }
  })
})

// Editar Empresa
router.get('/empresas-edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('SELECT * FROM empresas WHERE ep_id = ' + id, function (err, rows, fields) {
    if (err) throw err
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'No se encontro el registro con el ep_id = ' + id)
      res.redirect('/empresas')
    }
    // if book found
    else {
      // render to edit.ejs
      res.render('admin/empresas-edit', {
        id: rows[0].ep_id,
        razon_social: rows[0].ep_razon_social,
        rubro: rows[0].ep_rubro,
        direccion: rows[0].ep_direccion,
        fecha_creacion: rows[0].ep_fecha_creacion
      })
    }
  })
})
// Actualizar empresas
router.post('/empresas-edit/:id', function (req, res, next) {
  let id = req.params.id;
  let razon_social = req.body.razon_social;
  let rubro = req.body.rubro;
  let direccion = req.body.direccion;
  let fecha_creacion = req.body.fecha_creacion;

  var form_data = {
    ep_razon_social: razon_social,
    ep_rubro: rubro,
    ep_direccion: direccion,
    ep_fecha_creacion: fecha_creacion
  }
  // update query
  dbConn.query('UPDATE empresa SET ? WHERE ep_id = ' + id, form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'Empresa editada con exito');
      res.redirect('../../admin/empresas');
    }
  })
})

// Eliminar empresa
router.get('/empresas-del/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('DELETE FROM empresa WHERE ep_id = ' + id, function (err, result) {
    if (err) {
      req.flash('error', err)
      res.redirect('/empresas')
    } else {
      req.flash('success', 'Empresa eliminada con exito ID = ' + id)
      res.redirect('../empresa')
    }
  })
})


//instucion

router.get('/institucion', function(req, res, next) {

  dbConn.query('SELECT * FROM institucion ',function(err,rows)     {

      if(err) {
          req.flash('error', err);
          
          res.render('admin/institucion-list',{data:''});   
      } else {
          
          res.render('admin/institucion-list',{data:rows});
      }
  });


  
});
// Cambiar a añadiinstitucion
router.get('/institucion-add', function (req, res, next) {
  res.render('admin/institucion-add');
})
// Añadir institucion
router.post('/institucion-add', function (req, res, next) {

 
  let razon_social = req.body.razon_social;
  let rubro = req.body.rubro;
  let direccion = req.body.direccion;
  let fecha_creacion = req.body.fecha_creacion;
  let numero_egresados = req.body.numero_egresados;
  let cantidad_carreras = req.body.cantidad_carreras;


  var form_data = {
  
    ins_razon_social: razon_social,
    ins_rubro: rubro,
    ins_direccion: direccion,
    ins_fecha_creacion: fecha_creacion,
    ins_numero_egresados: numero_egresados,
    ins_cantidad_carreras: cantidad_carreras
  }

  dbConn.query('INSERT INTO institucion SET ?', form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'institucion agregado con exito');
      res.redirect('../admin/institucion');
    }
  })
})

// Editar institucion
router.get('/institucion-edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('SELECT * FROM institucion WHERE ins_id = ' + id, function (err, rows, fields) {
    if (err) throw err
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'No se encontro el registro con el ins_id = ' + id)
      res.redirect('/institucion')
    }
    // if book found
    else {
      // render to edit.ejs
      res.render('admin/institucion-edit', {
        id: rows[0].ins_id,
        razon_social: rows[0].ins_razon_social,
        rubro: rows[0].ins_rubro,
        direccion: rows[0].ins_direccion,
        fecha_creacion: rows[0].ins_fecha_creacion,
        numero_egresados: rows[0].ins_numero_egresados,
        cantidad_carreras: rows[0].ins_cantidad_carreras
      })
    }
  })
})
// Actualizar institucion
router.post('/institucion-edit/:id', function (req, res, next) {
  let id = req.params.id;
  let razon_social = req.body.razon_social;
  let rubro = req.body.rubro;
  let direccion = req.body.direccion;
  let fecha_creacion = req.body.fecha_creacion;
  let numero_egresados = req.body.numero_egresados;
  let cantidad_carreras = req.body.cantidad_carreras;

  var form_data = {
    ins_razon_social: razon_social,
    ins_rubro: rubro,
    ins_direccion: direccion,
    ins_fecha_creacion: fecha_creacion,
    ins_numero_egresados: numero_egresados,
    ins_cantidad_carreras: cantidad_carreras
  }
  // update query
  dbConn.query('UPDATE institucion SET ? WHERE ins_id = ' + id, form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'Institucion editado con exito');
      res.redirect('../../admin/institucion');
    }
  })
})

// Eliminar institucion
router.get('/institucion-del/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('DELETE FROM institucion WHERE ins_id = ' + id, function (err, result) {
    if (err) {
      req.flash('error', err)
      res.redirect('/institucion')
    } else {
      req.flash('success', 'Institucion eliminado con exito ID = ' + id)
      res.redirect('../institucion')
    }
  })
})

//oferta 

router.get('/oferta_laboral', function(req, res, next) {

  dbConn.query('SELECT * FROM oferta_laboral ',function(err,rows)     {

      if(err) {
          req.flash('error', err);
          
          res.render('admin/oferta-list',{data:''});   
      } else {
          
          res.render('admin/oferta-list',{data:rows});
      }
  });


  
});
// Cambiar a añadiroferta
router.get('/oferta-add', function (req, res, next) {
  res.render('admin/oferta-add');
})
// Añadir oferta
router.post('/oferta-add', function (req, res, next) {

 
  let fecha_inicio_labores = req.body.fecha_inicio_labores;
  let fecha_inicio_convocatoria = req.body.fecha_inicio_convocatoria;
  let fecha_fin_convocatoria = req.body.fecha_fin_convocatoria;
  let titulo = req.body.titulo;
  let descripcion = req.body.descripcion;
  let horario = req.body.horario;
  let salario = req.body.salario;
  let estado = req.body.estado;

  var form_data = {
  
    ol_fecha_inicio_labores: fecha_inicio_labores,
    ol_fecha_inicio_convocatoria: fecha_inicio_convocatoria,
    ol_fecha_fin_convocatoria: fecha_fin_convocatoria,
    ol_titulo: titulo,
    ol_descripcion: descripcion,
    ol_horario: horario,
    ol_salario: salario,
    ol_estado: estado
  }

  dbConn.query('INSERT INTO oferta_laboral SET ?', form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'oferta_laboral agregado con exito');
      res.redirect('../admin/oferta_laboral');
    }
  })
})

// Editar oferta
router.get('/oferta-edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('SELECT * FROM oferta_laboral WHERE ol_id = ' + id, function (err, rows, fields) {
    if (err) throw err
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'No se encontro el registro con el ol_id = ' + id)
      res.redirect('/oferta_laboral')
    }
    // if book found
    else {
      // render to edit.ejs
      res.render('admin/oferta-edit', {
        id: rows[0].ol_id,
        fecha_inicio_labores: rows[0].ol_fecha_inicio_labores,
        fecha_inicio_convocatoria: rows[0].ol_fecha_inicio_convocatoria,
        fecha_fin_convocatoria: rows[0].ol_fecha_fin_convocatoria,
        titulo: rows[0].ol_titulo,
        descripcion: rows[0].ol_descripcion,
        horario: rows[0].ol_horario,
        salario: rows[0].ol_salario,
        estado: rows[0].ol_estado
      })
    }
  })
})
// Actualizar oferta
router.post('/oferta-edit/:id', function (req, res, next) {
  let id = req.params.id;
  let fecha_inicio_labores = req.body.fecha_inicio_labores;
  let fecha_inicio_convocatoria = req.body.fecha_inicio_convocatoria;
  let fecha_fin_convocatoria = req.body.fecha_fin_convocatoria;
  let titulo = req.body.titulo;
  let descripcion = req.body.descripcion;
  let horario = req.body.horario;
  let salario = req.body.salario;
  let estado = req.body.estado;

  var form_data = {
    ol_fecha_inicio_labores: fecha_inicio_labores,
    ol_fecha_inicio_convocatoria: fecha_inicio_convocatoria,
    ol_fecha_fin_convocatoria: fecha_fin_convocatoria,
    ol_titulo: titulo,
    ol_descripcion: descripcion,
    ol_horario: horario,
    ol_salario: salario,
    ol_estado: estado
  }
  // update query
  dbConn.query('UPDATE oferta_laboral SET ? WHERE ol_id = ' + id, form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'oferta editado con exito');
      res.redirect('../../admin/oferta_laboral');
    }
  })
})

// Eliminar oferta
router.get('/oferta-del/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('DELETE FROM oferta_laboral WHERE ol_id = ' + id, function (err, result) {
    if (err) {
      req.flash('error', err)
      res.redirect('/oferta_laboral')
    } else {
      req.flash('success', 'oferta_laboral eliminado con exito ID = ' + id)
      res.redirect('../oferta_laboral')
    }
  })
})

//postulacion

router.get('/postulacion', function(req, res, next) {

  dbConn.query('SELECT * FROM postulacion ',function(err,rows)     {

      if(err) {
          req.flash('error', err);
          
          res.render('admin/postulacion-list',{data:''});   
      } else {
          
          res.render('admin/postulacion-list',{data:rows});
      }
  });


  
});
// Cambiar a añadir postulacion
router.get('/postulacion-add', function (req, res, next) {
  res.render('admin/postulacion-add');
})
// Añadir postulacion
router.post('/postulacion-add', function (req, res, next) {

 
  let eg_id = req.body.eg_id;
  let ol_id = req.body.ol_id;
  let ganador = req.body.ganador;
  let puntaje = req.body.puntaje;

  var form_data = {
  
    pc_eg_id: eg_id,
    pc_ol_id: ol_id,
    pc_ganador: ganador,
    pc_puntaje: puntaje
  }

  dbConn.query('INSERT INTO postulacion SET ?', form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'Postulacion agregado con exito');
      res.redirect('../admin/posstulacion');
    }
  })
})

// Editar postulacion
router.get('/postulacion-edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('SELECT * FROM postulacion WHERE pc_id = ' + id, function (err, rows, fields) {
    if (err) throw err
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'No se encontro el registro con el pc_id = ' + id)
      res.redirect('/postulacion')
    }
    // if book found
    else {
      // render to edit.ejs
      res.render('admin/postulacion-edit', {
        id: rows[0].pc_id,
        eg_id: rows[0].pc_eg_id,
        ol_id: rows[0].pc_ol_id,
        ganador: rows[0].pc_ganador,
        puntaje: rows[0].pc_puntaje
      })
    }
  })
})
// Actualizar postulacion
router.post('/postulacion-edit/:id', function (req, res, next) {
  let id = req.params.id;
  let eg_id = req.body.eg_id;
  let ol_id = req.body.ol_id;
  let ganador = req.body.ganador;
  let puntaje = req.body.puntaje;

  var form_data = {
    pc_eg_id: eg_id,
    pc_ol_id: ol_id,
    pc_ganador: ganador,
    pc_puntaje: puntaje
  }
  // update query
  dbConn.query('UPDATE postulacion SET ? WHERE pc_id = ' + id, form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'postulacion editado con exito');
      res.redirect('../../admin/postulacion');
    }
  })
})

// Eliminar postulacion
router.get('/postulacion-del/(:id)', function (req, res, next) {
  let id = req.params.id;
  dbConn.query('DELETE FROM postulacion WHERE pc_id = ' + id, function (err, result) {
    if (err) {
      req.flash('error', err)
      res.redirect('/postulacion')
    } else {
      req.flash('success', 'Postulacion eliminado con exito ID = ' + id)
      res.redirect('../postulacion')
    }
  })
})


  module.exports = router;
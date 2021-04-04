var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
var db = require('../database');

router.get('/doctorlogin', index.doctorlogin);
router.get('/doctorregister', index.doctorregister);


router.get('/doctorinterface', function(req, res, next) {
    var sql = 'SELECT * FROM patients';
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.render('doctor-interface', { title: 'Doctor Interface', patientData: data });
    });
});

router.post('/doctorlogin', function(req, res) {
    var name = req.body.name;
    var doctorid = req.body.doctorid;
    var password = req.body.password;
    if (name && doctorid && password) {
        var sql = "SELECT * FROM doctors WHERE name = ? AND doctorid = ? and password = ?";
        db.query(sql, [name, doctorid, password], function(err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                res.redirect('/doctorinterface');
            } else {
                res.send('<script>alert("Invalid Login Information!"); window.location.href = "/doctorlogin"</script>');
            }
            res.end();
        });
    } else {
        res.send('<script>alert("Please enter your login information!"); window.location.href = "/doctorlogin"</script>');
        res.end();
    }
});

router.post('/doctorregister', function(req, res) {
    var name = req.body.name;
    var doctorid = req.body.doctorid;
    var password = req.body.password;
    var reenter = req.body.reenter;

    if (password === reenter) {
        var sql = "INSERT INTO doctors (doctorid, name, password) VALUES (?, ?, ?)";
        db.query(sql, [doctorid, name, password], function(err, result, fields) {
            if (err) {
                res.send('<script>alert("Registration Error!"); window.location.href = "/doctorregister"</script>');
                console.log(err);
            } else {
                res.send('<script>alert("Successfully Registered Doctor Account!"); window.location.href = "/doctorlogin"</script>');
            }
            res.end();
        });
    } else {
        res.send('<script>alert("Passwords do not match. Please retry."); window.location.href = "/doctorregister"</script>');
    }
});

router.post('/doctor-register-redirect', function(req, res) {
    res.redirect('/doctorregister');
});

router.post('/doctor-login-redirect', function(req, res) {
    res.redirect('/doctorlogin');
});

router.post('/goto-doctorlogin', function(req, res) {
    res.redirect('/doctorlogin');
});

router.post('/goto-doctorregister', function(req, res) {
    res.redirect('/doctorregister');
});

router.post('/goto-doctorinterface', function(req, res) {
    res.redirect('/doctorinterface');
});


module.exports = router;
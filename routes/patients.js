var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
var db = require('../database');

/* GET home page. */
router.get('/', index.index);
router.get('/patientlogin', index.patientlogin);
router.get('/patientinterface', index.patientinterface);
router.get('/patientregister', index.patientregister);

router.post('/patientlogin', function(req, res) {
    var medicare = req.body.medicare;
    var dateofbirth = req.body.dateofbirth;
    if (medicare && dateofbirth) {
        var sql = "SELECT * FROM patients WHERE medicare = ? AND dateofbirth = ?";
        db.query(sql, [medicare, dateofbirth], function(err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.name = result[0].firstname + " " + result[0].lastname;
                req.session.medicare = medicare;
                res.redirect('/patientinterface');
            } else {
                res.send('<script>alert("Invalid Login Information!"); window.location.href = "/patientlogin"</script>');
                console.log(err);
            }
            res.end();
        });
    } else {
        res.send('<script>alert("Please enter your login information!"); window.location.href = "/patientlogin"</script>');
        res.end();
    }
});

router.post('/patientregister', function(req, res) {
    var medicare = req.body.medicare;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var dateofbirth = req.body.dateofbirth;
    var sex = req.body.sex;
    var email = req.body.email;
    var phone = req.body.phone;
    var province = req.body.province;
    var city = req.body.city;
    var address = req.body.address;
    var postalcode = req.body.postalcode;
    var private_key = "0x43f2ee33c522046e80b67e96ceb84a05b60b9434b0ee2e3ae4b1311b9f5dcc46";

    var sql = "INSERT INTO patients (private_key, medicare, firstname, lastname, dateofbirth, sex, email, phone, province, city, address, postalcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [private_key, medicare, firstname, lastname, dateofbirth, sex, email, phone, province, city, address, postalcode], function(err, result, fields) {
        if (err) {
            res.send('<script>alert("Registration Error!"); window.location.href = "/patientregister"</script>');
        } else {
            res.send('<script>alert("Account Successfully Registered!"); window.location.href = "/patientlogin"</script>');
        }
        res.end();
    });
});

router.post('/patient-register-redirect', function(req, res) {
    res.redirect('/patientregister');
});

router.post('/patient-login-redirect', function(req, res) {
    res.redirect('/patientlogin');
});

router.post('/goto-patientlogin', function(req, res) {
    res.redirect('/patientlogin');
});

router.post('/goto-patientregister', function(req, res) {
    res.redirect('/patientregister');
});

router.post('/goto-patientinterface', function(req, res) {
    res.redirect('/patientinterface');
});


module.exports = router;
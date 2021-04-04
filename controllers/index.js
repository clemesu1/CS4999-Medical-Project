exports.index = function(req, res, next) {
    res.render('index', { title: 'CS 4999 Project Page Directory' });
}

exports.patientlogin = function(req, res, next) {
    res.render('patient-login', { title: 'Patient Login' });
}

exports.patientregister = function(req, res, next) {
    res.render('patient-register', { title: 'Patient Register' });
}

exports.patientinterface = function(req, res, next) {
    res.render('patient-interface', { title: 'Patient Interface', name: req.session.name, medicare: req.session.medicare });
}

exports.doctorlogin = function(req, res, next) {
    res.render('doctor-login', { title: 'Doctor Login' });
}

exports.doctorregister = function(req, res, next) {
    res.render('doctor-register', { title: 'Doctor Register' });
}

exports.doctorinterface = function(req, res, next) {
    res.render('doctor-register', { title: 'Patient Diagnosis' });
}
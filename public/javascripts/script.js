function submitPatientData() {
    var heartrate = document.getElementById("heartrate").value;
    var heartrate_time = document.getElementById("heartrate_time").value;

    var bloodpressure = document.getElementById("bloodpressure").value;
    var bloodpressure_time = document.getElementById("bloodpressure_time").value;

    var bloodoxygen = document.getElementById("bloodoxygen").value;
    var bloodoxygen_time = document.getElementById("bloodoxygen_time").value;

    var bloodsugar = document.getElementById("bloodsugar").value;
    var bloodsugar_time = document.getElementById("bloodsugar_time").value;

    var temperature = document.getElementById("temperature").value;
    var temperature_time = document.getElementById("temperature_time").value;

    var respriation = document.getElementById("respriation").value;
    var respriation_time = document.getElementById("respriation_time").value;

    var patientInfo = {};

    if (heartrate != "" && heartrate_time != "") {
        patientInfo["heart_rate"] = { "data": heartrate, "time": heartrate_time }
    }
    if (bloodpressure != "" && bloodpressure_time != "") {
        patientInfo["blood_pressure"] = { "data": bloodpressure, "time": bloodpressure_time }
    }
    if (bloodoxygen != "" && bloodoxygen_time != "") {
        patientInfo["blood_oxygen"] = { "data": bloodoxygen, "time": bloodoxygen_time }
    }
    if (bloodsugar != "" && bloodsugar_time != "") {
        patientInfo["blood_sugar"] = { "data": bloodsugar, "time": bloodsugar_time }
    }
    if (temperature != "" && temperature_time != "") {
        patientInfo["body_temperature"] = { "data": temperature, "time": temperature_time }
    }
    if (respriation != "" && respriation_time != "") {
        patientInfo["respiration_rate"] = { "data": respriation, "time": respriation_time }
    }

    // VARIABLE CONTAINING PATIENT DATA
    var patientData = JSON.stringify(patientInfo);

    alert(patientData);
}

function submitPatientDiagnosis() {
    // VARIABLE CONTAINING PATIENT DIAGNOSIS
    var diagnosis = document.getElementById("diagnosis").value;
    if (diagnosis != "") {
        alert(diagnosis);
    }
}

function getRowData(row) {
    var list = row.cells;

    var name = list.item(0).innerHTML;
    var medicare = list.item(1).innerHTML;
    var sex = list.item(2).innerHTML;
    var dob = list.item(3).innerHTML;

    name = name.replace(/\s\s/g, '');
    medicare = medicare.replace(/\s\s/g, '');
    sex = sex.replace(/\s\s/g, '');
    dob = dob.replace(/\s\s/g, '');

    document.getElementById("patient_name").innerHTML = name;
    document.getElementById("patient_medicare").innerHTML = medicare;
    document.getElementById("patient_sex").innerHTML = sex;
    document.getElementById("patient_dob").innerHTML = dob;
}
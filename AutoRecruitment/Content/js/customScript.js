/*!
 * 
 * This script is used to vaildate input fields + give forms user intraction
 * 
*/
//
// Scripts

//=================== Validation =====================

//----- To prevent typing more than maxlength -----
function inputMaxLength(input) {
    if (input.value.length > input.maxLength) {
        input.value = input.value.slice(0, input.maxLength);
    }
}

//----- To Check if Field is Empty -----
function vlidateEmpty(input) {
    if (input.value == "") {
        input.classList.add("is-invalid");
    }
    else {
        input.classList.remove("is-invalid");
    }
}

//----- To Check National ID Field -----
function vlidateNID(input, errLang) {
    var lblError = document.getElementById("invalid-nid");
    if (input.value == "") {
        if (errLang == 'eng') {
            lblError.innerHTML = "Required";
        }
        else {
            lblError.innerHTML = "هذا الحقل مطلوب";
        }
        input.classList.add("is-invalid");
    }
    else {
        // Equation for Saudi NID is:
        // (1) : TotalSUM =+ if [index] is odd -> use same number
        // (2) : TotalSUM =+ if [index] is even -> value * 2 --> tens + ones (EX: value = 8 --> 8*2 = 16 --> 1+6 = 7 --> TotalSUM =+ 7)
        // (3) : if TotalSUM mod 10 = 0 --> Valid
        if (input.value.length < 10) { // number of digit less than 10
            if (errLang == 'eng') {
                lblError.innerHTML = "National ID should be 10 digits";
            }
            else {
                lblError.innerHTML = "رقم الهوية يجب ان يتكون من 10 خانات";
            }
            input.classList.add("is-invalid");
        }
        else {
            var totalSUM = 0;
            var arrayNID = input.value.split("");
            for (i = 0; i < arrayNID.length; i++) {
                // (1) : if index is odd --> totalSUM =+ same value
                if (i % 2 != 0) { // Odd index
                    totalSUM = totalSUM + parseInt(arrayNID[i]);
                }
                // (2) : if index is even -->
                else {
                    // (2) : x = value * 2
                    // (2) : totalSUM =+ x.TENS + x.ONES
                    var x = parseInt(arrayNID[i]) * 2;
                    // if value * 2 = number with 2 digit
                    if (x.toString().length == 2) {
                        // x.ONES -> x % 10
                        // x.TENS -> Math.floor(x / 10)
                        x = (x % 10) + (Math.floor(x / 10));
                        totalSUM = totalSUM + x;
                    }
                    else {
                        totalSUM = totalSUM + x;
                    }
                }
            }

            if (totalSUM % 10 != 0) {
                if (errLang == 'eng') {
                    lblError.innerHTML = "National ID number is invalid";
                }
                else {
                    lblError.innerHTML = "رقم الهوية الوطنية غير صالح";
                }
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
            }
        }
    }
}

//----- To Check Email Field -----
function validateEmail(input) {
    var lblError = document.getElementById("invalid-email");
    if (input.value == "") {
        lblError.innerHTML = "هذا الحقل مطلوب";
        input.classList.add("is-invalid");
    }
    else {
        var email = input.value;
        var expr = /^([\w-\.]+)@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!expr.test(email)) {
            lblError.innerHTML = "البريد الالكتروني غير صحيح";
            input.classList.add("is-invalid");
        }
        else {
            input.classList.remove("is-invalid");
        }
    }
}

//----- To Check Phone Number Field -----
function validatePhoneNumber(input, errID) {
    var lblError = document.getElementById(errID);
    if (input.value == "") {
        lblError.innerHTML = "هذا الحقل مطلوب";
        input.classList.add("is-invalid");
    }

    else {
        var phoneno = /^\(?(966)\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (input.value.match(phoneno)) {
            input.classList.remove("is-invalid");
        }
        else {
            lblError.innerHTML = "يجب ان يبدأ رقم الهاتف بـ 966 ويتكون من 12 خانة";
            input.classList.add("is-invalid");
            //alert("Error");
        }
    }
}

//----- Check Date Field -----
function validateDate(input, dateType, errID) {
    var lblError = document.getElementById(errID);
    if (input.value == "") {
        lblError.innerHTML = "هذا الحقل مطلوب";
        input.classList.add("is-invalid");
    }
    else {
        const dateArray = input.value.split("-")
        if (dateType == 'Hijri') {
            if (parseInt(dateArray[2]) > 1500) {
                lblError.innerHTML = "التاريخ الهجري غير صحيح";
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
                //convertDate('HTG',);

            }
        }
        else if (dateType == 'Gregorian') {
            if (parseInt(dateArray[2]) < 1500) {
                lblError.innerHTML = "التاريخ الميلادي غير صحيح";
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
                //convertDate('GTH',);

            }
        }
    }
}

//----- function To Convert Date H -> G -----
//----- function To Convert Date G -> H -----


// End of Validation functions 


//============== Interaction Functions ==============

//----------- Calculate Scores in English Assessment Form --------------
$(".reading_score").click(function () {
    var Total_score = 0;
    $(".reading_score").each(function () {
        if (this.checked) {
            Total_score = Total_score + parseInt(this.value);
        }
    });
    $(".total_reading_score").each(function () {
        this.innerHTML = Total_score;
    });
});

$(".speaking_score").click(function () {
    var Total_score = 0;
    $(".speaking_score").each(function () {
        if (this.checked) {
            Total_score = Total_score + parseInt(this.value);
        }
    });
    $(".total_speaking_score").each(function () {
        this.innerHTML = Total_score;
    });
});

//----------- Upload files in Interview Form using custom style for input file  --------------
function getFile(file_id) {
    document.getElementById(file_id).click();
}
function importFile(file_id, file_name) {
    //display file name in the field
    var name = document.getElementById(file_id).files.item(0).name;
    document.getElementById(file_name).value = name;
}

//----- Display/Hide Input when user check the radio btn -----
function Show(inputID) {
    document.getElementById(inputID).style.display = 'block';

}
function Hide(inputID) {
    document.getElementById(inputID).style.display = 'none';
}

// ----- Display phone number in 966-xxx-xxx-xxxx format -----
$('.phoneNumber').keyup(function (e) {
    var ph = this.value.replace(/\D/g, '').substring(0, 12);
    // Backspace and Delete keys
    var deleteKey = (e.keyCode == 8 || e.keyCode == 46);
    var len = ph.length;
    if (len == 0) {
        ph = ph;
    }
    else if (len < 3) {
        ph = '(' + ph;
    }
    else if (len == 3) {
        ph = '(' + ph + (deleteKey ? '' : ') ');
    }
    else if (len < 5) {
        ph = '(' + ph.substring(0, 3) + ') ' + ph.substring(3, 5);
    }
    else if (len == 5) {
        ph = '(' + ph.substring(0, 3) + ') ' + ph.substring(3, 5) + (deleteKey ? '' : '-');
    }
    else if (len < 8) {
        ph = '(' + ph.substring(0, 3) + ') ' + ph.substring(3, 5) + '-' + ph.substring(5, 8);
    }
    else if (len == 8) {
        ph = '(' + ph.substring(0, 3) + ') ' + ph.substring(3, 5) + '-' + ph.substring(5, 8) + (deleteKey ? '' : '-');
    }
    else {
        ph = '(' + ph.substring(0, 3) + ') ' + ph.substring(3, 5) + '-' + ph.substring(5, 8) + '-' + ph.substring(8, 17);
    }
    this.value = ph;
});


//----- To Display Date Picker -----
$(function () {
    initHijrDatePickerDefault();
    initGregorianDatePickerDefault();
});


//--- Default Hijri Date Picker -----
function initHijrDatePickerDefault() {
    $(".hijri-date-default").hijriDatePicker({
        locale: "ar-sa",
        format: "DD-MM-YYYY",
        hijriFormat: "iDD-iMM-iYYYY",
        dayViewHeaderFormat: "MMMM YYYY",
        hijriDayViewHeaderFormat: "iMMMM iYYYY",
        showSwitcher: false,
        allowInputToggle: false,
        showTodayButton: false,
        useCurrent: false,
        isRTL: false,
        viewMode: 'days',
        keepOpen: false,
        hijri: true,
        debug: true,
        showClear: false,
        showTodayButton: false,
        showClose: true
    });
}

//--- Default Gregorian Date Picker -----
function initGregorianDatePickerDefault() {
    $(".gregorian-date-default").hijriDatePicker({
        locale: "ar-sa",
        format: "DD-MM-YYYY",
        hijriFormat: "iDD-iMM-iYYYY",
        dayViewHeaderFormat: "MMMM YYYY",
        hijriDayViewHeaderFormat: "iMMMM iYYYY",
        showSwitcher: false,
        allowInputToggle: false,
        showTodayButton: false,
        useCurrent: false,
        isRTL: false,
        viewMode: 'days',
        keepOpen: false,
        hijri: false,
        debug: true,
        showClear: false,
        showTodayButton: false,
        showClose: true
    });
}

//----- open popup window -----
function open_popup(modal_id) {
    document.getElementById(modal_id).style.display = 'block';
}

//----- close popup window and remove any validation in the window -----
function close_popup(modal_id) {
    $(".form-control").removeClass("is-invalid");
    document.getElementById(modal_id).style.display = 'none';
}

////----- icons for check applicant data in interview form ---
//$(".incorrect-icon").click(function () {
//    //if incorrect icone is on
//    if (this.classList.contains('incorrect-active')) {
//        //turn off incorrect icon
//        this.classList.remove('incorrect-active');
//        //hide edit section
//        document.getElementById(this.dataset.editid).style.display = 'none';
//    }
//    else {
//        //turn on incorrect icon
//        this.classList.add('incorrect-active');
//        //show edit section
//        document.getElementById(this.dataset.editid).style.display = '';
//    }
//});

//----- icons for check applicant data in interview form ---
$(".incorrect-icon").click(function () {
    //turn on incorrect icon
    this.classList.add('incorrect-active');

    //turn off correct icon
    document.getElementById(this.dataset.othericon).classList.remove('correct-active');

    //show edit section
    document.getElementById(this.dataset.editid).style.display = '';
});

$(".correct-icon").click(function () {
    //turn on correct icon
    this.classList.add('correct-active');

    //turn off incorrect icon
    this.classList.remove('incorrect-active');
    document.getElementById(this.dataset.othericon).classList.remove('incorrect-active');

    //hide edit section
    document.getElementById(this.dataset.editid).style.display = 'none';
});

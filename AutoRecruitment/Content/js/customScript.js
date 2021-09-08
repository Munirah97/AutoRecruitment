﻿/*!
 * 
 * This script is used to vaildate registration fields 
 * 
*/ 
//
// Scripts
// 


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
function vlidateNID(input) {
    var lblError = document.getElementById("invalid-nid");
    if (input.value == "") {
        lblError.innerHTML = "هذا الحقل مطلوب";
        input.classList.add("is-invalid");
    }
    else {
        // Equation for Saudi NID is:
        // (1) : TotalSUM =+ if [index] is odd -> use same number
        // (2) : TotalSUM =+ if [index] is even -> value * 2 --> tens + ones (EX: value = 8 --> 8*2 = 16 --> 1+6 = 7 --> TotalSUM =+ 7)
        // (3) : if TotalSUM mod 10 = 0 --> Valid
        if (input.value.length < 10) { // number of digit less than 10
            lblError.innerHTML = "رقم الهوية يجب ان يتكون من 10 خانات";
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
                lblError.innerHTML = "رقم الهوية الوطنية غير صالح";
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
            }
            //alert(arrayNID[0]);


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

//----- To Check Date Field -----
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
                /* var date = new Date(Date.UTC(HijriArr[2], HijriArr[1], HijriArr[0], 3, 0, 0));
                alert(date.toLocaleDateString('en-eg'));
                var datet = new Date('9/1/1997').toLocaleDateString('AR-SA');
                alert(datet);*/
            }
        }
        else if (dateType == 'Gregorian') {
            if (parseInt(dateArray[2]) < 1500) {
                lblError.innerHTML = "التاريخ الميلادي غير صحيح";
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
                //convertDate('HTG',);
                /* var date = new Date(Date.UTC(HijriArr[2], HijriArr[1], HijriArr[0], 3, 0, 0));
                alert(date.toLocaleDateString('en-eg'));
                var datet = new Date('9/1/1997').toLocaleDateString('AR-SA');
                alert(datet);*/
            }
        }
    }
}
//----- To Convert Date H -> G -----

//----- To Convert Date G -> H -----


//----- To Display Date Picker -----
$(function () {
    initHijrDatePickerDefault();
});

function initHijrDatePickerDefault() {
    $(".hijri-date-default").hijriDatePicker({
        locale: "ar-sa",
        format: "DD-MM-YYYY",
        hijriFormat: "iDD-iMM-iYYYY",
        dayViewHeaderFormat: "MMMM YYYY",
        hijriDayViewHeaderFormat: "iMMMM iYYYY",
        showSwitcher: true,
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

//----- Display/Hide Input when user check the radio btn -----
function Show(inputID) {
    document.getElementById(inputID).style.display = 'block';

}
function Hide(inputID) {
    document.getElementById(inputID).style.display = 'none';
}
/*!
 * 
 * This script is used to vaildate registration fields 
 * 
*/
//
// Scripts
// 

//----- open / close modal for create or edit forms -----
function open_popup(modal_id) {
    document.getElementById(modal_id).style.display = 'block';
}

function close_popup(modal_id) {
    $(".form-control").removeClass("is-invalid");
    document.getElementById(modal_id).style.display = 'none';
}

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

//----- To Check Date Field -----
/*function validateDate(input, dateType, errID, Date) {
    var lblError = document.getElementById(errID);
    var otherDate = document.getElementById(Date);
    if (input.value == "") {
        lblError.innerHTML = "Required";
        input.classList.add("is-invalid");
    }
    else {
        var today = new Date();

        // -- Convert the input to date
        const selectedDateArray = input.value.split("-");
        var selectedDate = new Date(selectedDateArray[2] + "-" + selectedDateArray[1] + "-" + selectedDateArray[0]);

        var dateToCompareArray, dateToCompare ;
        // -- Convert the other date-input to date
        if (otherDate.value != '') {
            dateToCompareArray = otherDate.value.split("-");
            dateToCompare = new Date(dateToCompareArray[2] + "-" + dateToCompareArray[1] + "-" + dateToCompareArray[0]);
        }
        *//*//************** issue from here --> logig is not working
        if (dateType == 'open') {
            if (selectedDate < today) {
                lblError.innerHTML = "Please, select future date";
                input.classList.add("is-invalid");
            }
            // -- if the open date is > close date
            else if (otherDate.value != '' && selectedDate > dateToCompare ) {
                lblError.innerHTML = "Open date should be before close date";
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
            }
        }
        else if (dateType == 'close') {
            if (selectedDate < today) {
                lblError.innerHTML = "Please, select future date";
                input.classList.add("is-invalid");
            }
            // -- if the close date is < open date
            else if (otherDate.value != '' && selectedDate < dateToCompare) {
                lblError.innerHTML = "Close date should be after open date";
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
            }
        }
    }
}
*/
//----- To Display Date Picker -----
$(function () {
    initDatePickerDefault();
});

function initDatePickerDefault() {
    $(".gregorian-date-default").hijriDatePicker({
        locale: "en-sa",
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
        showClose: true,
        icons: {
            clear: 'clear',
            close: 'close'
        },
    });
}

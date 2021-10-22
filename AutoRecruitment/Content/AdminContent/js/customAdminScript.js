/*!
 * 
 * This script is used to vaildate registration fields 
 * 
*/
//
// Scripts
// 


//----- open view log window ---------
function view_log(modal_name) {
    document.getElementById('log_name').innerHTML = modal_name;
    document.getElementById('viewLog').style.display = 'block';
}

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

// Add new row in rules table
function addRule(tableId) {
    var table = document.getElementById(tableId);
    var row = table.insertRow(table.rows.length);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML =
          '<div class="form-floating">'
        + '     <input class="form-control" name="v_rule" type="text" placeholder="Field" maxlength="10" oninput="inputMaxLength(this)" onfocusout="vlidateEmpty(this)"/>'
        + '     <label for="v_rule">Field</label>'
        + '</div>';

    cell2.innerHTML =
          '<div class="form-floating">'
        + '   <select class="form-control pt-0 pb-0" id="v_cond" onfocusout="vlidateEmpty(this)">'
        + '       <option value="" selected disabled>Condition</option>'
        + '       <option value="gt">Grater than</option>'
        + '       <option value="eq">Equal to</option>'
        + '       <option value="lt">Less than</option>'
        + '   </select>'
        + '</div>';

    cell3.innerHTML =
          '<div class="form-floating">'
        + '     <input class="form-control" name="v_value" type="text" placeholder="Value" maxlength="10" oninput="inputMaxLength(this)" onfocusout="vlidateEmpty(this)"/>'
        + '     <label for="v_value">Value</label>'
        + '</div>';

    cell4.innerHTML =
          '<button class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)" type="button">'
        + '     <i class="fas fa-trash"></i>'
        + '</button>';
}


// Add new row in regulation table
function addRegu(tableId) {
    var table = document.getElementById(tableId);
    var row = table.insertRow(table.rows.length);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.style.verticalAlign = 'top';
    cell1.innerHTML =
        '   <div class="form-floating">'
        + '        <input class="form-control" name="" type="text" placeholder="Section Title" onfocusout="vlidateEmpty(this)" />'
        + '        <label for="v_rule">Section Title</label>'
        + '    </div>';

    cell2.innerHTML =
        '    <div class="form-floating">'
        + '        <textarea class="form-control" name="" style="min-height:calc(3.5rem + 2px)" placeholder="List of regulations..."></textarea>'
        + '        <label for="v_value">List of regulations...</label>'
        + '    </div>';

    cell3.innerHTML =
        '<button class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)" type="button">'
        + '     <i class="fas fa-trash"></i>'
        + '</button>';
}

//delete row in rules table
function deleteRow(o) {
    var p = o.parentNode.parentNode;
    p.parentNode.removeChild(p);
}

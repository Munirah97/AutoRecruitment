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

    cell1.innerHTML =
        '<td style="width: 35%;vertical-align: top;">'
        +'   <div class="form-floating">'
        +'        <input class="form-control" name="" type="text" placeholder="Section Title" onfocusout="vlidateEmpty(this)" />'
        +'        <label for="v_rule">Section Title</label>'
        +'    </div>'
        +'</td>';

    cell2.innerHTML =
        '<td style="width: 55%;">'
        + '    <div class="form-floating">'
        + '        <textarea class="form-control" name="" style="min-height:calc(3.5rem + 2px)" placeholder="List of regulations..."></textarea>'
        + '        <label for="v_value">List of regulations...</label>'
        + '    </div>'
        + '</td>';

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

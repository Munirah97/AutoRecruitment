/*!
 * 
 * This script is used to vaildate input fields 
 * 
*/
//
// Scripts
// 

//=================== Validation =====================

//----- prevent typing more than maxlength -----
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

//----- To Check if Field is Empty -----
function importFile() {
    //check if the selected file is EXCEL
    var accepted = ["xls", "xlsx"];
    var extension = document.getElementById('import_file').files.item(0).name.split('.').pop();
    if (!(accepted.includes(extension))) {
        //reomve the selected file
        document.getElementById('import_file').value = null;
        document.getElementById('filename').value = "";

        //display warning
        warn_response.innerHTML = 'You can only upload Excel files';
        document.getElementById('warn_popup').style.display = 'block';
    }
    else {
        //display file name in the field
        var name = document.getElementById('import_file').files.item(0).name;
        document.getElementById('filename').value = name;
    }
}

//============== Interaction Functions ==============

// -------Table intraction for search ---------
$(document).ready(function () {
    $('#dataTable').DataTable();
});

// ------- hightlight active menue item in side bar menu ---------
$(".nav-item").each(function () {
    $(".nav-item").removeClass("active");
    var url = window.location.href;
    const page = url.split("/");
    const pageID = page[page.length - 1];
    $("#" + pageID).addClass("active");
});

function getFile(file_id) {
    document.getElementById(file_id).click();
}

//----- open view log window ---------
function view_log(modal_name) {
    document.getElementById('log_name').innerHTML = modal_name;
    document.getElementById('viewLog').style.display = 'block';
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

// Add new row in rules table
function addRule(tableId) {
    var table = document.getElementById(tableId);
    var row = table.insertRow(table.rows.length);

    row.innerHTML =
          '<td style="width: 35%;">'
        + '     <div class="form-floating">'
        + '         <input class="form-control" name="v_rule" type="text" placeholder="Field" maxlength="10" oninput="inputMaxLength(this)" onfocusout="vlidateEmpty(this)"/>'
        + '         <label for="v_rule">Field</label>'
        + '     </div>'
        + '</td>'

        + '<td style="width: 20%;">'
        + '     <div class="form-floating">'
        + '         <select class="form-control pt-0 pb-0" id="v_cond" onfocusout="vlidateEmpty(this)">'
        + '             <option value="" selected disabled>Condition</option>'
        + '             <option value="gt">Grater than</option>'
        + '             <option value="eq">Equal to</option>'
        + '             <option value="lt">Less than</option>'
        + '         </select>'
        + '     </div>'
        + '</td>'


        + '<td style="width: 35%;">'
        + '     <div class="form-floating">'
        + '         <input class="form-control" name="v_value" type="text" placeholder="Value" maxlength="10" oninput="inputMaxLength(this)" onfocusout="vlidateEmpty(this)"/>'
        + '         <label for="v_value">Value</label>'
        + '     </div>'
        + '</td>'

        + '<td style="width: 10%">'
        + '     <button class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)" type="button">'
        + '         <i class="fas fa-trash"></i>'
        + '     </button>'
        + '</td>';
}

// Add new row in regulation table
function addRegu(tableId) {
    var table = document.getElementById(tableId);
    var row = table.insertRow(table.rows.length);

    row.innerHTML =
        '<td style="width: 35%;vertical-align: top;">'
        + '   <div class="form-floating">'
        + '        <input class="form-control" name="" type="text" placeholder="Section Title" onfocusout="vlidateEmpty(this)" />'
        + '        <label for="v_rule">Section Title</label>'
        + '    </div>'
        + '</td>'

        + '<td style="width: 55%;">'
        + '    <div class="form-floating">'
        + '        <textarea class="form-control" name="" style="min-height:calc(3.5rem + 2px)" placeholder="List of regulations..."></textarea>'
        + '        <label for="v_value">List of regulations...</label>'
        + '    </div>'
        + '</td>'

        + ' <td style="width:10%;">'
        + '     <button class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)" type="button">'
        + '         <i class="fas fa-trash"></i>'
        + '     </button>'
        + ' </td>';

}

// Add custom file upload in registration form (Create / update camp)
function addCustomFileUpload() {
    var table = document.getElementById('cstm_reg_files');
    if (table.rows.length < 2) {
        var row = table.insertRow(table.rows.length);
        row.innerHTML =
            '<td style="width: 35%;">'
            + '     <div class="form-floating">'
            + '          <select class="form-control pt-0 pb-0" id="is_required">'
            + '             <option value="required">Required</option>'
            + '             <option value="optional">Optional</option>'
            + '         </select>'
            + '    </div>'
            + '</td>'

            + '<td style="width: 55%;">'
            + '    <div class="form-floating">'
            + '        <input class="form-control" name="" type="text" placeholder="Section Title" onfocusout="vlidateEmpty(this)" />'
            + '        <label for="">Lable in the form</label>'
            + '    </div>'
            + '</td>'

            + ' <td style="width:10%;">'
            + '     <button class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)" type="button">'
            + '         <i class="fas fa-trash"></i>'
            + '     </button>'
            + ' </td>';
    }
    else {
        warn_response.innerHTML = 'You can not add more than 2 files';
        document.getElementById('warn_popup').style.display = 'block';
    }
    

}


//delete row in table
function deleteRow(o) {
    var p = o.parentNode.parentNode;
    p.parentNode.removeChild(p);
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

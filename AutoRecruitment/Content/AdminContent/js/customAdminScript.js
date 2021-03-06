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

//----- To Check files -----
function importFile(file_id, file_name) {
    //check if the selected file is EXCEL
    //var accepted = ["xls", "xlsx"];
    //var extension = document.getElementById('import_file').files.item(0).name.split('.').pop();
    //if (!(accepted.includes(extension))) {
    //    //reomve the selected file
    //    document.getElementById('import_file').value = null;
    //    document.getElementById('filename').value = "";
    //}
    //else {

    var fileSize = document.getElementById(file_id).files.item(0).size / 1024 / 1024;
    if (fileSize > 2) {
        Swal.fire({
            title: 'File too big!',
            text: 'The uploaded file exceeds 2 MB',
            icon: 'info',
            iconColor: '#f6c23e',
            confirmButtonColor: '#0a3049',
        })
    }
    else {
        //display file name in the field
        var name = document.getElementById(file_id).files.item(0).name;
        document.getElementById(file_name).value = name;
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
    const response_pages = ['ResponsesReg', 'ResponsesAcceptance', 'ResponsesInterview', 'ResponsesEvalu'];
    const config_pages = ['Templates', 'Users', 'Settings'];
    if (response_pages.includes(pageID)) {
        $("#Responses").addClass("active");
    }
    else if (config_pages.includes(pageID)) {
        $("#Configuration").addClass("active");
    }
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
function addQualiRule(tableId) {
    var table = document.getElementById(tableId);
    alert(tableId);
    var row = table.insertRow(table.rows.length);

    row.innerHTML =
        '<td style="width: 35%;">'
        + '     <div class="form-floating">'
        + '         <select class="form-control pt-0 pb-0" id="v_cond" onfocusout="vlidateEmpty(this)">'
        + '             <option value="" selected disabled>Field</option>'
        + '             <option value="gender">Gender</option>'
        + '             <option value="age">Age</option>'
        + '             <option value="hs_score">High School Score</option>'
        + '             <option value="qiyas">Qiyas Score</option>'
        + '             <option value="hrdf">HRDF Status</option>'
        + '             <option value="health">Health Condition</option>'
        + '         </select>'
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
        + '         <i class="fas fa-trash-alt"></i>'
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
        + '        <textarea class="form-control" name="" style="min-height:calc(3.5rem + 2px)" placeholder="Section content..."></textarea>'
        + '        <label for="v_value">Section content...</label>'
        + '    </div>'
        + '</td>'

        + ' <td style="width:10%;">'
        + '     <button class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)" type="button">'
        + '         <i class="fas fa-trash-alt"></i>'
        + '     </button>'
        + ' </td>';

}

// Add custom file upload in registration form (Create / update camp)
function addCustomFileUpload() {
    var table = document.getElementById('cstm_reg_files');
    if (table.rows.length < 2) {
        var row = table.insertRow(table.rows.length);
        row.innerHTML =
            '<td style="width: 25%;">'
            + '    <div class="form-floating">'
            + '        <input class="form-control" name="" type="text" placeholder="Section Title" onfocusout="vlidateEmpty(this)" />'
            + '        <label for="">Attachment Name</label>'
            + '    </div>'
            + '</td>'

            + '<td style="width: 20%;">'
            + '     <div class="form-floating">'
            + '          <select class="form-control pt-0 pb-0" id="is_required">'
            + '             <option value="required">Required</option>'
            + '             <option value="optional">Optional</option>'
            + '         </select>'
            + '    </div>'
            + '</td>'

            + '<td style="width: 45%;">'
            + '    <div class="form-floating">'
            + '        <input class="form-control" name="" type="text" placeholder="Lable in the form" onfocusout="vlidateEmpty(this)" />'
            + '        <label for="">Lable in the form <span style="font-size:9pt">(recomended in arabic)</span></label>'
            + '    </div>'
            + '</td>'

            + ' <td style="width:10%;">'
            + '     <button class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)" type="button">'
            + '         <i class="fas fa-trash-alt"></i>'
            + '     </button>'
            + ' </td>';
    }
    else {
        Swal.fire({
            title: 'Warning!',
            text: 'You can not add more than 2 files',
            icon: 'info',
            iconColor: '#f6c23e',
            confirmButtonColor: '#0a3049',
        })
    }
}

//// Add custom file upload in edit interview response
function addInterviewFile_editRes(tbl) {
    var attachments = document.getElementById(tbl);

    // check if there is space in attchmant table (header row + attachment rows = 6 as maximum)
    if (attachments.rows.length < 6) {
        var row = attachments.insertRow(attachments.rows.length);

        row.innerHTML =
            '<td>'
            + '	<input class="form-control p-0 pl-2 fsize-10" name="" type="text" placeholder="File Description" onfocusout="vlidateEmpty(this)"/>'
            + '</td>'
            + '<td>'
            + '	<div class="form-floating">'
            + '		<div class="input-group">'
            + '			<input type="text" class="form-control small disabled_input fsize-10" id="interview_file_' + (attachments.rows.length - 1) + '_name" placeholder="Select File ..." aria-label="Upload" aria-describedby="basic-addon2" disabled>'
            + '			<div class="input-group-append">'
            + '				<button class="btn btn-primary fsize-10" type="button" onclick="getFile(\'interview_file_' + (attachments.rows.length - 1) + '\')">'
            + '					<i class="fas fa-upload fa-sm"></i>'
            + '				</button>'
            + '			</div>'
            + '		</div>'
            + '		<input type="file" id="interview_file_' + (attachments.rows.length - 1) + '" class="d-none" onchange="importFile(\'interview_file_' + (attachments.rows.length - 1) + '\',\'interview_file_' + (attachments.rows.length - 1) + '_name\')" />'
            + '	</div>'
            + '</td>'
            + '<td>'
            + '	<button type="button" class="d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteRow(this)"><i class="fas fa-trash-alt fa-sm"></i></button>'
            + '</td>';
    }
    else {
        Swal.fire({
            title: 'Warning!',
            text: 'You can not add more than 5 files',
            icon: 'info',
            iconColor: '#f6c23e',
            confirmButtonColor: '#0a3049',
        })
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

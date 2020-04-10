var fileCount = 0;
var fileList = {};
var idIndex = 0;
var itemIndex = 1;


function extnameFun(filename) {
    if (!filename || typeof filename != 'string') {
        return false
    }
    ;
    var a = filename.split('').reverse().join('');
    var b = a.substring(0, a.search(/\./)).split('').reverse().join('');
    return b
}


function formatFileSize(size) {
    if (size < 1024) {
        return size + 'B';
    }
    if (size >= 1024 && size <= 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB';
    }
    if (size >= 1024 * 1024 && size <= 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + 'MB';
    }
}

function readURL(file) {
    var extname = extnameFun(file.name).toLowerCase();
//    if ((extname == 'doc' || extname == 'docx' || extname == 'pdf' || extname == 'jpg' || extname == 'jepg') && file.size < 5 * 1024 * 1024) {
    if (file.size < 20 * 1024 * 1024) {
        fileList[idIndex] = {"filename": file.name, file: file, filesize: file.size};
        $("#uploadFileList").append('<div class="form-control m-t-10" id="fileItem' + idIndex + '">' + file.name + '(' + formatFileSize(file.size) + ')<img src="img/delete.png" style="width: 24px; float: right; cursor: pointer; margin-top:10px" onclick="removeFile(' + idIndex + ')" /></div>');
        fileCount++;
        idIndex++;
    }
}


function removeFile(index) {
    delete fileList[index];
    fileCount--;
    $("#fileItem" + index).remove();
}


function saveForm() {

    if($("#first-name").val().length==0){
        $("#first-name").addClass("is-invalid");
        return false;
    }
    else{
        $("#first-name").removeClass("is-invalid");
    }

    if($("#last-name").val().length==0){
        $("#last-name").addClass("is-invalid");
        return false;
    }
    else{
        $("#last-name").removeClass("is-invalid");
    }

    if($("#email").val().length==0){
        $("#email").addClass("is-invalid");
        return false;
    }
    else{
        $("#email").removeClass("is-invalid");
    }

    if($("#phone").val().length==0){
        $("#phone").addClass("is-invalid");
        return false;
    }
    else{
        $("#phone").removeClass("is-invalid");
    }

    var postData = {
        FirstName: $("#first-name").val(),
        LastName: $("#last-name").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val(),
        SubjectArea: $("#select-subject-area").val(),
        NameSchool: $("#schoolname").val(),
        Website: $("#website").val(),
        HearUs: $("#select-hear").val()
    }

    const formData = new FormData();


    for (var key in fileList) {
        var item = fileList[key];
        formData.append("files.Files", item.file, item.name)
    }

    formData.append('data', JSON.stringify(postData));

    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "https://admin.posthtx.com/super-registers",
        data: formData,
        success: function (data) {
            window.location.href = "http://test.posthtx.com/superdesignsuperfurniture";
        },
        error: function (e) {
        }
    });


}




function saveContact() {

    var postData = {
        FirstName: $("#first-name").val(),
        LastName: $("#last-name").val(),
        Email: $("#email").val(),
        Comments: $("#message").val()
    }

    const formData = new FormData();


    formData.append('data', JSON.stringify(postData));

    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "https://admin.posthtx.com/super-contacts",
        data: formData,
        success: function (data) {
            window.location.href = "http://test.posthtx.com/superdesignsuperfurniture";
        },
        error: function (e) {
        }
    });


}




function validateForm() {
    if ($("#terms").is(':checked')) {
        $("#submit-btn").removeAttr('disabled');
    }
    else {
        $("#submit-btn").attr('disabled', 'disabled');
    }
}


function hideHeaderDiv() {
  $("#headerDiv").hide();
}




$(function () {
    $('#phone').mask('(000) 000-0000');

    $("#uploadBtn").click(function () {
        $("#customFile").click();
    });

    $('#customFile').change(function () {
        $.each(this.files, function () {
            readURL(this);
        });
    });


    var forms = document.getElementsByClassName('needs-validation contactform');
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('keyup', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                $("#submit-btn").attr('disabled', 'disabled');
            }
            else {
                $("#submit-btn").removeAttr('disabled');
            }
        }, false);
    });


});
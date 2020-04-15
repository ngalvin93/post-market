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

    var length= Object.keys(fileList).length;

    if(length>1){
        $("#filemaxFeedback").show();
        return;
    }
    else {
        $("#filemaxFeedback").hide();
        var extname = extnameFun(file.name).toLowerCase();
        if ((extname == 'pdf') && file.size < 5 * 1024 * 1024) {
            $("#fileFeedback").hide();
            fileList[idIndex] = {"filename": file.name, file: file, filesize: file.size};
            $("#uploadFileList").append('<div class="form-control m-t-10" id="fileItem' + idIndex + '">' + file.name + '(' + formatFileSize(file.size) + ')<img src="img/delete.png" style="width: 24px; float: right; cursor: pointer; margin-top:10px" onclick="removeFile(' + idIndex + ')" /></div>');
            fileCount++;
            idIndex++;
        }
        else {
            $("#fileFeedback").show();
        }
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

    var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if($("#email").val().length==0||!myreg.test($("#email").val())){
        $("#email").addClass("is-invalid");
        return false;
    }
    else{
        $("#email").removeClass("is-invalid");
    }

    if($("#website").val().length==0){
        $("#website").addClass("is-invalid");
        return false;
    }
    else{
        $("#website").removeClass("is-invalid");
    }


    var other = $("#select-hear").val();

    if($("#select-hear").val()=="0"&&$("#other").val().length==0) {
        $("#select-hear").addClass("is-invalid");
        return false;
    }
    else{
        $("#select-hear").removeClass("is-invalid");
        if($("#select-hear").val()=="0"){
            other=$("#other").val();
        }
    }



    if ($("#terms").is(':checked')) {
        $("#terms").removeClass('is-invalid');
    }
    else{
        $("#terms").addClass("is-invalid");
        return false;
    }



    var postData = {
        FirstName: $("#first-name").val(),
        LastName: $("#last-name").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val(),
        SubjectArea: "",
        NameSchool: $("#schoolname").val(),
        Website: $("#website").val(),
        HearUs: other
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
            $("#thankyou").show();
            $("#first-name").val("");
            $("#last-name").val("");
            $("#email").val("");
            $("#phone").val("");
            $("#schoolname").val("");
            $("#website").val("");
            $("#select-hear").val("0");
            $("#uploadFileList").html("");

            fileCount = 0;
            fileList = {};
            idIndex = 0;
            itemIndex = 1;
        },
        error: function (e) {
        }
    });


}

function SubmitEmail() {
    $.ajax({
        type: "POST",
        url: 'https://www.intownhomes.com/GetData/SaveNewletter2.ashx?first=' + '' + '&last=' + '' + '&email=' + $("#newsletter").val() + '&phone=' + '' + '&company=' + '' + '&sqft=&message=',
        success: function (data) {
            if (data.result == "1") {
                $("#newsletter").val("");
            }
        },
        error: function (e) {
        }
    });
}



function saveContact() {
    if($("#first-name").val().length==0){
        $("#first-name").addClass("is-invalid");
        return false;
    }
    else
    {
        $("#first-name").removeClass("is-invalid");
    }

    if($("#last-name").val().length==0){
        $("#last-name").addClass("is-invalid");
        return false;
    }
    else
    {
        $("#last-name").removeClass("is-invalid");
    }

    var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if($("#email").val().length==0||!myreg.test($("#email").val())){
        $("#email").addClass("is-invalid");
        return false;
    }
    else
    {
        $("#email").removeClass("is-invalid");
    }

    if($("#message").val().length==0){
        $("#message").addClass("is-invalid");
        return false;
    }
    else
    {
        $("#message").removeClass("is-invalid");
    }



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
            $("#thankyou").show();
            $("#first-name").val("");
            $("#last-name").val("");
            $("#email").val("");
            $("#message").val("");

        },
        error: function (e) {
        }
    });


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



});
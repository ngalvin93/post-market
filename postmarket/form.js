var fileCount = 0;
var fileList = {};
var idIndex = 0;
var itemIndex=1;

var marketingFileList={
    "headshot":{},
    "photograph":{},
    "primary":{},
    "secondary":{},
    "logos":{},
    "menu":{}
};

var marketingFileCount={
    "headshot":0,
    "photograph":0,
    "primary":0,
    "secondary":0,
    "logos":0,
    "menu":0
};
var marketingIndex={
    "headshot":0,
    "photograph":0,
    "primary":0,
    "secondary":0,
    "logos":0,
    "menu":0
};





function addItemToTable () {
    const table = document.getElementById('items-table');

    const currentRow = table.insertRow();
    currentRow.setAttribute('class', 'form-row m-t-10');
    currentRow.setAttribute('id', 'itemRow' + itemIndex);

    const itemInput = document.createElement('input');
    itemInput.setAttribute('class', 'form-control itemNameInput');
    itemInput.setAttribute('id', 'itemName' + itemIndex);


    const amountInput = document.createElement('input')
    amountInput.setAttribute('class', 'form-control itemAmountInput');
    amountInput.setAttribute('id', 'itemAmount' + itemIndex);


    const deleteImg = document.createElement('img');
    deleteImg.setAttribute('id', 'deleteImg' + itemIndex);
    deleteImg.setAttribute('src', 'img/delete.png');
    deleteImg.setAttribute('style', 'width: 24px;right: 20px;cursor: pointer;top: 20px;position: absolute; display:none');
    deleteImg.setAttribute('onclick', 'removeItemToTable(' + itemIndex + ')');


    let currentCell = currentRow.insertCell();
    currentCell.setAttribute('class', 'col-9');
    currentCell.setAttribute('onmouseover', 'itemRowMouseOver(' + itemIndex + ')');
    currentCell.setAttribute('onmouseout', 'itemRowMouseOut(' + itemIndex + ')');

    currentCell.appendChild(itemInput);
    currentCell.appendChild(deleteImg);


    currentCell = currentRow.insertCell();
    currentCell.setAttribute('class', 'col-3');
    currentCell.appendChild(amountInput);
    $('.itemAmountInput').mask("#,##0.00", {reverse: true});
    itemIndex++;
    GetTotal();
}


function removeItemToTable (index) {
    $("#itemRow"+index).remove();
    var price = 0.00;
    $(".itemAmountInput").each(function () {
        if ($(this).val() != '') {
            price += parseFloat($(this).val().replace(/,/g,''));
        }
    });
    $("#amountTotal").val(formatAmount(price));
}

function itemRowMouseOver(id){
 $("#deleteImg"+id).show();
}

function itemRowMouseOut(id){
    $("#deleteImg"+id).hide();
}


function formatAmount(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}



function extnameFun(filename) {
    if (!filename || typeof filename != 'string') {
        return false
    };
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
    if ((extname == 'doc' || extname == 'docx' || extname == 'pdf' || extname == 'jpg' || extname == 'jepg') && file.size < 5 * 1024 * 1024) {
            fileList[idIndex] = {"filename": file.name, file: file, filesize: file.size};
            $("#uploadFileList").append('<div class="form-control uploadItem m-t-10" id="fileItem' + idIndex + '">' + file.name + '(' + formatFileSize(file.size) + ')<img src="img/delete.png" style="width: 24px; float: right; cursor: pointer; margin-top:10px" onclick="removeFile(' + idIndex + ')" /></div>');
            fileCount++;
            idIndex++;
        }
}



function removeFile(index) {
    delete fileList[index];
    fileCount--;
    $("#fileItem" + index).remove();
}

function GetTotal() {
    $('.itemAmountInput').keyup(function() {
        var price = 0.00;
        $(".itemAmountInput").each(function () {
            if ($(this).val() != '') {
                price += parseFloat($(this).val().replace(/,/g,''));
            }
        });
        $("#amountTotal").val(formatAmount(price));
    });
}

function saveMarketingForm() {

    var OperatingHours = [];


    if ($("#Sunday").attr("src") == "img/open.png") {
        OperatingHours.push({"Day": "Sunday", "Status": true, "Start": $("#SundayStartInput").val(), "End": $("#SundayEndInput").val()});
    }
    else {
        OperatingHours.push({"Day": "Sunday", "Status": false, "Start": "", "End": ""});
    }


    if ($("#Monday").attr("src") == "img/open.png") {
        OperatingHours.push({"Day": "Monday", "Status": true, "Start": $("#MondayStartInput").val(), "End": $("#MondayEndInput").val()});
    }
    else {
        OperatingHours.push({"Day": "Monday", "Status": false, "Start": "", "End": ""});
    }


    if ($("#Tuesday").attr("src") == "img/open.png") {
        OperatingHours.push({"Day": "Tuesday", "Status": true, "Start": $("#TuesdayStartInput").val(), "End": $("#TuesdayEndInput").val()});
    }
    else {
        OperatingHours.push({"Day": "Tuesday", "Status": false, "Start": "", "End": ""});
    }

    if ($("#Wednesday").attr("src") == "img/open.png") {
        OperatingHours.push({"Day": "Wednesday", "Status": true, "Start": $("#WednesdayStartInput").val(), "End": $("#WednesdayEndInput").val()});
    }
    else {
        OperatingHours.push({"Day": "Wednesday", "Status": false, "Start": "", "End": ""});
    }

    if ($("#Thursday").attr("src") == "img/open.png") {
        OperatingHours.push({"Day": "Thursday", "Status": true, "Start": $("#ThursdayStartInput").val(), "End": $("#ThursdayEndInput").val()});
    }
    else {
        OperatingHours.push({"Day": "Thursday", "Status": false, "Start": "", "End": ""});
    }

    if ($("#Friday").attr("src") == "img/open.png") {
        OperatingHours.push({"Day": "Friday", "Status": true, "Start": $("#FridayStartInput").val(), "End": $("#FridayEndInput").val()});
    }
    else {
        OperatingHours.push({"Day": "Friday", "Status": false, "Start": "", "End": ""});
    }

    if ($("#Saturday").attr("src") == "img/open.png") {
        OperatingHours.push({"Day": "Saturday", "Status": true, "Start": $("#SaturdayStartInput").val(), "End": $("#SaturdayEndInput").val()});
    }
    else {
        OperatingHours.push({"Day": "Saturday", "Status": false, "Start": "", "End": ""});
    }


    var postData = {
        FirstName: $("#first-name").val(),
        LastName: $("#last-name").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val(),
        BusinessName: $("#business-name").val(),
        Stall: $("#stall-number").val(),
        BusinessEmail: $("#bemail").val(),
        BusinessPone: $("#bphone").val(),
        Facebook: $("#FacebookInput").val(),
        Instagram: $("#InstagramInput").val(),
        Twitter: $("#TwitterInput").val(),
        Description: $("#businessDescription").val(),
        Biography: $("#ownerBiography").val(),
        OperatingHours: OperatingHours
    }


    const formData = new FormData();


    for (var key in marketingFileList["headshot"]) {
        var item = marketingFileList["headshot"][key];
        formData.append("files.Headshot", item.file, item.name)
    }
    for (var key in marketingFileList["photograph"]) {
        var item = marketingFileList["photograph"][key];
        formData.append("files.Photograph", item.file, item.name)
    }
    for (var key in marketingFileList["primary"]) {
        var item = marketingFileList["primary"][key];
        formData.append("files.Primary", item.file, item.name)
    }
    for (var key in marketingFileList["secondary"]) {
        var item = marketingFileList["secondary"][key];
        formData.append("files.Secondary", item.file, item.name)
    }
    for (var key in marketingFileList["logos"]) {
        var item = marketingFileList["logos"][key];
        formData.append("files.Logos", item.file, item.name)
    }
    for (var key in marketingFileList["menu"]) {
        var item = marketingFileList["menu"][key];
        formData.append("files.Menu", item.file, item.name)
    }

    formData.append('data', JSON.stringify(postData));


    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "https://admin.posthtx.com/marketing-forms",
        data: formData,
        success: function (data) {
            window.location.href = "http://test.posthtx.com/";
        },
        error: function (e) {
        }
    });
}


function switchButton(id){

    if($("#"+id).attr("src")=="img/close.png") {
        $("#"+id).attr("src","img/open.png");
        $("#"+id+"_Status").html("Open");
        $("#"+id+"_StartTime").show();
        $("#"+id+"_Line").show();
        $("#"+id+"_EndTime").show();
    }
    else
    {
        $("#"+id).attr("src","img/close.png");
        $("#"+id+"_Status").html("Closed");
        $("#"+id+"_StartTime").hide();
        $("#"+id+"_Line").hide();
        $("#"+id+"_EndTime").hide();
    }
}

function showDiv(id){
    $("#"+id+"Div").show();
    $("#"+id+"Close").show();
    $("#"+id+"Open").hide();
}

function hideDiv(id){
    $("#"+id+"Div").hide();
    $("#"+id+"Close").hide();
    $("#"+id+"Open").show();
}

function uploadBtnClick(id) {
    $("#" + id + "customFile").click();
}

function readURLById(file,id) {
    var extname = extnameFun(file.name).toLowerCase();
    if ((((extname == 'png' || extname == 'jpg' || extname == 'jepg')&&id!='logos') ||((extname == 'ai' || extname == 'eps' || extname == 'svg')&&id=='logos'))&& file.size < 10 * 1024 * 1024) {
        marketingFileList[id][marketingIndex[id]] = {"filename": file.name, file: file, filesize: file.size};
        $("#" + id + "uploadFileList").append('<div class="form-control uploadItem m-t-10" id="' + id + 'fileItem' + marketingIndex[id] + '">' + file.name + '(' + formatFileSize(file.size) + ')<img src="img/delete.png" style="width: 24px; float: right; cursor: pointer; margin-top:10px" onclick="removeMarkingFile(\'' + id + '\',' + marketingIndex[id] + ')" /></div>');
        marketingFileCount[id]++;
        marketingIndex[id]++;
    }
}

function removeMarkingFile(id,index) {
    delete marketingFileList[id][index]
    marketingFileCount[id]--;
    $("#" + id + "fileItem" + index).remove();
}

function uploadFileChange(id) {
    $.each($("#"+id+"customFile")[0].files, function (i,val) {
        readURLById(val,id);
    });
}


function saveForm(){

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


    if($("#business-name").val().length==0){
        $("#business-name").addClass("is-invalid");
        return false;
    }
    else{
        $("#business-name").removeClass("is-invalid");
    }

    var itemList=[];

    for(var i=0;i<itemIndex;i++) {
        if ( $("#itemName" + i).length > 0 ) {
            itemList.push({"Item": $("#itemName" + i).val(), "Price": parseFloat($("#itemAmount" + i).val().replace(/,/g, ''))})
        }
    }



    var postData = {
        FirstName: $("#first-name").val(),
        LastName: $("#last-name").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val(),
        BusinessName: $("#business-name").val(),
        Stall: $("#stall-number").val(),
        SelectForm: $("#select-form").val(),
        Total: parseFloat($("#amountTotal").val().replace(/,/g, '')),
        Items:itemList
    }

    const formData = new FormData();


    for (var key in fileList) {
        var item = fileList[key];
        formData.append("files.Files",item.file, item.name)
    }

    formData.append('data', JSON.stringify(postData));

    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "https://admin.posthtx.com/post-forms",
        data: formData,
        success: function (data) {
            window.location.href="http://test.posthtx.com/";
        },
        error: function (e) {
        }
    });



}


$(function(){

    $("#addItemBtn").click(function() {
        addItemToTable ();
    });


    $("#uploadBtn").click(function() {
        $("#customFile").click();
    });

    //Get total Amount
    GetTotal();

    // Amount format
    $('.itemAmountInput').mask("#,##0.00", {reverse: true});
    $('#phone').mask('(000) 000-0000');
    $('#bphone').mask('(000) 000-0000');

    $('#customFile').change(function () {
        $.each(this.files, function () {
            readURL(this);
        });
    });

    $('#select-form').change(function () {
        if($('#select-form').val()=="0"){
            $("#ChooseForm").hide();
        }
        else {
            $("#choose-title").html($('#select-form').val());
            $("#ChooseForm").show();
            if($('#select-form').val()=="Deposit withdrawal"){
                $("#withdrawal").show();
            }
            else
            {
                $("#withdrawal").hide();
            }
        }
    });

//    $("#submit-btn").click(function(){
//        saveForm();
//    })


    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('keyup', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                $("#submit-btn").attr('disabled','disabled');
            }
            else
            {
                $("#submit-btn").removeAttr('disabled');
            }
        }, false);
    });


});













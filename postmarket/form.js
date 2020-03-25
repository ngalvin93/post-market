var fileCount = 0;
var fileList = {};
var idIndex = 0;
var itemIndex=1;


function addItemToTable () {
    console.log('add item');
    const table = document.getElementById('items-table');

    const currentRow = table.insertRow();
    currentRow.setAttribute('class', 'form-row m-t-10');

    const itemInput = document.createElement('input');
    itemInput.setAttribute('class', 'form-control itemNameInput');
    itemInput.setAttribute('id', 'itemName'+itemIndex);

    const amountInput = document.createElement('input')
    amountInput.setAttribute('class', 'form-control itemAmountInput');
    amountInput.setAttribute('id', 'itemAmount'+itemIndex);

    let currentCell = currentRow.insertCell();
    currentCell.setAttribute('class', 'col-9');
    currentCell.appendChild(itemInput);

    currentCell = currentRow.insertCell();
    currentCell.setAttribute('class', 'col-3');
    currentCell.appendChild(amountInput);
    $('.itemAmountInput').mask("#,##0.00", {reverse: true});
    itemIndex++;
    GetTotal();
}


function formatAmount(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
            num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
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
    if(size>=1024&&size<=1024*1024){
        return (size/1024).toFixed(2) + 'KB';
    }
    if(size>=1024*1024&&size<=1024*1024*1024){
        return (size/1024/1024).toFixed(2) + 'MB';
    }
}


function readURL(file) {
    var extname = extnameFun(file.name).toLowerCase();
    if ((extname == 'doc' || extname == 'docx' || extname == 'pdf' || extname == 'jpg' || extname == 'jepg') && file.size < 5 * 1024 * 1024) {
//        var reader = new FileReader();
//        reader.readAsDataURL(file);
//        reader.onload = function () {
            fileList[idIndex] = {"filename": file.name, file: file, filesize: file.size};
            $("#uploadFileList").append('<div class="form-control uploadItem m-t-10" id="fileItem' + idIndex + '">' + file.name + '(' + formatFileSize(file.size) + ')<img src="delete.png" style="width: 24px; float: right; cursor: pointer; margin-top:10px" onclick="removeFile(' + idIndex + ')" /></div>');
            fileCount++;
            idIndex++;

        }
 //   }
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


function saveForm22() {

    var itemList=[];
   for(var i=0;i<itemIndex;i++) {
       itemList.push({name: $("#itemName" + i).val(), price: parseFloat($("#itemAmount" + i).val().replace(/,/g, ''))})
   }

    var postData = {
        firstname: $("#first-name").val(),
        lastname: $("#last-name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        businessname: $("#business-name").val(),
        stall: $("#stall-number").val(),
        from: $("#select-form").val(),
        price: parseFloat($("#amountTotal").val().replace(/,/g, '')),
        itemlist:itemList,
        filelist: fileList
    }


    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        url: "http://www2.lovettcommercial.com/api/saveform",
        data: JSON.stringify(postData),
        success: function (data) {
            if (data.result == 1) {

            }
            else {
                alert(data.message);
            }
        },
        error: function (e) {
        }
    });
}


function switchButton(id){

    if($("#"+id).is(":checked")) {
        $("#"+id+"_Status").html("Open");
        $("#"+id+"_StartTime").show();
        $("#"+id+"_Line").show();
        $("#"+id+"_EndTime").show();
    }
    else
    {
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
    if ((extname == 'png' || extname == 'jpg' || extname == 'jepg') && file.size < 10 * 1024 * 1024) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
            testArray.push(this.result);
//            fileList[idIndex] = {"filename": file.name, file: this.result, filesize: file.size};
            $("#"+id+"uploadFileList").append('<div class="form-control uploadItem m-t-10" id="'+id+'fileItem' + idIndex + '">' + file.name + '(' + formatFileSize(file.size) + ')<img src="delete.png" style="width: 24px; float: right; cursor: pointer; margin-top:10px" onclick="removeFile(' + idIndex + ')" /></div>');
//            fileCount++;
//            idIndex++;
        }
    }
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
        itemList.push({"item": $("#itemName" + i).val(), "price": parseFloat($("#itemAmount" + i).val().replace(/,/g, ''))})
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
        url: "http://localhost:1337/form-infos",
        data: formData,
        success: function (data) {
            if (data.result == 1) {
                console.log(data);
            }
            else {
                console.log(data);
            }
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
        }
    });

    $("#submit-btn").click(function(){
        saveForm();
    })




});













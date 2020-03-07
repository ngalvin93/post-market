var fileCount = 0;
var fileList = {};
var idIndex = 0;


function addItemToTable () {
    console.log('add item')
    const table = document.getElementById('items-table')

    const currentRow = table.insertRow()
    currentRow.setAttribute('class', 'form-row m-t-10')

    const itemInput = document.createElement('input')
    itemInput.setAttribute('class', 'form-control itemNameInput')

    const amountInput = document.createElement('input')
    amountInput.setAttribute('class', 'form-control itemAmountInput')

    let currentCell = currentRow.insertCell()
    currentCell.setAttribute('class', 'col-9')
    currentCell.appendChild(itemInput)

    currentCell = currentRow.insertCell()
    currentCell.setAttribute('class', 'col-3')
    currentCell.appendChild(amountInput)
    $('.itemAmountInput').mask("#,##0.00", {reverse: true});
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
    if ((extname == 'doc' || extname == 'docx' || extname == 'pdf' || extname == 'jpg' || extname == 'jepg')&&file.size<5*1024*1024) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            fileList[idIndex] = {"name": file.name, file: this.result};
            $("#uploadFileList").append('<div class="form-control uploadItem m-t-10" id="fileItem' + idIndex + '">' + file.name + '('+formatFileSize(file.size)+')<img src="delete.png" style="width: 16px; float: right; cursor: pointer" onclick="removeFile('+idIndex+')" /></div>');
            fileCount++;
            idIndex++;

        }
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



});













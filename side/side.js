window.onload = function () {
    const addItemBtn = document.getElementById('addItemBtn')

    addItemBtn.addEventListener('click', addItemToTable)

    function addItemToTable () {
        console.log('add item')
        const table = document.getElementById('table')
        //const currentIndex = table.rows.length

        // inserts a new row at the end of the table
        const currentRow = table.insertRow()
        currentRow.setAttribute('class', 'form-row')
        
        const itemInput = document.createElement('input')
        itemInput.setAttribute('class', 'form-control')

        const amountInput = document.createElement('input')
        amountInput.setAttribute('class', 'form-control')

        let currentCell = currentRow.insertCell()
        currentCell.setAttribute('class', 'col-9')
        currentCell.appendChild(itemInput)

        currentCell = currentRow.insertCell()
        currentCell.setAttribute('class', 'col-3')
        currentCell.appendChild(amountInput)
    }
}
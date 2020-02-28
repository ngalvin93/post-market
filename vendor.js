window.onload = function() {
    console.log('dom loaded!')
    // select form
    const selectForm = document.getElementById('selectForm')
    selectForm.addEventListener('change', function (e) {
        console.log('You selected', e.target.value)
        let selectedForm = e.target.value
        const listItemDiv = document.getElementById('list-item')
        if (selectedForm === 'Change Order') {
            listItemDiv.textContent = 'Change Order'
        } else if (selectedForm === 'Deposit Withdraw') {
            listItemDiv.textContent = 'Deposit Withdraw'
        } else {
            listItemDiv.textContent = ''
        }
    })

    // submit button
    const submitBtn = document.getElementById('submitBtn')
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault()
        submitForm()
    })

    function submitForm () {
        console.log('Submitted form')
    }
}


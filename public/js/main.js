document.querySelector('#delete').addEventListener('click', deleteQuote)

function deleteQuote () {
    return fetch('/deleteQuote', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        status: 200

    })
}
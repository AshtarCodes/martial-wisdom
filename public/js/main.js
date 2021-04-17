document.querySelector('#delete').addEventListener('click', deleteQuote)
document.querySelector('.quote-likes').addEventListener('click', addLikes)

const quoteAuthor = document.querySelector('.quote-name');
const quoteText = document.querySelector('.quote-text');
const quoteLikes = document.querySelector('.quote-likes');


async function addLikes() {
    const quoteId = this.parentElement.parentElement.dataset.id
    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'quoteId': quoteId
            })            
        })
        const data = await response.json()
        console.log(data);
        location.reload()
    } catch (err) {
        console.error(err);
    }
}

async function deleteQuote () {
    const deleteBtn = document.querySelector('#delete')
    const quoteId = this.parentElement.parentElement.dataset.id
    try{
        const response = await fetch('/deleteQuote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'quoteId': quoteId
            })    
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err){
        console.error(err);
    }
}
document.querySelector('#delete').addEventListener('click', deleteQuote)
document.querySelector('.quote-likes').addEventListener('click', addLikes)

const quoteAuthor = document.querySelector('.quote-name');
const quoteText = document.querySelector('.quote-text');
const quoteLikes = document.querySelector('.quote-likes');

async function addLikes() {
    try {
        const response = await fetch('addOneLike', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: quoteAuthor,
                quote: quoteText,
                likes: quoteLikes
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
    try{
        const response = await fetch('/deleteQuote', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: quoteAuthor,
                quote: quoteText,
                likes: quoteLikes
            })    
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err){
        console.error(err);
    }
}
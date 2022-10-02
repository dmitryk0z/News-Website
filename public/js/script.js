const API_KEY = 'b3e83b3f471c4c579cdb95644623558f'

const headers = new Headers()
const reqInit = { method: 'GET', headers: headers, mode: 'cors', cache: 'default' }

const COUNTRY = 'ie'
const CATEGORY = 'sports'


async function getNewsData(category) {
    const url = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=${category}&APIKEY=${API_KEY}`
    
    try {
        const response = await fetch(url, reqInit)
        const json = await response.json();
        displayData(json.articles)
    } catch (err) {
        console.log(err)
    }
}


function displayData(articles) {
    let output = articles.map(article => {
        if (!Object.values(article).some(value => value === null || value === "")) {
            const [newDate, newTime] = formatDateTime(article.publishedAt)

            return `<article>
                        <h4 class='title'>${article.title.split(' ').slice(0, 12).join(' ') + ' ...'}</h4>
                        <div class='authorTime'>
                            <p class='author'>Author: ${article.author.split(' ').slice(0, 2).join(' ')}</p>
                            <p class='dateTime'>${newDate}<br>${newTime}</p>
                        </div>
                        <img src=${article.urlToImage} alt='Article Image'd>
                        <p class='description'>${article.description.split(' ').slice(0, 10).join(' ') + '...'}
                            <a class='url' href=${article.url}><br>(Read More)</a>
                        </p>
                    </article>`
        }
    }).join('')

    document.getElementById('articles').innerHTML = output
}


function formatDateTime(dateTime) {
    const newDate = new Date(dateTime).toLocaleDateString('en-gb')
    const newTime = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(new Date(dateTime))

    return [newDate, newTime]
}


getNewsData(CATEGORY)

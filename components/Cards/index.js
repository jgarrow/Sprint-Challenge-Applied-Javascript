// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

axios
    .get('https://lambda-times-backend.herokuapp.com/articles')
    .then(response => {
        const topics = Object.entries(response.data.articles);

        topics.forEach(topic => {
            // topics[0] is the topic, topics[1] is an array of article objects
            topic[1].forEach(article => {
                const cardsContainer = document.querySelector('.cards-container');
                cardsContainer.appendChild(Card(article));
            })
        })

    })
    .catch(err => console.log('There was an error ', err))

function Card(article) {
    const card = document.createElement('div');
    const headline = document.createElement('div');
    const authorContainer = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const authorName = document.createElement('span');

    card.classList.add('card');
    headline.classList.add('headline');
    authorContainer.classList.add('author');
    imgContainer.classList.add('img-container');
    
    headline.textContent = article.headline;
    img.src = article.authorPhoto;
    authorName.textContent = `By ${article.authorName}`;

    imgContainer.appendChild(img);
    authorContainer.appendChild(imgContainer);
    authorContainer.appendChild(authorName);
    card.appendChild(headline);
    card.appendChild(authorContainer);

    return card;
}
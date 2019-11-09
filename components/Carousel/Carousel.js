/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="./assets/carousel/mountains.jpeg" />
    <img src="./assets/carousel/computer.jpeg" />
    <img src="./assets/carousel/trees.jpeg" />
    <img src="./assets/carousel/turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/

function Carousel() {
  const carousel = document.createElement('div');
  const leftBtn = document.createElement('div');
  const rightBtn = document.createElement('div');
  // const mountains = document.createElement('img');
  // const computer = document.createElement('img');
  // const trees = document.createElement('img');
  // const turntable = document.createElement('img');

  carousel.classList.add('carousel');
  leftBtn.classList.add('left-button');
  rightBtn.classList.add('right-button');

  // mountains.src = './assets/carousel/mountains.jpeg';
  // computer.src = './assets/carousel/computer.jpeg';
  // trees.src = './assets/carousel/trees.jpeg';
  // turntable.src = './assets/carousel/turntable.jpeg';

  carousel.appendChild(leftBtn);
  // carousel.appendChild(mountains);
  // carousel.appendChild(computer);
  // carousel.appendChild(trees);
  // carousel.appendChild(turntable);
  


  // get images
  let request = new XMLHttpRequest();
  request.responseType = 'document';
  request.open('GET', '/assets/carousel', true);

  request.onload = function() {
    console.log(request);
    console.log(this.status)
    if (this.status >= 200 && this.status < 400) {
      let resp = this.response;
      console.log('here');
      console.log(resp);
      let images = resp.getElementsByTagName('a');
      for (x of images) {
        if (x.href.match(/\.(jpe?g|png|gif)$/)) {
          console.log(x.href);
          let source = x.href.replace('http://127.0.0.1:5500/', './');
          console.log(source);
          let img = document.createElement('img');
          img.src = source;
          carousel.appendChild(img);
        }
      }

    } else {
      alert('There was an error. There might not be any images to display. Request returned status of ' + request.status);
    }
  };

  request.send();

  carousel.appendChild(rightBtn);

  return carousel;
}

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.appendChild(Carousel());
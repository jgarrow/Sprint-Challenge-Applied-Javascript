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

// array of carousel images
const carouselImages = [];

function Carousel() {
  const carousel = document.createElement("div");
  const leftBtn = document.createElement("div");
  const rightBtn = document.createElement("div");

  carousel.classList.add("carousel");
  leftBtn.classList.add("left-button");
  rightBtn.classList.add("right-button");

  carousel.appendChild(leftBtn);

  // get all images and append them to carousel (this method works even if more images get added/removed to the folder and we don't know it)
  let request = new XMLHttpRequest();
  request.responseType = "document";
  request.open("GET", "/assets/carousel", true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      	let resp = this.response;
      	let images = resp.getElementsByTagName("a");
		for (x of images) {
			if (x.href.match(/\.(jpe?g|png|gif)$/)) {
				// it was adding my live server stuff to the beginning, so we need to get rid of that for the image src
				let source = x.href.replace("http://127.0.0.1:5500/", "./");
				let img = document.createElement("img");
				img.src = source;
				carouselImages.push(img);
				carousel.appendChild(img);
			}
		}

		console.log(carouselImages);
		const numOfImages = carouselImages.length;
		console.log(numOfImages);

		//   initalize image positions
		carouselImages[0].style.display = "block";
		// carouselImages.forEach((image, index) => {
			// image.style.display = 'block';
			// image.style.position = "relative";

		// 	leftBtn.addEventListener('click', () => {
		// 		if (carouselImages[0].style.display === 'block') {
		// 			carouselImages[carouselImages.length - 1].style.display = 'block';
		// 			carouselImages[0].style.display = 'none';
		// 		} else if (image.style.display === 'block') {

		// 		}
		// 	})
		// });
	  
		for (let i = 0; i < numOfImages; i++) {
			leftBtn.addEventListener('click', () => {
				if (carouselImages[i].style.display === 'block') {
					carouselImages[i].style.display = 'none';
					console.log(carouselImages[i])
					
					// if the 'last' image is displayed, the 'first' one should now be displayed
					if (i === numOfImages - 1) {
						carouselImages[0].style.display = 'block';
						
					} else {
						carouselImages[i + 1].style.display = 'block';
						
					}

				}
			})

			// rightBtn.addEventListener('click', () => {
			// 	if (carouselImages[i].style.display === 'block') {
			// 		carouselImages[i - 1].style.display = 'block';
			// 		carouselImages[i].style.display = 'none';
					

			// 	}
			// })
		}

    } else {
      alert(
        "There was an error. There might not be any images to display. Request returned status of " + request.status
      );
    }
  };

  request.send();

  carousel.appendChild(rightBtn);

  return carousel;
}

const carouselContainer = document.querySelector(".carousel-container");
carouselContainer.appendChild(Carousel());

// console.log(carouselImages);

// carouselImages[0].style.display = 'block';

// set index of first image to 1
// set index of other images to 2, 3, 4, etc.
// if index === 1 --> display: block
// else --> display: none
// if rightBtn is clicked --> index of current = last index num, index of others = -1
// if leftBtn is clicked --> index of last = 1, index of rest = +1

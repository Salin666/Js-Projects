const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
 // API
 //ready boolean when the page loaded need to be false
 let ready = false;
 let imagesLoaded= 0;
 //track the total images
 let totalImages = 0;

const count = 5;
const apiKey ='AIquDSr4mx98MDR1B4HKb8_hBoWsrTbLXZIhSJCP6_w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let isInitialLoad = true // NEW LINE ****

//check if all images were loaded

function imageLoaded(){
    //call image and load image 
    // console.log('images loaded');
    imagesLoaded ++;


   if(imagesLoaded === totalImages){
       ready = true;
    //    console.log( 'ready=', ready);
       //when load image show the loader
       loader.hidden= true;
  
       count = 30;
   };
}




//create element for link & photos, add to dom
 
function displayPhotos(){
    imagesLoaded = 0;
    //no of photos loaded
    totalImages = photosArray.length;
    // console.log('total Image:', totalImages);
    //run funcation for each object in photosArray
    photosArray.forEach((photo) => {
    //Create <a> to link to Unplash 
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target' , '_blank');
    //make <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    /*// Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    }); */

// event Listener, check when each is finished loading
img.addEventListener('load', imageLoaded);


    //put img inside "a" then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}
 



//Helper function to Set Attributes on DOM Elements

// function setAttributes(element, Attributes){
//     for (const key in attributes){
//         element.setAttribute(key, attributes[key]);
//     }
// }


// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
       photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) { // NEW LINE ****
            updateAPIURLWithNewCount(30) // NEW LINE ****
            isInitialLoad = false // NEW LINE ****
          } // NEW LINE ****
      
    }catch (error) {
        // Catch error
    }
}

// check if scrolling is near bottom of page if it is  then load more photos

//   if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000){
    //       console.log('window.innerHeight:' , window.innerHeight);
    //     console.log( 'window.scrollY:', window.scrollY
    // );
    // console.log('window.innerHeight + Scroll:', window.innerHeight + window.scrollY);
    
    // console.log('document.body.offsetHeight-1000:' , document.body.offsetHeight -1000);
    window.addEventListener('scroll', () =>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    // getPhotos(); method one 
    ready = false
    //show loader when it reaches the
loader.hidden = false;
    getPhotos();
    //load more
// console.log('load more');
  }
  
    // console.log("scrolled");
} );
 
getPhotos();

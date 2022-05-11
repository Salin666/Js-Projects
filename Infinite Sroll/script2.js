const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
 
let ready=false;
let imagesLoaded = 0;
let totalImages = 0;
 
 
let photoArray =[];
 
 
const count = 10;
const apiKey= '-SAibyvdBYznONS3FuEhIKqxAeAz7pXmKfPAaHTxQH8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
 
function displayPhotos()
{
    photoArray.forEach((photo)=>{
        //Create <a> to link unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        //create images for photo
 
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        //put <img > inside a
        item.appendChild(img);
        imageContainer.appendChild(item);
 
 
    });
}
 
//Get photoes from API
async function getPhotos()
{ 
    
    try{
        
        const response = await fetch(apiUrl);
       
     photoArray = await response.json();
       // console.log(photoArray);
        displayPhotos();
        //console.log(data);
       
    }
    catch(error)
    {
 
    }
}
getPhotos();
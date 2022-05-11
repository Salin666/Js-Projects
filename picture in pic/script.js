const videoEl = document.getElementById('video');
const button = document.getElementById('button');

//prompt to select media, pass the element, then play
// async new js feature
async function selectMediaStream(){
try{
const mediaStream = await navigator.mediaDevices.getDisplayMedia();
videoEl.srcObject= mediaStream;
videoEl.onloadedmetadata = () =>{
    videoEl.play();
    }
    }catch(error){
    //catch error here
    console.log('error', error)
    }

}

    
    button.addEventListener('click', async () => {
    //if request is there  then the button will remain open
    button.disabled = true;

    //start picture in picture 
    
     await videoEl.requestPictureInPicture();
    //reset button
    //If failed to request button remain disabled
     button.disabled = false;

});

selectMediaStream();
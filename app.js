const mainWrapper = document.getElementById('main-wrapper');

const loading = document.querySelector('.loader');

// get the images
let limit =7;
let page = 1;

async function getPhotos(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`);
   
    const data = await response.json();
    return data;
}



// listen for scroll event and load more images if we reach the bottom of window
async function showPhotos(){
    const photos = await getPhotos();
    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('albums');
        photoElement.innerHTML = `
        <div class="album-info">
            <p>${photo.title}</p>
        </div>`;
        mainWrapper.appendChild(photoElement);
    });
}

function showLoading(){
    loading.classList.add('show');
    setTimeout(()=>{
        loading.classList.remove('show');

        setTimeout(()=>{
            page++;
            showPhotos();
        },3000)
    },1000);
}
showPhotos();
window.addEventListener('scroll', ()=>{
    const { scrollTop , scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight -6){
        showLoading();
    }
});

const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];


// Function to download an image
function downloadImage(url) {
    return new Promise(function (resolve, reject) {

        const img = new Image();

        img.onload = function () {
            resolve(img);
        };

        img.onerror = function () {
            reject("Failed to download image: " + url);
        };

        img.src = url;
    });
}


// Download all images
function downloadImages() {

    // Show loading
    loading.innerText = "Loading...";
    loading.style.display = "block";

    // Clear previous messages
    error.innerText = "";
    output.innerHTML = "";

    const promises = images.map(function (image) {
        return downloadImage(image.url);
    });

    Promise.all(promises)
        .then(function (downloadedImages) {

            // Hide loading
            loading.style.display = "none";

            // Display all images
            downloadedImages.forEach(function (img) {
                output.appendChild(img);
            });

        })
        .catch(function (err) {

            // Hide loading
            loading.style.display = "none";

            // Show error
            error.innerText = err;
        });
}


// Button click
btn.addEventListener("click", downloadImages);

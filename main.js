// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/m6C8N2WlY/"; // Placeholder - please replace with your actual model URL

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.innerHTML = ""; // Clear previous content
    webcamContainer.appendChild(webcam.canvas);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ""; // Clear previous content
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        const div = document.createElement("div");
        div.className = "prediction-label";
        labelContainer.appendChild(div);
    }

    // Hide start button
    document.querySelector('.start-button').style.display = 'none';
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
        
        // Dynamic styling for probability bars could be added here
    }
}

// Theme Toggle Logic
const themeButton = document.getElementById('theme-button');
const body = document.body;

// Check for saved theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
}

themeButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});
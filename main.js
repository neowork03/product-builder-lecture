// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/m6C8N2WlY/";

let model, labelContainer, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";
    for (let i = 0; i < maxPredictions; i++) {
        const div = document.createElement("div");
        div.className = "prediction-label";
        labelContainer.appendChild(div);
    }
}

// Function to read the uploaded image and start prediction
async function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const img = document.getElementById("face-image");
            img.src = e.target.result;
            img.style.display = "block";
            
            // Show loading or clear previous results
            document.getElementById("label-container").innerHTML = "분석 중...";
            
            if (!model) await init();
            await predict();
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Predict the animal face from the uploaded image
async function predict() {
    const image = document.getElementById("face-image");
    const prediction = await model.predict(image);
    
    labelContainer.innerHTML = ""; // Clear "분석 중..."
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
        
        const div = document.createElement("div");
        div.className = "prediction-label";
        div.innerHTML = classPrediction;
        labelContainer.appendChild(div);
    }
}

// Theme Toggle Logic
const themeButton = document.getElementById('theme-button');
const body = document.body;

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
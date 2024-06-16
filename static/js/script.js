// Base x and y positions for the entire interface
let baseX = 400;
let baseY = 50;
const inputSpacing = 50;
const inputWidth = 150;
const inputHeight = 25;


const positions = {
    나이Input: { left: baseX, top: baseY, width: inputWidth, height: inputHeight },
    체중Input: { left: baseX, top: baseY, width: inputWidth, height: inputHeight },
    허리둘레Input: { left: baseX, top: baseY + inputSpacing, width: inputWidth, height: inputHeight },
    근력운동일Input: { left: baseX, top: baseY + 2 * inputSpacing, width: inputWidth, height: inputHeight },
    유산소운동일Input: { left: baseX, top: baseY + 3 * inputSpacing, width: inputWidth, height: inputHeight },
    음주회수Input: { left: baseX, top: baseY + 4 * inputSpacing, width: inputWidth, height: inputHeight },
    음주회수Input2: { left: baseX, top: baseY + 5 * inputSpacing, width: inputWidth, height: inputHeight },
    금연여부Input: { left: baseX, top: baseY + 6 * inputSpacing, width: inputWidth, height: inputHeight },
};

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("formContainer").style.height = "500px";

    const style = document.createElement("style");
    style.innerHTML = `
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    input[type="number"] {
        -moz-appearance: textfield;
    }
    `;
    document.head.appendChild(style);

    function restrictNonNegative(event) {
        const char = String.fromCharCode(event.which);
        const isValid = /^[0-9.]+$/.test(char);

        if (!isValid && event.key !== "Backspace") {
            event.preventDefault();
        }
    }

    function restrictNonNegativeLessThan7(event) {
        const char = String.fromCharCode(event.which);
        const inputElement = event.target;

        if (/^[0-9.]+$/.test(char) || event.key === "Backspace") {
            const newValue = parseFloat(inputElement.value + char);

            if (newValue > 7) {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    }

    positionPoweredBy(baseX, baseY + 900);
    const nnSettings = {
        architecture: [7, 7, 6, 5, 10], // Defines the number of neurons in each layer
        neuronRadius: 15,
        layerSpacing: 150,
        neuronSpacing: 60,
        colors: { input: 'none', hidden: '#2ecc71', output: 'none' },
        startX: baseX + 160,
        startY: baseY + 35,
    };

    const svg = document.getElementById("neuralNetworkSvg");

    const maxLayerHeight = Math.max(...nnSettings.architecture) * nnSettings.neuronSpacing;
    const svgHeight = nnSettings.startY * 2 + maxLayerHeight;
    svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svgHeight}`);
    svg.setAttribute("height", svgHeight.toString());

    function drawNeuron(x, y, color) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", nnSettings.neuronRadius);
        circle.setAttribute("fill", color);
        svg.appendChild(circle);
    }

    function drawConnection(startX, startY, endX, endY) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", endY);
        line.setAttribute("stroke", "#bdc3c7");
        line.setAttribute("stroke-width", "2");
        svg.appendChild(line);
    }

    function generateNeuralNetwork(settings) {
        let prevLayerCenters = [];
        settings.architecture.forEach((numNeurons, layerIndex) => {
            const layerX = settings.startX + settings.layerSpacing * layerIndex;
            const layerHeight = numNeurons * settings.neuronSpacing;
            const startY = (maxLayerHeight - layerHeight) / 2 + settings.startY;
            let currentLayerCenters = [];

            for (let i = 0; i < numNeurons; i++) {
                const neuronY = startY + (i * settings.neuronSpacing);
                const color = layerIndex === 0 ? settings.colors.input
                    : (layerIndex === settings.architecture.length - 1 ? settings.colors.output
                        : settings.colors.hidden);
                drawNeuron(layerX, neuronY, color);
                currentLayerCenters.push({ x: layerX, y: neuronY });

                // Draw connections to the previous layer
                if (layerIndex > 0) {
                    prevLayerCenters.forEach(prevCenter => drawConnection(prevCenter.x, prevCenter.y, layerX, neuronY));
                }
            }

            prevLayerCenters = currentLayerCenters;
        });
    }

    generateNeuralNetwork(nnSettings);

    const baseLeft = baseX;
    const baseTop = baseY + 85;
    const inputSpacing = 60;
    const inputWidth = 150;
    const inputHeight = 25;
    const leftscale = 209
    const topscale = 25

    const positions = {
        나이Input: { left: baseLeft - leftscale, top: baseTop + topscale, width: inputWidth, height: inputHeight },
        체중Input: { left: baseLeft - leftscale, top: baseTop + topscale + inputSpacing, width: inputWidth, height: inputHeight },
        허리둘레Input: { left: baseLeft - leftscale, top: baseTop + topscale + 2 * inputSpacing, width: inputWidth, height: inputHeight },
        근력운동일Input: { left: baseLeft - leftscale, top: baseTop + topscale + 3 * inputSpacing, width: inputWidth, height: inputHeight },
        유산소운동일Input: { left: baseLeft - leftscale, top: baseTop + topscale + 4 * inputSpacing-10, width: inputWidth, height: inputHeight },
        음주회수Input: { left: baseLeft - leftscale, top: baseTop + topscale + 5 * inputSpacing, width: (inputWidth + 8) / 2.5, height: inputHeight + 6 },
        음주회수Input2: { left: baseLeft - leftscale, top: baseTop + topscale + 5 * inputSpacing, width: inputWidth / 5, height: inputHeight },
        금연여부Input: { left: baseLeft - leftscale, top: baseTop + topscale + 6 * inputSpacing-15, width: inputWidth + 10, height: inputHeight + 6 },
    };

    // Form input labels
    const inputLabels = {
        나이Input: "Age",
        체중Input: "Weight (kg)",
        허리둘레Input: "Waist Circumference (cm)",
        근력운동일Input: "Number of strength training days per week",
        유산소운동일Input: "How many days per week do you do moderate physical activity?",
        음주회수Input: "Frequency of drinks",
        음주회수Input2: "",
        금연여부Input: "Have you ever smoked more than 5 packs of cigarettes in your life?",
    };

    // 술마시는 횟수
    const drinkingFrequencyContainer = document.createElement("div");
    drinkingFrequencyContainer.className = "input-group";
    drinkingFrequencyContainer.style.position = "absolute";
    drinkingFrequencyContainer.style.left = `${positions.음주회수Input.left}px`;
    drinkingFrequencyContainer.style.top = `${positions.음주회수Input.top}px`;
    drinkingFrequencyContainer.style.display = "flex";
    drinkingFrequencyContainer.style.flexDirection = "row";
    drinkingFrequencyContainer.style.alignItems = "center";


    const drinkingFrequencyLabel = document.createElement("label");
    drinkingFrequencyLabel.innerText = inputLabels.음주회수Input;
    drinkingFrequencyLabel.className = "label";
    drinkingFrequencyLabel.style.width = "200px";
    drinkingFrequencyLabel.style.textAlign = "right";
    drinkingFrequencyLabel.style.marginRight = "10px";

    const drinkingFrequencyDropdown = document.createElement("select");
    drinkingFrequencyDropdown.id = "음주회수Input";
    drinkingFrequencyDropdown.style.width = `${positions.음주회수Input.width}px`;
    drinkingFrequencyDropdown.style.height = `${positions.음주회수Input.height}px`;

    const choices = ['Abstinent', 'Yearly', 'Monthly', 'Weekly'];
    choices.forEach((choice) => {
        const option = document.createElement("option");
        option.value = choice;
        option.text = choice;
        drinkingFrequencyDropdown.appendChild(option);
    });

    const atText = document.createElement("span");
    atText.innerText = "";
    atText.style.marginLeft = "0px";
    atText.style.marginRight = "10px";

    const drinkingFrequencyNumber = document.createElement("input");
    drinkingFrequencyNumber.id = "음주회수Input2";
    drinkingFrequencyNumber.type = "number";
    drinkingFrequencyNumber.addEventListener("keypress", restrictNonNegative);
    drinkingFrequencyNumber.style.width = `${positions.음주회수Input2.width}px`;
    drinkingFrequencyNumber.style.height = `${positions.음주회수Input2.height}px`;

    const timesText = document.createElement("span");
    timesText.innerText = "time(s)";
    timesText.style.marginLeft = "0px";

    drinkingFrequencyContainer.appendChild(drinkingFrequencyLabel);
    drinkingFrequencyContainer.appendChild(drinkingFrequencyDropdown);
    drinkingFrequencyContainer.appendChild(atText);
    drinkingFrequencyContainer.appendChild(drinkingFrequencyNumber);
    drinkingFrequencyContainer.appendChild(timesText);

    document.getElementById("formContainer").appendChild(drinkingFrequencyContainer);

    for (const [key, { left, top, width, height }] of Object.entries(positions)) {
        if (key === "음주회수Input2" || key === "음주회수Input") {
            continue;
        }
        const container = document.createElement("div");
        container.className = "input-group";
        container.style.position = "absolute";
        container.style.left = `${left}px`;
        container.style.top = `${top}px`;
        container.style.display = "flex";
        container.style.flexDirection = "row";
        container.style.alignItems = "center";

        const label = document.createElement("label");
        label.htmlFor = key;
        label.innerText = inputLabels[key];
        label.className = "label";
        label.style.width = "200px";
        label.style.textAlign = "right";
        label.style.marginRight = "10px";

        let input;
        if (key === "음주회수Input" || key === "금연여부Input") {
            input = document.createElement("select");
            const choices = key === "음주회수Input" ? ['금주', '1년', '한달', '일주일'] : ['No', 'Yes'];

            choices.forEach(choice => {
                const option = document.createElement("option");
                option.value = choice;
                option.text = choice;
                input.appendChild(option);
            });
        } else if (key === "근력운동일Input" || key === "유산소운동일Input") {
            input = document.createElement("input");
            input.type = "number";
            input.addEventListener("keypress", restrictNonNegativeLessThan7);
        } else {
            input = document.createElement("input");
            input.type = "number";
            input.addEventListener("keypress", restrictNonNegative);
        }

        input.id = key;
        input.style.width = `${width}px`;
        input.style.height = `${height}px`;

        container.appendChild(label);
        container.appendChild(input);

        document.getElementById("formContainer").appendChild(container);
    }

    const formContainer = document.getElementById("formContainer");
    formContainer.style.height = `${baseTop + 7 * inputSpacing + 60}px`;

    addOutputBoxAndImage();

    // Async function to fetch initial data and populate form
    (async function () {
        await fetchInitialData();
        await fetchPrediction();
    })();

    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default action to stop form submission
            animateNeuralNetwork();
            setTimeout(() => {
                fetchPrediction();
            }, 1200);
        }
    });
    document.getElementById("predictButton").addEventListener("click", function () {
        animateNeuralNetwork();
        setTimeout(() => {
            fetchPrediction();
        }, 1200);
    });
});

function animateNeuralNetwork() {
    const svg = document.getElementById("neuralNetworkSvg");
    const ns = "http://www.w3.org/2000/svg";
    const lines = svg.querySelectorAll("line");

    lines.forEach((line, index) => {
        const x1 = line.getAttribute("x1");
        const y1 = line.getAttribute("y1");
        const x2 = line.getAttribute("x2");
        const y2 = line.getAttribute("y2");

        const overlayLine = document.createElementNS(ns, "line");
        overlayLine.setAttribute("x1", x1);
        overlayLine.setAttribute("y1", y1);
        overlayLine.setAttribute("x2", x2);
        overlayLine.setAttribute("y2", y2);
        overlayLine.setAttribute("stroke", "black");
        overlayLine.setAttribute("stroke-width", "2");

        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        overlayLine.style.strokeDasharray = length;
        overlayLine.style.strokeDashoffset = length;
        svg.appendChild(overlayLine);

        setTimeout(() => {
            overlayLine.style.transition = "stroke-dashoffset 0.2s ease-in-out";
            overlayLine.style.strokeDashoffset = '0';
        }, index * 10); // Sequential delay for each line

        // Retract the line after the initial drawing animation
        setTimeout(() => {
            const totalLength = overlayLine.getTotalLength();
            overlayLine.style.transition = 'stroke-dashoffset 1s ease-in-out';
            overlayLine.style.strokeDashoffset = -totalLength + 'px';
        }, 30 + index * 10); // Adjust timing based on the initial drawing animation

        setTimeout(() => {
            svg.removeChild(overlayLine);
        }, 1000 + index * 10);
    });
}

async function fetchInitialData() {
    try {
        const response = await fetch('/initial_fetch_prediction');
        const data = await response.json();
        console.log(data);
        let index = 0;
        for (const key in positions) {
            console.log(`Trying to access element with ID: ${key}`);

            const element = document.getElementById(key);

            if (element) {
                if (key === "나이Input") {
                    element.value = data[15];
                    index--;
                }
                else if (key === "음주회수Input" || key === "금연여부Input") {
                    const selectedIndex = parseInt(data[index]); // Convert to integer
                    if (element.tagName === "SELECT" && selectedIndex < element.options.length) {
                        element.selectedIndex = selectedIndex; // Set the correct option
                        console.log("음주회수Input" + selectedIndex);
                    }
                } else {
                    element.value = data[index];
                }
                index++; // Move to the next data point

            } else {
                console.error(`Element with ID ${key} not found.`);
            }
        }
    } catch (error) {
        console.error("Error fetching initial data:", error);
    }
}

function addOutputBoxAndImage() {

    const baseLeft = baseX + 760;
    const baseTop = baseY + 0;
    const inputSpacing = 60;
    const inputWidth = 150;
    const inputHeight = 25;

    const positions = {
        수축기혈압Output: { left: baseLeft, top: baseTop, width: inputWidth, height: inputHeight },
        이완기혈압Output: { left: baseLeft, top: baseTop + inputSpacing, width: inputWidth, height: inputHeight },
        체질량지수Output: { left: baseLeft, top: baseTop + 2 * inputSpacing, width: inputWidth, height: inputHeight },
        중성지방Output: { left: baseLeft, top: baseTop + 3 * inputSpacing, width: inputWidth, height: inputHeight },
        사구체여과율Output: { left: baseLeft, top: baseTop + 4 * inputSpacing, width: inputWidth, height: inputHeight },
        공복혈당Output: { left: baseLeft, top: baseTop + 5 * inputSpacing, width: inputWidth, height: inputHeight },
        HDLOutput: { left: baseLeft, top: baseTop + 6 * inputSpacing, width: inputWidth, height: inputHeight },
        LDLOutput: { left: baseLeft, top: baseTop + 7 * inputSpacing, width: inputWidth, height: inputHeight },
        ALTOutput: { left: baseLeft, top: baseTop + 8 * inputSpacing, width: inputWidth, height: inputHeight },
        ASTOutput: { left: baseLeft, top: baseTop + 9 * inputSpacing, width: inputWidth, height: inputHeight },
    };

    const inputLabels = {
        수축기혈압Output: "Systolic BP (mmHg)",
        이완기혈압Output: "Diastolic BP (mmHg)",
        체질량지수Output: "BMI (kg/m<sup>2</sup>)",
        중성지방Output: "Triglyceride (mg/dL)",
        사구체여과율Output: "Glomerular filtration rate (ml/min)",
        공복혈당Output: "Fasting Blood Sugar (mg/dL)",
        HDLOutput: "HDL-Cholesterol (mg/dL)",
        LDLOutput: "LDL-Cholesterol (mg/dL)",
        ALTOutput: "ALT (IU/L)",
        ASTOutput: "AST (IU/L)",
    };

    const formContainer = document.getElementById("formContainer");

    for (const [key, { left, top, width, height }] of Object.entries(positions)) {
        const outputContainer = document.createElement("div");
        outputContainer.className = "output-group";
        outputContainer.style.position = "absolute";
        outputContainer.style.left = `${left}px`;
        outputContainer.style.top = `${top}px`;

        const label = document.createElement("label");
        label.htmlFor = key;
        label.innerHTML = inputLabels[key];
        label.className = "label";
        outputContainer.appendChild(label);

        const outputBox = document.createElement("input");
        outputBox.id = key;
        outputBox.type = "text";
        outputBox.disabled = true; // Make it read-only.
        outputBox.style.width = `${width}px`;
        outputBox.style.height = `${height}px`;

        outputContainer.appendChild(outputBox);
        formContainer.appendChild(outputContainer);
    }

    formContainer.style.height = `${baseTop + 6 * inputSpacing}px`;

}

function positionPoweredBy(x, y) {
    const poweredBy = document.getElementById('poweredBy');
    poweredBy.style.position = 'absolute';
    poweredBy.style.left = `${x}px`;
    poweredBy.style.top = `${y}px`;
}

// Fetch prediction based on form input values
async function fetchPrediction() {
    // Ensure values are sent as floats, appending ".0" if they are whole numbers
    try {
        // Fetch initial data
        const response = await fetch('/initial_fetch_prediction');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Initial data:", data);

        const updatedData = [...data];

        updatedData[0] = parseFloat(document.getElementById("체중Input").value).toFixed(1);
        updatedData[1] = parseFloat(document.getElementById("허리둘레Input").value).toFixed(1);
        updatedData[2] = parseFloat(document.getElementById("근력운동일Input").value).toFixed(1);
        updatedData[3] = parseFloat(document.getElementById("유산소운동일Input").value).toFixed(1);
        updatedData[4] = parseFloat(document.getElementById("음주회수Input").selectedIndex).toFixed(1);
        updatedData[5] = parseFloat(document.getElementById("음주회수Input2").value).toFixed(1);
        updatedData[6] = parseFloat(document.getElementById("금연여부Input").selectedIndex).toFixed(1);

        updatedData[15] = parseFloat(document.getElementById("나이Input").value).toFixed(1);

        console.log(updatedData);
        // Construct the query using the updated first five elements
        const queryParams = updatedData.map((item) => parseFloat(item).toFixed(1)).join('/');
        const query = `/predict_val/${queryParams}`; // Fetch prediction data based on constructed query
        const predictionResponse = await fetch(query);

        if (!predictionResponse.ok) {
            throw new Error(`HTTP error! status: ${predictionResponse.status}`);
        }

        const predictionData = await predictionResponse.json();
        console.log("Prediction data:", predictionData);
        
        if (predictionData.prediction[0].toFixed(2)>160){
            document.getElementById('수축기혈압Output').style.color = "#8B0000"
        } else if (predictionData.prediction[0].toFixed(2)>129){
            document.getElementById('수축기혈압Output').style.color = "#FF8C00"
        } else {
            document.getElementById('수축기혈압Output').style.color = "green"
        }

        if (predictionData.prediction[1].toFixed(2)>100){
            document.getElementById('이완기혈압Output').style.color = "#8B0000"
        } else if (predictionData.prediction[1].toFixed(2)>84){
            document.getElementById('이완기혈압Output').style.color = "#FF8C00"
        } else {
            document.getElementById('이완기혈압Output').style.color = "green"
        }

        if (predictionData.prediction[2].toFixed(2)>30){
            document.getElementById('체질량지수Output').style.color = "#8B0000"
        } else if (predictionData.prediction[2].toFixed(2)>24){
            document.getElementById('체질량지수Output').style.color = "#FF8C00"
        } else {
            document.getElementById('체질량지수Output').style.color = "green"
        }

        if (predictionData.prediction[3].toFixed(2)>200){
            document.getElementById('중성지방Output').style.color = "#8B0000"
        } else if (predictionData.prediction[3].toFixed(2)>149){
            document.getElementById('중성지방Output').style.color = "#FF8C00"
        } else {
            document.getElementById('중성지방Output').style.color = "green"
        }

        if (predictionData.prediction[4].toFixed(2)<30){
            document.getElementById('사구체여과율Output').style.color = "#8B0000"
        } else if (predictionData.prediction[4].toFixed(2)<60){
            document.getElementById('사구체여과율Output').style.color = "#FF8C00"
        } else {
            document.getElementById('사구체여과율Output').style.color = "green"
        }

        if (predictionData.prediction[5].toFixed(2)>127){
            document.getElementById('공복혈당Output').style.color = "#8B0000"
        } else if (predictionData.prediction[5].toFixed(2)>100){
            document.getElementById('공복혈당Output').style.color = "#FF8C00"
        } else {
            document.getElementById('공복혈당Output').style.color = "green"
        }

        if (predictionData.prediction[6].toFixed(2)>60){
            document.getElementById('HDLOutput').style.color = "#8B0000"
        } else if (predictionData.prediction[6].toFixed(2)>39){
            document.getElementById('HDLOutput').style.color = '#FF8C00'
        } else {
            document.getElementById('HDLOutput').style.color = "green"
        }

        if (predictionData.prediction[7].toFixed(2)>127){
            document.getElementById('LDLOutput').style.color = "#8B0000"
        } else if (predictionData.prediction[7].toFixed(2)>100){
            document.getElementById('LDLOutput').style.color = '#FF8C00'
        } else {
            document.getElementById('LDLOutput').style.color = "green"
        }

        if (predictionData.prediction[8].toFixed(2)>100){
            document.getElementById('ALTOutput').style.color = "#8B0000"
        } else if (predictionData.prediction[8].toFixed(2)>40){
            document.getElementById('ALTOutput').style.color = '#FF8C00'
        } else {
            document.getElementById('ALTOutput').style.color = "green"
        }

        if (predictionData.prediction[9].toFixed(2)>100){
            document.getElementById('ASTOutput').style.color = "#8B0000"
        } else if (predictionData.prediction[9].toFixed(2)>40){
            document.getElementById('ASTOutput').style.color = "#FF8C00"
        } else {
            document.getElementById('ASTOutput').style.color = "green"
        }

        document.getElementById('수축기혈압Output').value = `${predictionData.prediction[0].toFixed(2)}`;
        document.getElementById('이완기혈압Output').value = `${predictionData.prediction[1].toFixed(2)}`;
        document.getElementById('체질량지수Output').value = `${predictionData.prediction[2].toFixed(2)}`;
        document.getElementById('중성지방Output').value = `${predictionData.prediction[3].toFixed(2)}`;
        document.getElementById('사구체여과율Output').value = `${predictionData.prediction[4].toFixed(2)}`;
        document.getElementById('공복혈당Output').value = `${predictionData.prediction[5].toFixed(2)}`;
        document.getElementById('HDLOutput').value = `${predictionData.prediction[6].toFixed(2)}`;
        document.getElementById('LDLOutput').value = `${predictionData.prediction[7].toFixed(2)}`;
        document.getElementById('ALTOutput').value = `${predictionData.prediction[8].toFixed(2)}`;
        document.getElementById('ASTOutput').value = `${predictionData.prediction[9].toFixed(2)}`;

    } catch (error) {
        console.error("Error fetching prediction:", error);
    }
}

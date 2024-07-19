async function fetchTyrePressureData() {
    const response = await fetch('tyrePressureData.json');
    const data = await response.json();
    return data;
}

async function searchTyrePressure() {
    const vehicleType = document.getElementById('vehicleType').value;
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const currentPressure = parseFloat(document.getElementById('currentPressure').value.trim());

    if (make === '' || model === '' || isNaN(currentPressure)) {
        alert('Please enter vehicle make, model, and current tyre pressure.');
        return;
    }

    const formattedMake = make.charAt(0).toUpperCase() + make.slice(1).toLowerCase();
    const formattedModel = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();

    const tyrePressureData = await fetchTyrePressureData();
    const vehicleData = tyrePressureData[vehicleType];

    if (vehicleData && vehicleData.hasOwnProperty(formattedMake) && vehicleData[formattedMake].hasOwnProperty(formattedModel)) {
        const tyrePressureInfo = vehicleData[formattedMake][formattedModel];
        let resultText = `
            <strong>${formattedMake} ${formattedModel}</strong><br>
            Optimum Tyre Pressure: ${tyrePressureInfo.pressure} PSI<br>`;

        if (currentPressure < tyrePressureInfo.pressure) {
            const difference = tyrePressureInfo.pressure - currentPressure;
            resultText += `<strong>Current Tyre Pressure:</strong> ${currentPressure} PSI<br>`;
            resultText += `<strong>Low Pressure Effects:</strong> ${tyrePressureInfo.low}<br>`;
            resultText += `<strong>Action Needed:</strong> Increase tyre pressure by ${difference} PSI.<br>`;
            resultText += `<strong>Warning:</strong> Tyre pressure is too low! Low pressure can lead to reduced fuel efficiency, increased tyre wear, and poor handling.`;
        } else if (currentPressure > tyrePressureInfo.pressure) {
            const difference = currentPressure - tyrePressureInfo.pressure;
            resultText += `<strong>Current Tyre Pressure:</strong> ${currentPressure} PSI<br>`;
            resultText += `<strong>High Pressure Effects:</strong> ${tyrePressureInfo.high}<br>`;
            resultText += `<strong>Action Needed:</strong> Decrease tyre pressure by ${difference} PSI.<br>`;
            resultText += `<strong>Warning:</strong> Tyre pressure is too high! High pressure can lead to a harsher ride, increased risk of blowouts, and uneven tyre wear.`;
        } else {
            resultText += `<strong>Current Tyre Pressure:</strong> ${currentPressure} PSI<br>`;
            resultText += `<strong>Action Needed:</strong> Tyre pressure is optimum. No adjustment needed.`;
        }

        document.getElementById('result').innerHTML = resultText;
    } else {
        document.getElementById('result').innerHTML = `<strong>${formattedMake} ${formattedModel}</strong> - Tyre pressure information not found.`;
    }
}


function calculatePressure() {
    const load = document.getElementById('load').value;

    // Basic validation to ensure load is a number
    if (isNaN(load) || load <= 0) {
        document.getElementById('calcResult').innerText = 'Please enter a valid load value.';
        return;
    }

    // Example formula to calculate tyre pressure based on load
    // This is a simple placeholder formula and should be replaced with a proper calculation
    const basePressure = 30; // Base pressure in PSI
    const pressurePerKg = 0.1; // Additional pressure per kg of load
    const calculatedPressure = basePressure + (load * pressurePerKg);

    document.getElementById('calcResult').innerText = `Calculated tyre pressure based on load is ${calculatedPressure.toFixed(2)} PSI.`;
}
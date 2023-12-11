var selectedBodyParts;
var selectedSymptoms;
var userType;
var painSlider;

function init() {

    // Initialize fields
    selectedBodyParts = []
    selectedSymptoms = []
    userType = 'Patient';
    painSlider = document.getElementById('painLevel');

    // Add listeners
    painSlider.addEventListener('input', function () { updateBackgroundColor(); });
}

function toggleButton(buttonId, word) {
    var button = document.getElementById(buttonId);
    var textBox = document.getElementById('bodyPartChosen');
    button.classList.toggle('selected');
    
    // Toggle body part selected and apply change to the text box
    if (button.classList.contains('selected')) {
        button.style.border = '5px solid rgb(160, 2, 2)';
        selectedBodyParts.push(word);
    } else {
        button.style.border = 'none';
        selectedBodyParts = selectedBodyParts.filter(part => part !== word);
    }
    
    // Set contents of text box to have the selected body part
    textBox.value = selectedBodyParts.join(', ');
    textBox.rows = selectedBodyParts.length + 1; 
}

function toggleSymptoms(word) {
    var textBox = document.getElementById('symptomsChosen');
    var index = selectedSymptoms.indexOf(word);

    // Add symptom to the list of symptoms
    if (index === -1) selectedSymptoms.push(word);
    else selectedSymptoms.splice(index, 1);
    
    // Add addition styles to format the selections like a list
    textBox.value = selectedSymptoms.join(', ');
    textBox.rows = selectedSymptoms.length + 1;
}


function switchUserType() {
    userType = (userType === 'Hospital Staff') ? 'Patient' : 'Hospital Staff';
    document.getElementById('switchButton').textContent = userType;

    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const patientInputs = document.getElementById('patientInputs');

    // Display options differently if the user is a doctor or a patient
    if (userType === 'Patient') {
        usernameInput.style.display = 'none';
        passwordInput.style.display = 'none';
        patientInputs.style.display = 'block';
    } else {
        usernameInput.style.display = 'block';
        passwordInput.style.display = 'block';
        patientInputs.style.display = 'none';
    }
}

function updateBackgroundColor() {
    
    // Set fixed values for hue and lightness
    var fixedHue = 0;
    var fixedLightness = 100;

    // Adjust saturation based on pain level
    var saturation = painSlider.value * 6;

    // Ensure that saturation stays within valid HSL range (0-100)
    if (saturation < 0) saturation = 0;
    else if (saturation > 100) saturation = 100;

    painSlider.style.background = 'hsl(' + fixedHue + ', ' + saturation + ', ' + fixedLightness + ')';
}

async function submitUserPass() {
    var result = await fetch("http://localhost:3000/add-patient-record");
    console.log(result);
}

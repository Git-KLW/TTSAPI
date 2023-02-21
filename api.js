window.speechSynthesis.onvoiceschanged = function() {

  // Get the value of the text input field
  var voices = window.speechSynthesis.getVoices();
// Find the voice you want to use
var selectedVoice = null;
for (var i = 0; i < voices.length; i++) {
  if (voices[i].name === 'Microsoft Liam Online (Natural) - English (Canada)') {
    selectedVoice = voices[i];
    break;
  }
}

// Create a new instance of SpeechSynthesisUtterance
// Get the URL queries
const queryParams = new URLSearchParams(window.location.search);

// Extract the "text" query parameter
const text = queryParams.get("text");

// Check if the "text" parameter is present
if (text) {
  // Create a new SpeechSynthesisUtterance object with the text
  const message = new SpeechSynthesisUtterance(text);

  // Use the Web Speech API to speak the text
  window.speechSynthesis.speak(message);
} else {
  // Handle the case when the "text" parameter is not present
  console.error("No 'text' parameter found in the URL queries");
}
}

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

// Get the URL queries
const queryParams = new URLSearchParams(window.location.search);

// Extract the "text" query parameter
const text = queryParams.get("text");

// Check if the "text" parameter is present
if (text) {
  // Create a new SpeechSynthesisUtterance object with the text
  const message = new SpeechSynthesisUtterance(text);

  // Use the Web Speech API to generate the audio data
  window.speechSynthesis.speak(message);

  // Wait for the audio to finish generating
  message.onend = function() {
    // Get the audio data as a Blob object
    const blob = new Blob([new Uint8Array(message.audioBuffer)], { type: 'audio/wav' });

    // Create a new URL object for the Blob
    const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
  link.href = url;
  link.download = 'speech.wav';

  // Append the link to the DOM
  document.body.appendChild(link);

  // Trigger a click on the link to start the download
  link.click();

  // Remove the link from the DOM
  document.body.removeChild(link);

    URL.revokeObjectURL(audioURL);
  }
} else {
  // Handle the case when the "text" parameter is not present
  console.error("No 'text' parameter found in the URL queries");
}


}

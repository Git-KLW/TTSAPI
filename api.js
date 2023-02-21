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

  const chunks = [];
const mediaRecorder = new MediaRecorder(message);
mediaRecorder.addEventListener("dataavailable", event => chunks.push(event.data));
mediaRecorder.addEventListener("stop", () => {
  const blob = new Blob(chunks, { type: "audio/mp3" });
  const url = window.URL.createObjectURL(blob);
  console.log(url);
});

// Start the MediaRecorder
mediaRecorder.start();

// Stop the MediaRecorder after the TTS output has finished
message.addEventListener("end", () => {
  mediaRecorder.stop();
});
} else {
  // Handle the case when the "text" parameter is not present
  console.error("No 'text' parameter found in the URL queries");
}

}

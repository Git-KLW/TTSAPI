window.speechSynthesis.onvoiceschanged = function() {
var form = document.getElementById('tts-form');

// Add a submit event listener to the form
form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the text input field
  var text = document.getElementById('text-input').value;
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
var msg = new SpeechSynthesisUtterance();

// Set the text that you want to speak
msg.text = text;

// Set the voice to the selected voice
msg.voice = selectedVoice;

// Call the speech synthesis API to speak the text
window.speechSynthesis.speak(msg);
})
}
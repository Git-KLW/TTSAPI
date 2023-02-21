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

const text = request.body.text;

// Create a new SpeechSynthesisUtterance object with the text
const message = new SpeechSynthesisUtterance(text);

// Set the audio output format to WAV
message.voiceURI = 'native';
message.lang = 'en-US';
message.volume = 1;
message.rate = 1;
message.pitch = 1;
message.text = text;
message.outputFormat = 'audio/wav';

// Use the Web Speech API to generate the audio file
window.speechSynthesis.speak(message);

// Wait for the audio to be generated
message.addEventListener('end', () => {
  // Get the audio data as a blob
  window.speechSynthesis.cancel();
  const audioData = new Blob([new Uint8Array(message.audioContent)], {type: 'audio/wav'});

  // Return the audio data as the HTTP response
  response.writeHead(200, {
    'Content-Type': 'audio/wav',
    'Content-Length': audioData.size
  });
  response.end(audioData);
});
}

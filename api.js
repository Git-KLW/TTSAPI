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

  // Use the Web Speech API to speak the text
  const audio = new Audio();
  audio.src = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(new SpeechSynthesisUtterance(text))], {type: 'text/xml'}));
  audio.play();

  // Use the Web Audio API to capture the audio output
  const audioCtx = new AudioContext();
  const dest = audioCtx.createMediaStreamDestination();
  const source = audioCtx.createMediaElementSource(audio);
  source.connect(dest);
  const chunks = [];
  const recorder = new MediaRecorder(dest.stream);
  recorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  recorder.onstop = (e) => {
    const blob = new Blob(chunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.wav';
    link.click();
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, message.duration * 1000);
} else {
  // Handle the case when the "text" parameter is not present
  console.error("No 'text' parameter found in the URL queries");
}

}

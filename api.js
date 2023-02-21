
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

  // Wait for the audio data to be generated
  window.speechSynthesis.onvoiceschanged = () => {
    // Get the audio data as a blob
    const audioBlob = new Blob([new Uint8Array(window.speechSynthesis.getVoices()[0].synthesize(message))], { type: 'audio/wav' });

    // Create a new URL object for the blob
    const audioUrl = URL.createObjectURL(audioBlob);

    // Return the audio URL as the response
    window.location.href = audioUrl;
  };
} else {
  // Handle the case when the "text" parameter is not present
  console.error("No 'text' parameter found in the URL queries");
}



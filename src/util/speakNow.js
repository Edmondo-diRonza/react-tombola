export const speakNow = (message, mute = false) => {
  if (!mute) {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "it";
    msg.text = message;
    window.speechSynthesis.speak(msg);
    return true;
  }
};
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setPopup({ popup: "popup.html" });
});

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ selection: selectedText });
  }
});

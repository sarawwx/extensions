chrome.runtime.onMessage.addListener((message) => {
    if (message.selection) {
      chrome.storage.sync.get("notes", (data) => {
        const notes = data.notes || [];
        notes.push(message.selection);
  
        chrome.storage.sync.set({ notes });
      });
    }
  });
  
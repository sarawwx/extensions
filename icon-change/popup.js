document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    const inputText = document.getElementById("inputText");
    const qrcodeDiv = document.getElementById("qrcode");
  
    generateButton.addEventListener("click", () => {
      const text = inputText.value;
      const imageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        text
      )}&size=128x128`;
      qrcodeDiv.innerHTML = `<img src="${imageUrl}" alt="QR Code" />`;
    });
  });
  
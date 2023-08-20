export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const startIndex = b64Data.indexOf("base64") + 7;
  const b64 = b64Data.substring(startIndex);
  const byteCharacters = window.atob(b64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const downloadHandler = (attachment, name) => {
  const blob = b64toBlob(attachment);
  const blobUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = blobUrl;
  downloadLink.download = `${name}`;
  downloadLink.click();
};

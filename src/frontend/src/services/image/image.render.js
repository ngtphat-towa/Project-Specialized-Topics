export default function convertToBase64(imageData) {
  // Convert the Buffer from the server into a Uint8Array
  var bytes = new Uint8Array(imageData.data);

  // Convert the Uint8Array into a string
  var binary = '';
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));

  // Convert the string into a base64 string
  var base64String = window.btoa(binary);

  return `data:${imageData.contentType};base64,` + base64String;
}

export function getImageUrl(imageId, imageSize = 's') {
  return (
    `https://react.dev/images/docs/scientists/${imageId}${imageSize}.jpg`
  );
}

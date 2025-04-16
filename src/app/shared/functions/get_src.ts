export default function getSrc(path: string) {
  return `https://storage.googleapis.com/moto-device-assets${path.split('img')[1]}`;
}

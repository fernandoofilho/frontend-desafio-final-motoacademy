export default function getSrc(path: string) {
  return `http://localhost:3000/assets/images${path.split('img')[1]}`;
}

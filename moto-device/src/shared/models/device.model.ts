export type Device = {
  _id: string;
  Model: string;
  src: string;
  specs: { [x: string]: string };
  info: { [x: string]: string };
};

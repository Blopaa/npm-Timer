export default class ErrorTimer extends Error {
  constructor(){
    super("format doesn't match with time sent")
    this.name = "Error 1"
  }
}

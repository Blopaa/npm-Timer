export default class ErrorMatch extends Error {
  constructor(){
    super("format doesn't match with time sent")
    this.name = "Error 1"
  }
}

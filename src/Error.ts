export type TimerError = {
  message: string;
  code: number;
};

export class ErrorTimer {
  public formatUnMatch(
    message: string = "format doesn't match with time sent"
  ): string {
    const error: TimerError = {
      message,
      code: 1,
    };
    return JSON.stringify(error);
  }
}

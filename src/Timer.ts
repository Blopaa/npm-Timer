import { ErrorTimer } from './Error';

type timerFormat =
  | 'mm:ss'
  | 'hh:mm:mss'
  | 'dd:hh:mm:ss'
  | 'mm:ss:ms'
  | 'ss:ms'
  | 'ss';

export class Timer {
  private oneTime: RegExp = new RegExp(/^[0-9]./g);
  private twoTimes: RegExp = new RegExp(/^[0-9].[:][0-9]./g);
  private threeTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9]./g);
  private fourTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9].[:][0-9]./g);

  constructor(private format: timerFormat = 'mm:ss') {
    this.format = format;
  }

  public timeCount(initialTime: string = '00:00'): string | never {
    let formatRecorder: Record<string, number> = {};
    this.format.split(':').forEach((e, i) => {
      formatRecorder[e] = i + 1;
    });

    switch (
      this.format // verify if the initial time is like the format sent
    ) {
      case 'ss':
        if (!initialTime.match(this.oneTime))
          throw new ErrorTimer().formatUnMatch();
        break;
      case 'dd:hh:mm:ss':
        if (!initialTime.match(this.fourTimes))
          throw new ErrorTimer().formatUnMatch();
        break;
      case 'hh:mm:mss':
        if (!initialTime.match(this.threeTimes))
          throw new ErrorTimer().formatUnMatch();
        break;
      case 'mm:ss:ms':
        if (!initialTime.match(this.threeTimes))
          throw new ErrorTimer().formatUnMatch();
        break;
      case 'mm:ss':
        if (!initialTime.match(this.twoTimes))
          throw new ErrorTimer().formatUnMatch();
        break;
      case 'ss:ms':
        if (!initialTime.match(this.twoTimes))
          throw new ErrorTimer().formatUnMatch();
        break;
      default:
        throw new ErrorTimer().formatUnMatch();
    }

    console.log(formatRecorder);

    let initialTimeSeparated: string[] | string =
      formatRecorder['ss'] == 0 ? initialTime : initialTime.split(':');
    let separatedTimes: number[] = [];
    if (typeof initialTimeSeparated === "object") {
      for (let u of initialTimeSeparated) {
        separatedTimes.push(parseInt(u));
      }
    } else {
      separatedTimes.push(parseInt(<string><unknown>initialTimeSeparated));
    }
    console.log(separatedTimes)
    if (formatRecorder['ss']) {
      setInterval(() => {
        if (separatedTimes[formatRecorder['ss'] - 1] === 59) {
          separatedTimes[formatRecorder['ss'] -1] = 0;
        }
        ++separatedTimes[formatRecorder['ss'] - 1];
        console.log(separatedTimes);
      }, 1000);
    }

    return 'string';
  }
}

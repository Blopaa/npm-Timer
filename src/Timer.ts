import { ErrorTimer } from './Error';

type timerFormat =
  | 'mm:ss'
  | 'hh:mm:mss'
  | 'dd:hh:mm:ss'
  | 'mm:ss:ms'
  | 'ss:ms'
  | 'ss'
  | 'mm';

export class Timer {
  private oneTime: RegExp = new RegExp(/^[0-9]./g);
  private twoTimes: RegExp = new RegExp(/^[0-9].[:][0-9]./g);
  private threeTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9]./g);
  private fourTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9].[:][0-9]./g);

  constructor(private format: timerFormat = 'mm:ss') {
    this.format = format;
  }

  public timeCount(initialTime: string = '00:00'): string | never {
    let formatRecorder: Record<string, number> = {}; //will check what times are activaded
    this.format.split(':').forEach((e, i) => {
      formatRecorder[e] = i;
    });

    switch (
      this.format // verify if the initial time is like the format sent
    ) {
      case 'ss':
        if (!initialTime.match(this.oneTime))
          throw new ErrorTimer().formatUnMatch();
        break;
      case 'mm':
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
    let initialTimeSeparated: string[] | string =
      formatRecorder['ss'] == 0 ? initialTime : initialTime.split(':');
    let separatedTimes: number[] = [];
    if (typeof initialTimeSeparated === 'object') {
      for (let u of initialTimeSeparated) {
        separatedTimes.push(parseInt(u));
      }
    } else {
      separatedTimes.push(parseInt(<string>(<unknown>initialTimeSeparated)));
    }
    let minute: boolean = false;

    if (formatRecorder['ss'] >= 0) {
      setInterval(() => {
        // console.log(separatedTimes); show seconds
        if (separatedTimes[formatRecorder['ss']] === 59) {
          separatedTimes[formatRecorder['ss']] = -1;
        }
        if (separatedTimes[formatRecorder['ss']] === 58) {
          minute = true;
        }
        ++separatedTimes[formatRecorder['ss']];
      }, 1000);
    }
    if (formatRecorder['mm'] >= 0) {
      if (formatRecorder['ss'] >= 0) {
        setInterval(() => {
          if (minute) {
            ++separatedTimes[formatRecorder['mm']];
            minute = false;
          }
        });
      } else {
        setInterval(() => {
          console.log(separatedTimes); 
          if (separatedTimes[formatRecorder['mm']] === 59) {
            separatedTimes[formatRecorder['mm']] = 0;
          }
          ++separatedTimes[formatRecorder['mm']];
          console.log(separatedTimes)
        }, 60000);
      }
    }

    return 'string';
  }
}

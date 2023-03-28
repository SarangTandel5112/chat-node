import moment from "moment-timezone";
import { createLogger, format, transports } from "winston";

const {
  combine, timestamp, prettyPrint, colorize,
} = format;

export class Log {

  public getLogger() {
    const timestampFormat: string = moment().format("YYYY-MM-DD HH:mm:ss");
    return createLogger({
      format: combine(
        timestamp({ format: timestampFormat }),
        prettyPrint(),
        colorize(),
      ),
      level: "debug",
      transports: [new transports.Console()],
    });
  }

  public info(...args: any[]) {
    const logger: any = this.getLogger();
    logger.info(...args);
  }

  public error(...args: any[]) {
    const logger: any = this.getLogger();
    logger.error(...args);
  }

  public debug(...args: any[]) {
    const logger: any = this.getLogger();
    logger.debug(...args);
  }
}

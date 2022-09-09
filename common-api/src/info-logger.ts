import { Logger } from 'type-injector-lib';

export class InfoLogger extends Logger {
    info = (msg: string, ...details: any[]) => { console.log(msg, details); };
}

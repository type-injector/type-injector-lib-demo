import { InjectConfig, Logger } from 'type-injector';
import { injectToken } from './inject-token.const';

export class BusinessService {
    createdValue: string;
    logger: Logger;

    static injectConfig: InjectConfig = {
        deps: [injectToken.createdValue, injectToken.simpleValue, Logger],
    }

    constructor(createdValue: string, simpleValue: string, logger: Logger) {
        this.createdValue = createdValue;
        this.logger = logger;
    }

    logCreatedValue() {
        this.logger.info?.(this.createdValue);
    }
}

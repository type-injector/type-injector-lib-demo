import { InjectConfig, Logger } from 'type-injector';
import { injectToken } from './inject-token.const';

export class BusinessService {
    createdValue: string;
    logger: Logger;

    static injectConfig: InjectConfig = {
        deps: [injectToken.createdValue, Logger],
    }

    constructor(createdValue: string, logger: Logger) {
        this.createdValue = createdValue;
        this.logger = logger;
    }

    logCreatedValue() {
        this.logger.info?.(this.createdValue);
    }
}
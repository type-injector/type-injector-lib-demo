import { declareInjectToken } from 'type-injector';

export const injectToken = {
    simpleValue: declareInjectToken<string>('simple value'),
    createdValue: declareInjectToken<string>('created value'),
};

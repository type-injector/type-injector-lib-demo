import { declareInjectToken } from '@type-injector/lib';

export const injectToken = {
    simpleValue: declareInjectToken<string>('simple value'),
    createdValue: declareInjectToken<string>('created value'),
};

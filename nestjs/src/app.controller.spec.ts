import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { typeInjectProviders } from './type-injector.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [...typeInjectProviders],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toMatch(
        /^Hello NestJS! Time is: [0-9:]+ (AM|PM)$/,
      );
    });
  });
});

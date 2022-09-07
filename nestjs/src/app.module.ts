import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { typeInjectProviders } from './type-injector.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [...typeInjectProviders],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { USerModule } from './Users/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    USerModule, MongooseModule.forRoot(process.env.MONGOURL)
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}

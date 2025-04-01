import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemesModule } from './memes/memes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MemesModule,
  ],
})
export class AppModule {}

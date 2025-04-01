import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemesModule } from './memes/memes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    MemesModule,
  ],
})
export class AppModule {}

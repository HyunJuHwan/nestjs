import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_VALIDATOR } from './config/config.validator';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
    //   isGlobal: true,
    // }),
    ConfigModule.forRoot(CONFIG_VALIDATOR),
    TypeOrmModule.forRootAsync({ useClass: typeORMConfig }),
    BoardsModule,
    AuthModule
  ],

})
export class AppModule {}

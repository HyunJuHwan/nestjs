// import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// export const typeORMConfig: TypeOrmModuleOptions = {
//     type: 'mysql',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE,
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: process.env.DB_SYNCHRONIZE === 'true',
// }
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class typeORMConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    };
  }
}
import { ConfigModuleOptions } from '@nestjs/config/dist';
import * as Joi from 'joi';

export const CONFIG_VALIDATOR: ConfigModuleOptions = {
    envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
    validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
    }),
    isGlobal: true,
};
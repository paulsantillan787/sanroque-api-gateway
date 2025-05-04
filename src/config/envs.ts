import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  
  AUTH_SERVICE_HOST: string;
  AUTH_SERVICE_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),

  AUTH_SERVICE_HOST: joi.string(),
  AUTH_SERVICE_PORT: joi.number(),

})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  
  authServiceHost: envVars.AUTH_SERVICE_HOST,
  authServicePort: envVars.AUTH_SERVICE_PORT,
}

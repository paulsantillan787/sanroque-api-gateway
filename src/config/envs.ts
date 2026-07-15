import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  
  AUTH_SERVICE_HOST: string;
  AUTH_SERVICE_PORT: number;

  EVALUATION_SERVICE_HOST: string;
  EVALUATION_SERVICE_PORT: number;

  DIAGNOSIS_SERVICE_HOST: string;
  DIAGNOSIS_SERVICE_PORT: number;
  DIAGNOSIS_SERVICE_URL: string;

  CORS_ORIGIN: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),

  AUTH_SERVICE_HOST: joi.string(),
  AUTH_SERVICE_PORT: joi.number(),

  EVALUATION_SERVICE_HOST: joi.string(),
  EVALUATION_SERVICE_PORT: joi.number(),

  DIAGNOSIS_SERVICE_HOST: joi.string(),
  DIAGNOSIS_SERVICE_PORT: joi.number(),
  DIAGNOSIS_SERVICE_URL: joi.string().uri().required(),

  CORS_ORIGIN: joi.string()
})
.unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  
  authServiceHost: envVars.AUTH_SERVICE_HOST,
  authServicePort: envVars.AUTH_SERVICE_PORT,

  evaluationServiceHost: envVars.EVALUATION_SERVICE_HOST,
  evaluationServicePort: envVars.EVALUATION_SERVICE_PORT,

  diagnosisServiceHost: envVars.DIAGNOSIS_SERVICE_HOST,
  diagnosisServicePort: envVars.DIAGNOSIS_SERVICE_PORT,
  diagnosisServiceUrl: envVars.DIAGNOSIS_SERVICE_URL,

  corsOrigin: envVars.CORS_ORIGIN,
}

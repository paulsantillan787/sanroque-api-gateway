import { Module } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { DIAGNOSIS_SERVICE, envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [GeminiController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: DIAGNOSIS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.diagnosisServiceHost,
          port: envs.diagnosisServicePort
        }
      }
    ])
  ]
})
export class GeminiModule {}

import { Module } from '@nestjs/common';
import { DiagnosisController } from './diagnosis.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DIAGNOSIS_SERVICE, envs } from 'src/config';

@Module({
  controllers: [DiagnosisController],
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
export class DiagnosisModule {}

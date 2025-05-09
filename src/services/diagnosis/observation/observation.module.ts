import { Module } from '@nestjs/common';
import { ObservationController } from './observation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DIAGNOSIS_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ObservationController],
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
    ]),
  ]
})
export class ObservationModule {}

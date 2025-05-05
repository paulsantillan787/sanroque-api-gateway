import { Module } from '@nestjs/common';
import { ClassificationController } from './classification.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, EVALUATION_SERVICE } from 'src/config';

@Module({
  controllers: [ClassificationController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: EVALUATION_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.evaluationServiceHost,
          port: envs.evaluationServicePort
        }
      }
    ])
  ]
})
export class ClassificationModule {}

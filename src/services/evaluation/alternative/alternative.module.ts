import { Module } from '@nestjs/common';
import { AlternativeController } from './alternative.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, EVALUATION_SERVICE } from 'src/config';

@Module({
  controllers: [AlternativeController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: EVALUATION_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.evaluationServiceHost,
          port: envs.evaluationServicePort,
        }
      },
    ])
  ]
})
export class AlternativeModule {}

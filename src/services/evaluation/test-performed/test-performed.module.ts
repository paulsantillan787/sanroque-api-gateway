import { Module } from '@nestjs/common';
import { TestPerformedController } from './test-performed.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, envs, EVALUATION_SERVICE } from 'src/config';

@Module({
  controllers: [TestPerformedController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.authServiceHost,
          port: envs.authServicePort
        }
      },
      {
        name: EVALUATION_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.evaluationServiceHost,
          port: envs.evaluationServicePort,
        }
      }
    ])
  ]
})
export class TestPerformedModule {}

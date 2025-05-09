import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, envs, EVALUATION_SERVICE } from 'src/config';

@Module({
  controllers: [QuestionController],
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
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.authServiceHost,
          port: envs.authServicePort,
        }
      }
    ])
  ]
})
export class QuestionModule {}

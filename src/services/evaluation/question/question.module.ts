import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, EVALUATION_SERVICE } from 'src/config';

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
    ])
  ]
})
export class QuestionModule {}

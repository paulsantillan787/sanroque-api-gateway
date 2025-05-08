import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, envs } from 'src/config';

@Module({
  controllers: [StudentController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: AUTH_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.authServiceHost,
          port: envs.authServicePort,
        }
      },
    ]),
  ]
})
export class StudentModule {}

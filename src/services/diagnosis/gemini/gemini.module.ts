import { Module } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { AUTH_SERVICE, envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [GeminiController],
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
      }
    ])
  ]
})
export class GeminiModule {}

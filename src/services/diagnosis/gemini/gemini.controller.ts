import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { DIAGNOSIS_SERVICE } from 'src/config';
import { CreateGeminiDto } from './dto/create-gemini.dto';

@Controller('gemini')
export class GeminiController {
  constructor(@Inject(DIAGNOSIS_SERVICE) private readonly diagnosisClient: ClientProxy) {}

  @Post('generate')
  generate(@Body() createGeminiDto: CreateGeminiDto) {
    return this.diagnosisClient.send({ cmd: 'diagnosis.generate.gemini' }, createGeminiDto)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

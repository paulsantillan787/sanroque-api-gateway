import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { DIAGNOSIS_SERVICE } from 'src/config';
import { CreateGeminiDto } from './dto/create-gemini.dto';
import { TeacherGuard } from '../../auth/guards/teacher.guard';
import { CreateValidationDto } from './dto/create-validation.dto';

@Controller('gemini')
export class GeminiController {
  constructor(@Inject(DIAGNOSIS_SERVICE) private readonly diagnosisClient: ClientProxy) {}

  @UseGuards(TeacherGuard)
  @Post('generate')
  generate(@Body() createGeminiDto: CreateGeminiDto) {
    return this.diagnosisClient.send({ cmd: 'diagnosis.generate.gemini' }, createGeminiDto)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(TeacherGuard)
  @Post('validate')
  validate(@Body() createValidationDto: CreateValidationDto) {
    return this.diagnosisClient.send({ cmd: 'diagnosis.generate.gemini.validation' }, createValidationDto)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

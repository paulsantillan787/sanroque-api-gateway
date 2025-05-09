import { Controller, Get, Post, Body, Inject, Param, UseGuards } from '@nestjs/common';
import { CreateObservationDto } from './dto/create-observation.dto';
import { DIAGNOSIS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TeacherGuard } from '../../auth/guards/teacher.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('diagnosis')
export class ObservationController {
  constructor(@Inject(DIAGNOSIS_SERVICE) private readonly diagnosisClient: ClientProxy) {}

  @UseGuards(TeacherGuard)
  @Post(':test_performed_id')
  create(@Param('test_performed_id') testPerformedId: string, @Body() createObservationDto: CreateObservationDto) {
    return this.diagnosisClient.send({ cmd: 'diagnosis.create.observation' }, { testPerformedId, ...createObservationDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Get(':test_performed_id')
  findAll(@Param('test_performed_id') testPerformedId: string) {
    return this.diagnosisClient.send({ cmd: 'diagnosis.all.observation' }, testPerformedId)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

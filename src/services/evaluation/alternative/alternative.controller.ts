import { Controller, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';
import { EVALUATION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TeacherGuard } from '../../auth/guards/teacher.guard';

@Controller('alternative')
export class AlternativeController {
  constructor(@Inject(EVALUATION_SERVICE) private readonly evaluationClient: ClientProxy) {}

  @UseGuards(TeacherGuard)
  @Post(':template_test_id')
  create(@Param('template_test_id') templateTestId: string, @Body() createAlternativeDto: CreateAlternativeDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.create.alternative' }, {templateTestId, ...createAlternativeDto})
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
  
  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlternativeDto: UpdateAlternativeDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.update.alternative' }, { id, ...updateAlternativeDto })
    .pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.remove.alternative' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

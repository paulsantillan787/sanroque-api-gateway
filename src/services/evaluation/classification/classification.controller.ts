import { Controller, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { EVALUATION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TeacherGuard } from '../../auth/guards/teacher.guard';

@Controller('classification')
export class ClassificationController {
  constructor(@Inject(EVALUATION_SERVICE) private readonly evaluationClient: ClientProxy) {}

  @UseGuards(TeacherGuard)
  @Post(':template_test_id')
  create(@Param('template_test_id') templateTestId: string  ,@Body() createClassificationDto: CreateClassificationDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.create.classification' }, { templateTestId, ...createClassificationDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassificationDto: UpdateClassificationDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.update.classification' }, { id, ...updateClassificationDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.remove.classification' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

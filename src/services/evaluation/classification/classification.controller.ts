import { Controller, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { EVALUATION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('classification')
export class ClassificationController {
  constructor(@Inject(EVALUATION_SERVICE) private readonly evaluationClient: ClientProxy) {}

  @Post(':template_test_id')
  create(@Param('template_test_id') templateTestId: string  ,@Body() createClassificationDto: CreateClassificationDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.create.classification' }, { templateTestId, ...createClassificationDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassificationDto: UpdateClassificationDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.update.classification' }, { id, ...updateClassificationDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.remove.classification' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

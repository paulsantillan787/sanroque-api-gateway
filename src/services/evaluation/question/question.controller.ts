import { Controller, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { EVALUATION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('question')
export class QuestionController {
  constructor(@Inject(EVALUATION_SERVICE) private readonly evaluationClient: ClientProxy) {}

  @Post(':template_test_id')
  create(@Param('template_test_id') templateTestId: string, @Body() createQuestionDto: CreateQuestionDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.create.question' }, { templateTestId, ...createQuestionDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.update.question' }, { id, ...updateQuestionDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.remove.question' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

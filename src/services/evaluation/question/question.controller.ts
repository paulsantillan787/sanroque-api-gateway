import { Controller, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { EVALUATION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TeacherGuard } from '../../auth/guards/teacher.guard';

@Controller('question')
export class QuestionController {
  constructor(@Inject(EVALUATION_SERVICE) private readonly evaluationClient: ClientProxy) {}

  @UseGuards(TeacherGuard)
  @Post(':template_test_id')
  create(@Param('template_test_id') templateTestId: string, @Body() createQuestionDto: CreateQuestionDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.create.question' }, { templateTestId, ...createQuestionDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.update.question' }, { id, ...updateQuestionDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.remove.question' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

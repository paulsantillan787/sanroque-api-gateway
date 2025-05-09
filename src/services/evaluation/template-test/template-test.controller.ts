import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateTemplateTestDto } from './dto/create-template-test.dto';
import { UpdateTemplateTestDto } from './dto/update-template-test.dto';
import { EVALUATION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TeacherGuard } from '../../auth/guards/teacher.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('template-test')
export class TemplateTestController {
  constructor(@Inject(EVALUATION_SERVICE) private readonly evaluationClient: ClientProxy) {}

  @UseGuards(TeacherGuard)
  @Post()
  create(@Body() createTemplateTestDto: CreateTemplateTestDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.create.template' }, createTemplateTestDto)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.evaluationClient.send({ cmd: 'evaluation.all.template' }, {})
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.one.template' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateTestDto: UpdateTemplateTestDto) {
    return this.evaluationClient.send({ cmd: 'evaluation.update.template' }, { id, ...updateTemplateTestDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) }), 
      );
  }

  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.remove.template' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AUTH_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TeacherGuard } from '../guards/teacher.guard';
import { Token } from '../decorator/token.decorator';

@Controller('student')
export class StudentController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy){}

  @Post(':user_id')
  create(@Param('user_id') userId: string, @Body() createStudentDto: CreateStudentDto) {
    return this.authClient.send({ cmd: 'auth.register.student' }, { userId, ...createStudentDto })
      .pipe(
        catchError((error) => { throw new RpcException(error); })
      );
  }

  @UseGuards(TeacherGuard)
  @Get()
  findAll(@Token() token: string) {
    return this.authClient.send({ cmd: 'auth.all.students' }, {})
      .pipe(
        catchError((error) => { throw new RpcException(error); })
      );
  }

  @UseGuards(TeacherGuard)
  @Get(':id')
  findOne(@Token() token: string, @Param('id') id: string) {
    return this.authClient.send({ cmd: 'auth.one.student' }, id)
      .pipe(
        catchError((error) => { throw new RpcException(error); })
      );
  }
}

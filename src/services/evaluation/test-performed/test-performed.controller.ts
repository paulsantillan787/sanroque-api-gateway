import { Controller, Get, Post, Body, Param, Inject, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CreateTestPerformedDto } from './dto/create-test-performed.dto';
import { AUTH_SERVICE, EVALUATION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { Token } from 'src/services/auth/decorator/token.decorator';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('test-performed')
export class TestPerformedController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    @Inject(EVALUATION_SERVICE) private readonly evaluationClient: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @Post(':template_test_id/:score')
  async create(
    @Param('template_test_id') templateTestId: string, 
    @Param('score', ParseIntPipe) score: number, 
    @Body() createTestPerformedDto: CreateTestPerformedDto,
    @Token() token: string
  ) {
    const user: { id: string, firstname: string, email: string} = await firstValueFrom(
      this.authClient.send({ cmd: 'auth.verify.token' }, token)
    )

    const data = { templateTestId, score, userId: user.id, ...createTestPerformedDto }

    return this.evaluationClient.send({ cmd: 'evaluation.create.test' }, data)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Get(':user_id')
  async findAll(@Param('user_id') userId: string) {
    
    return this.evaluationClient.send({ cmd: 'evaluation.all.test' }, userId);
  }

  @Get('evaluate/:id')
  findOne(@Param('id') id: string) {
    return this.evaluationClient.send({ cmd: 'evaluation.one.test' }, id);
  }
}

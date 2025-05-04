import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { EvaluationModule } from './services/evaluation/evaluation.module';

@Module({
  imports: [AuthModule, EvaluationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

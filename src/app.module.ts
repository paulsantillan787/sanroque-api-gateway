import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { EvaluationModule } from './services/evaluation/evaluation.module';
import { DiagnosisModule } from './services/diagnosis/diagnosis.module';

@Module({
  imports: [AuthModule, EvaluationModule, DiagnosisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

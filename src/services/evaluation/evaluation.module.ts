import { Module } from '@nestjs/common';
import { TemplateTestModule } from './template-test/template-test.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TemplateTestModule],
})
export class EvaluationModule {}

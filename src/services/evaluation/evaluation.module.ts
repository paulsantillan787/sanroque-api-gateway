import { Module } from '@nestjs/common';
import { TemplateTestModule } from './template-test/template-test.module';
import { QuestionModule } from './question/question.module';
import { AlternativeModule } from './alternative/alternative.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TemplateTestModule, QuestionModule, AlternativeModule],
})
export class EvaluationModule {}

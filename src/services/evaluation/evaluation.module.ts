import { Module } from '@nestjs/common';
import { TemplateTestModule } from './template-test/template-test.module';
import { QuestionModule } from './question/question.module';
import { AlternativeModule } from './alternative/alternative.module';
import { ClassificationModule } from './classification/classification.module';
import { TestPerformedModule } from './test-performed/test-performed.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TemplateTestModule, QuestionModule, AlternativeModule, ClassificationModule, TestPerformedModule],
})
export class EvaluationModule {}

import { Module } from '@nestjs/common';
import { ObservationModule } from './observation/observation.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ObservationModule ,GeminiModule]
})
export class DiagnosisModule {}

import { BadGatewayException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { envs } from 'src/config';
import { CreateGeminiDto } from './dto/create-gemini.dto';
import { TeacherGuard } from '../../auth/guards/teacher.guard';
import { CreateValidationDto } from './dto/create-validation.dto';

@Controller('gemini')
export class GeminiController {
  private getDiagnosisUrl() {
    return envs.diagnosisServiceUrl.replace(/\/$/, '');
  }

  @UseGuards(TeacherGuard)
  @Post('generate')
  async generate(@Body() createGeminiDto: CreateGeminiDto) {
    const response = await fetch(`${this.getDiagnosisUrl()}/gemini/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createGeminiDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new BadGatewayException(errorText || 'Error llamando a diagnosis /gemini/generate');
    }

    return response.json();
  }

  @UseGuards(TeacherGuard)
  @Post('validate')
  async validate(@Body() createValidationDto: CreateValidationDto) {
    const response = await fetch(`${this.getDiagnosisUrl()}/gemini/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createValidationDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new BadGatewayException(errorText || 'Error llamando a diagnosis /gemini/validate');
    }

    return response.json();
  }
}

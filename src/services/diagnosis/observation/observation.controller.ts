import { BadGatewayException, Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateObservationDto } from './dto/create-observation.dto';
import { envs } from 'src/config';
import { TeacherGuard } from '../../auth/guards/teacher.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('diagnosis')
export class ObservationController {
  private getDiagnosisUrl() {
    return envs.diagnosisServiceUrl.replace(/\/$/, '');
  }

  @UseGuards(TeacherGuard)
  @Post(':test_performed_id')
  async create(
    @Param('test_performed_id') testPerformedId: string,
    @Body() createObservationDto: CreateObservationDto,
  ) {
    const response = await fetch(`${this.getDiagnosisUrl()}/diagnosis/${testPerformedId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createObservationDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new BadGatewayException(errorText || 'Error creando observación en diagnosis');
    }

    return response.json();
  }

  @UseGuards(AuthGuard)
  @Get(':test_performed_id')
  async findAll(@Param('test_performed_id') testPerformedId: string) {
    const response = await fetch(`${this.getDiagnosisUrl()}/diagnosis/${testPerformedId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new BadGatewayException(errorText || 'Error obteniendo observaciones de diagnosis');
    }

    return response.json();
  }
}

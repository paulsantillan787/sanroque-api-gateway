import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateTestDto } from './create-template-test.dto';

export class UpdateTemplateTestDto extends PartialType(CreateTemplateTestDto) {}

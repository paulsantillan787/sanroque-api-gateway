import { IsString } from "class-validator";

export class CreateTemplateTestDto {
  
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  author: string;
}

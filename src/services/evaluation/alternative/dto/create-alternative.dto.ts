import { IsNumber, IsString, Min } from "class-validator";

export class CreateAlternativeDto {

  @IsString()
  content: string;

  @IsNumber()
  @Min(0)
  value: number;
}

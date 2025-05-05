import { IsNumber, IsString, Min } from "class-validator";

export class CreateClassificationDto {

  @IsNumber()
  @Min(0)
  minScore: number;

  @IsNumber()
  @Min(0)
  maxScore: number;

  @IsString()
  interpretation: string;
}

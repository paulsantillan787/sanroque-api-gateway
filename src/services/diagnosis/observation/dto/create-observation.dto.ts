import { IsString } from "class-validator";

export class CreateObservationDto {
  
  @IsString()
  analysis: string;

}

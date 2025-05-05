import { IsArray } from "class-validator";

export class CreateTestPerformedDto {

  @IsArray()
  answers: { questionId: string; alternativeId: string }[];
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateTestPerformedDto } from './create-test-performed.dto';

export class UpdateTestPerformedDto extends PartialType(CreateTestPerformedDto) {}

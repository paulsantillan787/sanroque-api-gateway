import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UserModule, StudentModule],
})
export class AuthModule {}

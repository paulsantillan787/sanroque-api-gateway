import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { firstValueFrom } from "rxjs";
import { Role } from "src/common/enums/Role";
import { AUTH_SERVICE } from "src/config";

export class TeacherGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}  
  
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.tokenExtractor(request);

    if (!token) throw new UnauthorizedException();

    try {
      const user = await firstValueFrom(
        this.authClient.send({ cmd: 'auth.verify.token' }, token)
      )
      request.user = user;
      request.token = token;

      if (user.role !== Role.TEACHER) {
        throw new UnauthorizedException('User is not a teacher');
      }
      
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  tokenExtractor(request: Request): string | undefined  {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
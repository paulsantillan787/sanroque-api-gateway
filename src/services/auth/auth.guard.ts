import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { firstValueFrom } from "rxjs";
import { AUTH_SERVICE } from "src/config";

export class AuthGuard implements CanActivate {
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
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    // const request = context.switchToHttp().getRequest();

    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;
    console.log('is Auth?', req.isAuthenticated());

    return req.isAuthenticated();
  }
}

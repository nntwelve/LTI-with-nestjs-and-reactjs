import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LtiVariables = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const custom_var = request.res.locals?.context?.custom;
    return data ? custom_var?.[data] : custom_var;
  },
);

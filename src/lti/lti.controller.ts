import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { LtiVariables } from './lti.decorator';
import { USER_ROLE } from './lti.interface';

@Controller('lti')
export class LtiController {
  @Get()
  serveUI(@Req() req: Request) {
    return req.res.sendFile(join(__dirname, '../../client'));
  }

  @Get('nolti')
  async nolti(@Req() req: Request, @Res() res: Response) {
    res.send(
      'There was a problem getting you authenticated with the attendance application. Please contact support.',
    );
  }

  @Get('ping')
  async ping(@Req() req: Request, @Res() res: Response) {
    res.send('pong');
  }

  @Get('protected')
  async protected(@Req() req: Request, @Res() res: Response) {
    res.send('Insecure');
  }

  @Get('roles')
  getRole(@LtiVariables('role') roles: string[]) {
    return roles.includes(USER_ROLE.ADMINISTRATOR)
      ? USER_ROLE.ADMINISTRATOR
      : roles.includes(USER_ROLE.INSTRUCTOR)
      ? USER_ROLE.INSTRUCTOR
      : USER_ROLE.STUDENT;
  }
}

import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('lti')
export class LtiController {
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
}

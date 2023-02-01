import { Injectable, NestMiddleware, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { Provider as lti } from 'ltijs';

@Injectable()
export class LtiMiddleware implements NestMiddleware, OnModuleInit {
  /**
   *
   */
  constructor(private readonly config_service: ConfigService) {}
  async onModuleInit() {
    lti.setup(
      this.config_service.get<string>('LTI_KEY')!,
      {
        url:
          this.config_service.get<string>('DATABASE_URI') +
          '/' +
          this.config_service.get<string>('DATABASE_LTIJS_NAME') +
          '?authSource=admin',
        connection: {
          user: this.config_service.get<string>('MONGO_USER') ?? '',
          pass:
            this.config_service.get<string>('MONGO_PASS') ??
            this.config_service.get<string>('MONGO_PASSWORD') ??
            '',
        },
      },
      {
        appRoute: '/',
        invalidTokenRoute: '/invalidtoken',
        sessionTimeoutRoute: '/sessionTimeout',
        keysetRoute: '/keys',
        loginRoute: '/login',
        devMode: true,
        tokenMaxAge: 60,
      },
    );
    // Whitelisting the main app route and /nolti to create a landing page
    lti.whitelist(
      {
        route: new RegExp(/^\/nolti$/),
        method: 'get',
      },
      {
        route: new RegExp(/^\/ping$/),
        method: 'get',
      },
    );
    lti.onConnect((token, req: Request, res: Response, next: NextFunction) => {
      if (token) {
        next();
      } else res.redirect('/lti/nolti');
    });
    await lti.deploy({ serverless: true });
    await lti.registerPlatform({
      url: this.config_service.get<string>('LTI_ISS'),
      name: this.config_service.get<string>('LTI_NAME'),
      clientId: this.config_service.get<string>('LTI_CLIENT_ID'),
      authenticationEndpoint: `${this.config_service.get<string>(
        'LTI_HOST',
      )}/api/lti/authorize_redirect`,
      accesstokenEndpoint: `${this.config_service.get<string>(
        'LTI_HOST',
      )}/login/oauth2/token`,
      authConfig: {
        method: 'JWK_SET',
        key: `${this.config_service.get<string>(
          'LTI_HOST',
        )}/api/lti/security/jwks`,
      },
    });
  }

  use(req: Request, res: Response, next: () => void) {
    lti.app(req, res, next);
  }
}

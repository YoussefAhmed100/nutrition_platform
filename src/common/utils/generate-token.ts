import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StringValue } from 'ms';

export function generateTokens(
  userId: string,
  jwtService: JwtService,
  configService: ConfigService,
) {
  const payload = { sub: userId };

  const accessToken = jwtService.sign(payload);

  const refreshToken = jwtService.sign(payload, {
    secret: configService.getOrThrow<string>('jwt.refresh.secret'),
    expiresIn: configService.getOrThrow<StringValue>(
      'jwt.refresh.expiresIn',
    ),
  });

  return {
    accessToken,
    refreshToken,
  };
}
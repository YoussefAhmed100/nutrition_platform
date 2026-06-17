import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StringValue } from 'ms';
import { UserRole } from 'src/users/enums/roles.enum';


export async function generateTokens(
  userId: string,
  role: UserRole,
  jwtService: JwtService,
  configService: ConfigService,
) {
  const payload = {
    sub: userId,
    role:role
  };

   const [accessToken, refreshToken] = await Promise.all([
    jwtService.signAsync(payload, {
      secret: configService.getOrThrow<string>('jwt.access.secret'),
      expiresIn: configService.getOrThrow<StringValue>(
        'jwt.access.expiresIn',
      ),
    }),

    jwtService.signAsync(payload, {
      secret: configService.getOrThrow<string>('jwt.refresh.secret'),
      expiresIn: configService.getOrThrow<StringValue>(
        'jwt.refresh.expiresIn',
      ),
    }),
  ]);
  return {
    accessToken,
    refreshToken,
  };
}
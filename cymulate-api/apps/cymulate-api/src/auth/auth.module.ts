import { ConfigService } from '@cymulate/infrastructures/modules/config';
import { UsersModule } from '@cymulate/infrastructures/repositories';
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    const jwtModule = JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    });

    return {
      module: AuthModule,
      imports: [jwtModule, UsersModule.forRoot()],
      controllers: [AuthController],
      providers: [AuthService],
      exports: [jwtModule, AuthService],
    };
  }
}

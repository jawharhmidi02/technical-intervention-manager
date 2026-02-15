import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectModule } from './config/connect.module';
import { AuthModule } from './auth/auth.module';
import { InterventionsModule } from './interventions/interventions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConnectModule,
    AuthModule,
    InterventionsModule,
  ],
})
export class AppModule {}

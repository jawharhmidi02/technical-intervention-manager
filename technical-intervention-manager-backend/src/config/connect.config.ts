import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Intervention } from '../interventions/entities/intervention.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  const databaseUrl = "postgresql://postgres.xkmcsjdgdcuicuffwkqo:vr1yoGVFbwWSK6Yn@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";

  return {
    type: 'postgres',
    url: databaseUrl,
    entities: [User, Intervention],
    synchronize: true,
    logging: ['query', 'error'],
  };
};

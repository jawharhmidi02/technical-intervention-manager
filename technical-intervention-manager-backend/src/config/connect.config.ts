import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Intervention } from '../interventions/entities/intervention.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  const databaseUrl = configService.get<string>('DATABASE_URL');

  return {
    type: 'postgres',
    url: databaseUrl,
    entities: [User, Intervention],
    synchronize: true,
    logging: ['query', 'error'],
  };
};

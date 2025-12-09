import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ClinicsModule } from './modules/clinics/clinics.module';
import { PatientsModule } from './modules/patients/patients.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
      ssl: process.env.DB_HOST?.includes('supabase.co')
        ? { rejectUnauthorized: false }
        : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
      extra: {
        // Force IPv4 to avoid timeout issues
        host: process.env.DB_HOST,
      },
    }),
    AuthModule,
    UsersModule,
    ClinicsModule,
    PatientsModule,
    MedicationsModule,
    PrescriptionsModule,
  ],
})
export class AppModule {}

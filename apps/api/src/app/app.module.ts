import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        // host: config.get('POSTGRES_HOST'),
        // port: +config.get('POSTGRES_PORT'),
        // username: config.get('POSTGRES_USER'),
        // password: config.get('POSTGRES_PASSWORD'),
        // database: config.get('POSTGRES_DB'),
        url: config.get<string>('DATABASE_URL'),

        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        autoLoadEntities: true,
        synchronize: true, // ⚠️ CẢNH BÁO: Chỉ dùng khi Dev. Nó sẽ tự sửa bảng DB. Tắt khi chạy thật.
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

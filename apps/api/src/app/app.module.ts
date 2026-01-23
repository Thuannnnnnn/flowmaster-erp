import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { HrmModule } from './modules/hrm/hrm.module';
import { SalesModule } from './modules/sales/sales.module';
import { PurchasingModule } from './modules/purchasing/purchasing.module';
import { FinanceModule } from './modules/finance/finance.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AuthModule } from './modules/auth/auth.module';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    HrmModule,
    SalesModule,
    PurchasingModule,
    FinanceModule,
    InventoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

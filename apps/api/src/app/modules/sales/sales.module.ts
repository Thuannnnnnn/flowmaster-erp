import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      Order,
      OrderItem
    ])
  ],
  exports: [TypeOrmModule]
})
export class SalesModule {}

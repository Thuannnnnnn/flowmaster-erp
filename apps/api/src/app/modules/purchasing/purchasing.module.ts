import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PoItem } from './entities/po-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Supplier,
      PurchaseOrder,
      PoItem
    ])
  ],
  exports: [TypeOrmModule]
})
export class PurchasingModule {}

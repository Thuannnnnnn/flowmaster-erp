import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Warehouse } from './entities/warehouse.entity';
import { Stock } from './entities/stock.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { ProductDetail, ProductDetailSchema } from './schemas/product-detail.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Product,
      Warehouse,
      Stock,
      StockMovement
    ]),
    MongooseModule.forFeature([
      { name: ProductDetail.name, schema: ProductDetailSchema }
    ])
  ],
  exports: [TypeOrmModule, MongooseModule]
})
export class InventoryModule {}

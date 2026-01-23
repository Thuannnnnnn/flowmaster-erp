import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Debt } from './entities/debt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction,
      Debt
    ])
  ],
  exports: [TypeOrmModule]
})
export class FinanceModule {}

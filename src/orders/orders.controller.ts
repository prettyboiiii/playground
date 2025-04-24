import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CalculateTotalRevenueDto } from 'src/orders/dto/calculate-total-revenue.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({
    description: 'Calculate Total revenue of orders',
    type: Number,
  })
  @Post('/total-revenue')
  calculateTotalRevenue(
    @Body() calculateTotalRevenueDto: CalculateTotalRevenueDto,
  ): Promise<number> {
    return this.ordersService.calculateTotalRevenue(
      calculateTotalRevenueDto.orders,
    );
  }
}

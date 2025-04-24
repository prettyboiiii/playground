import { Inject, Injectable } from '@nestjs/common';
import { OrderItem } from 'src/orders/dto/calculate-total-revenue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: Pick<PrismaService, 'product'>,
  ) {}

  // This will be used in the assignment 2
  async calculateTotalRevenue(orderItems: OrderItem[]) {
    let total = 0;

    for (let i = 0; i < orderItems.length; i++) {
      const item = orderItems[i];
      const product = await this.prismaService.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        throw Error('Product Not Found');
      }

      total += item.price * item.quantity;
    }

    return total;
  }
}

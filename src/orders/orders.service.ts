import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { OrderItem } from 'src/orders/dto/calculate-total-revenue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: Pick<PrismaService, 'product'>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // Optimized version
  async calculateTotalRevenue(orderItems: OrderItem[]) {
    const productIds = orderItems.map((item) => item.productId);

    // Get products from cache, and identify products that need to be fetched from DB
    const missingIds: string[] = [];
    await Promise.all(
      productIds.map((id) =>
        this.cacheManager.get(`products:${id}`).then((cachedProduct) => {
          if (!cachedProduct) {
            missingIds.push(id);
          }
        }),
      ),
    );

    if (missingIds.length > 0) {
      const validProducts = await this.prismaService.product.findMany({
        where: { id: { in: missingIds } },
        select: { id: true },
      });

      // Cache the valid products
      const validProductIdSet = new Set<string>();
      validProducts.forEach((product) => {
        validProductIdSet.add(product.id);

        // Set the missing products back to the cacheManager in the fire-and-forget manner to avoid blocking operations
        // TODO: Set TTL accordingly
        this.cacheManager.set(`products:${product.id}`, {}).catch((error) => {
          console.error(
            `Failed to cache product with ID ${product.id}:`,
            error,
          );
        });
      });

      // Validate if all product IDs were found
      const notFoundProducts = missingIds.filter(
        (id) => !validProductIdSet.has(id),
      );
      if (notFoundProducts.length > 0) {
        throw new Error(
          `Product Ids Not Found: ${notFoundProducts.join(', ')}`,
        );
      }
    }

    // Calculate total revenue based on valid products
    return orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }
}

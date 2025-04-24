import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: Pick<PrismaService, 'product'>,
  ) {}

  create(args: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({ data: args });
  }

  findAll() {
    return this.prismaService.product.findMany({ orderBy: { price: 'asc' } });
  }
}

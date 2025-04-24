import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty({
    description: 'Unique identifier for the product',
    nullable: false,
  })
  id: string;

  @ApiProperty({ description: 'Name of the product', nullable: false })
  name: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 19.99,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    description: 'Quantity of the product in stock',
    example: 100,
    nullable: false,
  })
  stockQuantity: number;

  // TODO: Add Metadata
}

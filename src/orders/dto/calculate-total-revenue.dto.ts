import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderItem {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: 'Laptop',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The quantity of the product in stock',
    example: 50,
    nullable: false,
  })
  @IsInt()
  @Min(0)
  quantity: number;
}

export class CalculateTotalRevenueDto {
  @ApiProperty({
    description: 'The list of orders to be calculated',
    nullable: false,
    isArray: true,
    type: [OrderItem],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => OrderItem)
  orders: OrderItem[];
}

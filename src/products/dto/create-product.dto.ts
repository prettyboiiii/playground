import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductReqDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
    nullable: false,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The quantity of the product in stock',
    example: 50,
    nullable: false,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  stockQuantity: number;
}

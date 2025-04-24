import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateProductReqDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiCreatedResponse({
    description: 'The product record',
    type: ProductEntity,
  })
  @Post()
  create(
    @Body() createProductDto: CreateProductReqDto,
  ): Promise<ProductEntity> {
    return this.productsService.create(createProductDto);
  }

  @ApiOkResponse({
    description: 'The product records',
    type: ProductEntity,
    isArray: true,
  })
  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }
}

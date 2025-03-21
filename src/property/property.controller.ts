import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseBoolPipe,
    ParseIntPipe, Patch,
    Post,
    Query,
    UsePipes, ValidationPipe,
    Headers
} from '@nestjs/common';
import {CreatePropertyDto} from "./dto/createProperty.dto";
import {IdParamDto} from "./dto/idParam.dto";
import {ParseIdPipe} from "./pipes/parseIdPipe";
import {ZodValidationPipe} from "./pipes/zodValidationPipe";
import {createPropertySchema, CreatePropertyZodDto} from "./dto/createPropertyZod.dto";
import {HeadersDto} from "./dto/headers.dto";
import {RequestHeader} from "./pipes/request-header";
import {PropertyService} from "./property.service";




@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService) {
        // don't create your dependency, instead use DI in Nestjs
        // this.propertyService = new PropertyService()
    }

    @Get()
    findAll() {
        this.propertyService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @Query("sort", ParseBoolPipe) sort: unknown) {
        return this.propertyService.findOne()
    }

    @Post()
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    // @HttpCode(202)
    @UsePipes(new ZodValidationPipe(createPropertySchema))
    create(@Body() body: CreatePropertyZodDto) {
        return this.propertyService.create()
    }

    @Patch(':id')
    update(
        @Param("id", ParseIdPipe) id: number,
        @Body() body: CreatePropertyDto,
        @RequestHeader(new ValidationPipe({validateCustomDecorators: true})) header: HeadersDto
    ) {
        return this.propertyService.update();
    }
}

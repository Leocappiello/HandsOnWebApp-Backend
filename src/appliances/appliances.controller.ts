import { Body, Controller, Post } from '@nestjs/common';
import { AppliancesService } from './appliances.service';
import { CreateApplianceDto } from './dto/create-appliance.dto';

@Controller('appliances')
export class AppliancesController {
  constructor(private readonly appliancesService: AppliancesService) {}

  @Post()
  create(@Body() createApplianceDto: CreateApplianceDto) {
    return this.appliancesService.create(createApplianceDto);
  }
}

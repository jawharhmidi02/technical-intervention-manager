import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('interventions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateInterventionDto, @Req() req: any) {
    return this.interventionsService.create(dto, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.interventionsService.findAll();
  }

  @Get('my')
  @Roles(Role.TECHNICIAN)
  findMine(@Req() req: any) {
    return this.interventionsService.findByTechnician(req.user.id);
  }

  @Patch(':id/status')
  @Roles(Role.TECHNICIAN)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
    @Req() req: any,
  ) {
    return this.interventionsService.updateStatus(id, dto, req.user.id);
  }
}

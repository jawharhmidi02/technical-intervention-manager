import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from './entities/intervention.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepo: Repository<Intervention>,
  ) {}

  async create(dto: CreateInterventionDto, adminId: string) {
    const intervention = this.interventionRepo.create({
      title: dto.title,
      description: dto.description,
      assignedToId: dto.assignedToId,
      createdById: adminId,
    });
    return this.interventionRepo.save(intervention);
  }

  async findAll() {
    return this.interventionRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByTechnician(technicianId: string) {
    return this.interventionRepo.find({
      where: { assignedToId: technicianId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(
    interventionId: string,
    dto: UpdateStatusDto,
    technicianId: string,
  ) {
    const intervention = await this.interventionRepo.findOne({
      where: { id: interventionId },
    });

    if (!intervention) {
      throw new NotFoundException('Intervention not found');
    }

    if (intervention.assignedToId !== technicianId) {
      throw new ForbiddenException(
        'You can only update your own interventions',
      );
    }

    intervention.status = dto.status;
    return this.interventionRepo.save(intervention);
  }
}

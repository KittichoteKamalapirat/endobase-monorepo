import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BooleanResponse from '../endos/dto/boolean-response.input';
import { EndosService } from '../endos/endos.service';
import { ENDO_STATUS_OBJ } from '../endos/entities/endo.entity';
import { OfficersService } from '../officers/officers.service';
import { SessionsService } from '../sessions/sessions.service';
import { CreateRepairRequestInput } from './dto/create-repair-request.input';
import RepairRequestResponse from './dto/repair-request-response';
import { UpdateRepairRequestInput } from './dto/update-repair-request.input';
import { RepairRequest } from './entities/repair-request.entity';

@Injectable()
export class RepairRequestService {
  constructor(
    @InjectRepository(RepairRequest)
    private repairRequestsRepository: Repository<RepairRequest>,
    private officersService: OfficersService,
    private endosService: EndosService,
    private sessionsService: SessionsService,
  ) {}

  async create(
    input: CreateRepairRequestInput,
  ): Promise<RepairRequestResponse> {
    try {
      const existingOfficer = await this.officersService.findOneByofficerNum(
        input.officerNum,
      );

      if (!existingOfficer) {
        return {
          errors: [
            {
              message: 'This officer number does not exist',
              field: 'officerNum',
            },
          ],
        };
      }

      await this.sessionsService.endSessionByEndoId(input.endoId);
      await this.endosService.updateStatus(input.endoId, 'waiting_for_repair');

      const newRR = this.repairRequestsRepository.create({
        endoId: input.endoId,
        note: input.note,
        source: input.source,
        officerId: existingOfficer.id,
      });

      const savedRR = await this.repairRequestsRepository.save(newRR);

      const returnedRR = await this.findOne(savedRR.id);

      return { repairRequest: returnedRR };
    } catch (error) {
      return {
        errors: [{ field: 'repairRequest', message: 'An error occured ' }],
      };
    }
  }

  findAll() {
    return this.repairRequestsRepository.find({
      relations: ['endo', 'officer', 'endo.tray', 'endo.tray.container'],
    });
  }

  findAllByEndoId(endoId: string) {
    return this.repairRequestsRepository.find({
      where: { endoId },
      relations: ['endo', 'officer', 'endo.tray', 'endo.tray.container'],
    });
  }

  findOne(id: string) {
    return this.repairRequestsRepository.findOne({
      where: { id },
      relations: ['endo', 'officer', 'endo.tray', 'endo.tray.container'],
    });
  }

  async update(
    id: string,
    input: UpdateRepairRequestInput,
  ): Promise<RepairRequestResponse> {
    try {
      // check officer number
      const existingOfficer = await this.officersService.findOneByofficerNum(
        input.officerNum,
      );

      if (!existingOfficer) {
        return {
          errors: [
            {
              message: 'This officer number does not exist',
              field: 'officerNum',
            },
          ],
        };
      }

      const existingRepairRequest = await this.findOne(id);
      if (!existingRepairRequest)
        return {
          errors: [
            { field: 'repairRequest', message: 'Cannot find the salon ' },
          ],
        };

      const newInput = {
        id,
        note: input.note,
        endoId: input.endoId,
        officerId: existingOfficer.id,
      };
      await this.repairRequestsRepository.save(newInput);

      const savedRR = await this.findOne(id);
      return { repairRequest: savedRR };
    } catch (error) {
      return {
        errors: [{ field: 'repairRequest', message: 'An error occured ' }],
      };
    }
  }

  async remove(id: string): Promise<BooleanResponse> {
    try {
      const existing = await this.findOne(id);
      if (!existing)
        return {
          errors: [
            {
              field: 'repairRequest',
              message: 'Cannot find the repair request',
            },
          ],
        };
      await this.repairRequestsRepository.delete(id);
      return { value: true };
    } catch (error) {
      return {
        errors: [{ field: 'repairRequest', message: 'An error occured' }],
      };
    }
  }
}

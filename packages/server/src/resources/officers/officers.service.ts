import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BooleanResponse from '../endos/dto/boolean-response.input';
import { CreateOfficerInput } from './dto/create-officer.input';
import OfficerResponse from './dto/officer-response';
import { UpdateOfficerInput } from './dto/update-officer.input';
import { Officer } from './entities/officer.entity';

@Injectable()
export class OfficersService {
  @InjectRepository(Officer)
  private officersRepository: Repository<Officer>; // use database, make sure forFeature is in module

  async create(input: CreateOfficerInput): Promise<OfficerResponse> {
    const newOfficer = this.officersRepository.create(input);
    try {
      const savedOfficer = await this.officersRepository.save(newOfficer);
      return { officer: savedOfficer };
    } catch (error) {
      console.error('erorr', error);

      if (
        error.detail.includes(
          `Key ("officerNum")=(${input.officerNum}) already exists`,
        )
      )
        return {
          errors: [
            {
              message: `An officer with this number already exists`,
              field: 'officerNum',
            },
          ],
        };

      return {
        errors: [
          {
            message: `An error occured`,
            field: 'officerNum',
          },
        ],
      };
    }
  }

  findOne(id: string) {
    return this.officersRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.officersRepository.find();
  }

  findOneById(id: string) {
    return this.officersRepository.findOneBy({ id });
  }

  async findOneByofficerNum(officerNum: string): Promise<Officer> {
    return this.officersRepository.findOneBy({ officerNum });
  }

  async update(
    id: string,
    input: UpdateOfficerInput,
  ): Promise<OfficerResponse> {
    try {
      const existingOfficer = await this.findOne(id);
      if (!existingOfficer)
        return {
          errors: [{ field: 'Officer', message: 'Cannot find the officer ' }],
        };

      const officer = await this.officersRepository.save({
        id,
        ...input,
      });

      return {
        officer,
      };
    } catch (error) {
      if (
        error.detail.includes(
          `Key ("officerNum")=(${input.officerNum}) already exists`,
        )
      )
        return {
          errors: [
            {
              message: `An officer with this number already exists`,
              field: 'officerNum',
            },
          ],
        };

      return {
        errors: [{ field: 'officer', message: 'An error occured ' }],
      };
    }
  }

  async remove(id: string): Promise<BooleanResponse> {
    try {
      await this.officersRepository.delete(id);
      return { value: true };
    } catch (error) {
      return {
        errors: [{ field: 'officer', message: 'Cannot find the officer ' }],
      };
    }
  }

  // for admin
  async removeAllRows() {
    try {
      const officers = await this.findAll();

      await Promise.all(
        officers.map((officer) =>
          this.officersRepository.delete({ id: officer.id }),
        ),
      );
    } catch (error) {
      console.error('error remove officers', error);
    }
  }
}

import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Warranty } from './interfaces/warranty.interface';
import { CreateWarrantyDTO } from './dto/create-warranty.dto';

@Injectable()
export class WarrantiesService {
  constructor(
    @Inject('WARRANTY_MODEL') private warrantyModel: Model<Warranty>,
  ) {}

  async create(createWarrantyDto: CreateWarrantyDTO): Promise<Warranty> {
    const newWarranty = new this.warrantyModel(createWarrantyDto);
    return await newWarranty.save();
  }

  async findAll(): Promise<Warranty[]> {
    return this.warrantyModel.find().populate('userId');
  }

  async findByUserId(userId: string): Promise<Warranty[]> {
    return this.warrantyModel.find({ userId });
  }

  async findById(id: string): Promise<Warranty | null> {
    return this.warrantyModel.findById(id);
  }

  async deleteById(id: string): Promise<Warranty | null> {
    return this.warrantyModel.findByIdAndDelete(id);
  }
}

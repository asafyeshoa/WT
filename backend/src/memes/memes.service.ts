import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Meme, ImgFlipApiResponse } from '../types/memes.types';

@Injectable()
export class MemesService implements OnModuleInit {
  constructor(@InjectModel('Meme') private readonly memeModel: Model<Meme>) {}

  async onModuleInit() {
    await this.loadMemesFromApi();
  }

  private async loadMemesFromApi() {
    const count = await this.memeModel.countDocuments();
    if (count > 0) return;

    const { data } = await axios.get<ImgFlipApiResponse>(
      'https://api.imgflip.com/get_memes',
    );

    const memesToSave = data.data.memes.map((meme) => ({
      id: meme.id,
      name: meme.name,
      url: meme.url,
    }));

    try {
      await this.memeModel.insertMany(memesToSave, { ordered: false });
      console.log(`Saved ${memesToSave.length} memes to MongoDB`);
    } catch (err: any) {
      if (err.writeErrors) {
        console.log(`Skipped ${err.writeErrors.length} duplicate memes`);
      } else {
        console.error('Error inserting memes:', err);
      }
    }
  }

  async getPaginatedMemes(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const memes = await this.memeModel.find().skip(skip).limit(limit);
    const total = await this.memeModel.countDocuments();

    return {
      data: memes,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateMeme(id: string, updates: { name: string }) {
    const updated = await this.memeModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated) throw new Error('Meme not found');
    return updated;
  }
}

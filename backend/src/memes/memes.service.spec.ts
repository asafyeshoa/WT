import { Test, TestingModule } from '@nestjs/testing';
import { MemesService } from './memes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Meme } from '../types/memes.types';
import { Model } from 'mongoose';

describe('MemesService', () => {
  let service: MemesService;
  let model: Model<Meme>;

  const mockMeme = {
    _id: '123',
    name: 'Test Meme',
    url: 'https://example.com/image.jpg',
  };

  const memeArray = [mockMeme, { ...mockMeme, _id: '456' }];

  const mockMemeModel = {
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(memeArray),
    }),
    countDocuments: jest.fn().mockResolvedValue(2),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockMeme),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemesService,
        {
          provide: getModelToken('Meme'),
          useValue: mockMemeModel,
        },
      ],
    }).compile();

    service = module.get<MemesService>(MemesService);
    model = module.get<Model<Meme>>(getModelToken('Meme'));
  });

  it('should return paginated memes', async () => {
    const result = await service.getPaginatedMemes(1, 10);
    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
  });

  it('should update a meme', async () => {
    const updated = await service.updateMeme('123', { name: 'Updated Meme' });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      '123',
      { name: 'Updated Meme' },
      { new: true },
    );
    expect(updated.name).toBe('Test Meme');
  });
});

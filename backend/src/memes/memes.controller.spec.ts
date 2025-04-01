import { Test, TestingModule } from '@nestjs/testing';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';
import { Meme } from './memes.types';

describe('MemesController', () => {
  let controller: MemesController;
  let service: MemesService;

  const mockMeme: Meme = {
    id: '123',
    name: 'Funny Meme',
    url: 'https://example.com/funny.jpg',
  };

  const mockService = {
    getPaginatedMemes: jest.fn().mockResolvedValue({
      data: [mockMeme],
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    }),
    updateMeme: jest.fn().mockResolvedValue({ ...mockMeme, name: 'Updated' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemesController],
      providers: [{ provide: MemesService, useValue: mockService }],
    }).compile();

    controller = module.get<MemesController>(MemesController);
    service = module.get<MemesService>(MemesService);
  });

  it('should return paginated memes from service', async () => {
    const result = await controller.getMemes(1, 10);
    expect(service.getPaginatedMemes).toHaveBeenCalledWith(1, 10);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Funny Meme');
  });

  it('should update a meme by id', async () => {
    const updated = await controller.updateMeme('123', { name: 'Updated' });
    expect(service.updateMeme).toHaveBeenCalledWith('123', { name: 'Updated' });
    expect(updated.name).toBe('Updated');
  });
});

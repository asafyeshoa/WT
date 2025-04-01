import { Controller, Get, Query, Body, Param, Put } from '@nestjs/common';
import { MemesService } from './memes.service';

@Controller('memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  @Get()
  async getMemes(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.memesService.getPaginatedMemes(Number(page), Number(limit));
  }

  @Put(':id')
  async updateMeme(@Param('id') id: string, @Body() body: { name: string }) {
    return this.memesService.updateMeme(id, body);
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  Query,
 UseInterceptors,
  UploadedFile,
  Delete,
  Param,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { CurrentUserId } from 'src/common/decorators/current-user.decorator';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
@Post()
@UseInterceptors(FileInterceptor('file'))
sendMessage(
  @Body() dto: SendMessageDto,

  @UploadedFile()
  file: Express.Multer.File,

  @CurrentUserId()
  userId: string,
) {
  return this.messagesService.sendMessage(
    userId,
    dto,
    file,
  );
}
  @Get()
  async getMessages(@CurrentUserId() userId: string, @Query() query: BuildQueryDto) {
    return this.messagesService.getMessages(userId,query);
  }



  @Delete(':id')
  async deleteMessage(
    @Param('id') messageId: string,

    @CurrentUserId()
    userId: string,
  ) {
    return this.messagesService.deleteMessage(
      messageId,
      userId,
    );
  }
}



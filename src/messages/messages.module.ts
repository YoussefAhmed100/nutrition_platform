import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/conversations/schemas/conversation.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { UploadService } from 'src/common/storage/upload.service';

@Module({
    imports: [
    MongooseModule.forFeature([
       {
        name: Message.name,
        schema: MessageSchema,
      },

      {
        name: Conversation.name,
        schema: ConversationSchema,
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService,UploadService],
})
export class MessagesModule {}

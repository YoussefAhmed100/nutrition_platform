import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ConversationsService } from './conversations.service';

import { CreateConversationDto } from './dto/create-conversation.dto';
import { ParticipantActionDto } from './dto/participant-action.dto';

import { CurrentUserId } from 'src/common/decorators/current-user.decorator';
import { UpdateGroupNameDto } from './dto/update-group-name.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
  ) {}



  @Post()
  createConversation(
    @Body() dto: CreateConversationDto,
    @CurrentUserId() currentUserId: string,
  ) {
    return this.conversationsService.createConversation(
      dto.participants,
      currentUserId,
    );
  }


  @Post('find-or-create')
  findOrCreateConversation(
    @Body() dto: CreateConversationDto,
    @CurrentUserId() currentUserId: string,
  ) {
    return this.conversationsService.findOrCreateConversation(
      dto.participants,
      currentUserId,
    );
  }



  @Get('user-conversations')
  getUserConversations(
    @CurrentUserId() currentUserId: string,
  ) {
    return this.conversationsService.getUserConversations(
      currentUserId,
    );
  }



  @Get(':id')
  getConversationById(
    @Param('id') conversationId: string,
    @CurrentUserId() currentUserId: string,
  ) {
    return this.conversationsService.getConversationById(
      conversationId,
      currentUserId,
    );
  }



  @Patch(':id/last-message')
  updateLastMessage(
    @Param('id') conversationId: string,
    @Body('messageId') messageId: string,
  ) {
    return this.conversationsService.updateLastMessage(
      conversationId,
      messageId,
    );
  }



  @Patch(':id/unread/increase')
  increaseUnread(
    @Param('id') conversationId: string,
    @Body('userId') userId: string,
  ) {
    return this.conversationsService.increaseUnreadCount(
      conversationId,
      userId,
    );
  }

  @Patch(':id/unread/reset')
  resetUnread(
    @Param('id') conversationId: string,
    @Body('userId') userId: string,
  ) {
    return this.conversationsService.resetUnreadCount(
      conversationId,
      userId,
    );
  }



  @Patch(':id/add-participant')
  addParticipant(
    @Param('id') conversationId: string,
    @Body() dto: ParticipantActionDto,
    @CurrentUserId() currentUserId: string,
  ) {
    return this.conversationsService.addParticipant(
      conversationId,
      dto.participantId,
      currentUserId,
    );
  }

  @Patch(':id/remove-participant')
  removeParticipant(
    @Param('id') conversationId: string,
    @Body() dto: ParticipantActionDto,
    @CurrentUserId() currentUserId: string,
  ) {
    return this.conversationsService.removeParticipant(
      conversationId,
      dto.participantId,
      currentUserId,
    );
  }


  @Patch(':id/archive')
  archiveConversation(
    @Param('id') conversationId: string,
    @CurrentUserId() currentUserId: string,
  ) {
    return this.conversationsService.archiveConversation(
      conversationId,
      currentUserId,
    );
  }

  @Patch(':id/group-name')
updateGroupName(
  @Param('id') conversationId: string,
  @Body() dto: UpdateGroupNameDto,
  @CurrentUserId() currentUserId: string,
) {
  return this.conversationsService.updateGroupName(
    conversationId,
    dto.groupName,
    currentUserId,
  );
}


@Patch(':id/leave')
leaveConversation(
  @Param('id') conversationId: string,
  @CurrentUserId() currentUserId: string,
) {
  return this.conversationsService.leaveConversation(
    conversationId,
    currentUserId,
  );
}
}
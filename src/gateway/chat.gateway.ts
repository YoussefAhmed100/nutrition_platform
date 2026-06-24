import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  // CONNECTION LIFECYCLE

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // =========================
  // JOIN CONVERSATION ROOM
  // =========================

  @SubscribeMessage('join_conversation')
  handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string,
  ) {
    client.join(conversationId);

    return {
      event: 'joined_conversation',
      conversationId,
    };
  }

  // =========================
  // SEND MESSAGE (REALTIME CORE)
  // =========================

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      userId: string;
      conversationId: string;
      content: string;
    },
  ) {
    const message = await this.messagesService.sendMessage(
      payload.userId,
      {
        conversationId: payload.conversationId,
        content: payload.content,
      },
    );

    // broadcast to room
    this.server
      .to(payload.conversationId)
      .emit('new_message', message);

    return message;
  }

  // TYPING INDICATOR

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody()
    payload: { conversationId: string; userId: string },
  ) {
    this.server.to(payload.conversationId).emit('typing', payload);
  }

  // SEEN MESSAGE

  @SubscribeMessage('seen')
  handleSeen(
    @MessageBody()
    payload: { conversationId: string; userId: string },
  ) {
    this.server.to(payload.conversationId).emit('seen', payload);
  }
}
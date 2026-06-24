import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type ConversationDocument =
  HydratedDocument<Conversation>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Conversation {
  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
    required: true,
    index: true,
  })
  participants: Types.ObjectId[];

  @Prop({
    default: false,
  })
  isGroup: boolean;

  @Prop({
    type: String,
    trim: true,
  })
  groupName?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  })
  owner?: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Message',
  })
  lastMessage?: Types.ObjectId;

  @Prop()
  lastMessageAt?: Date;

  @Prop({
    type: Map,
    of: Boolean,
    default: {},
  })
  archivedBy: Map<string, boolean>;

  @Prop({
    type: Map,
    of: Number,
    default: {},
  })
  unreadCount: Map<string, number>;
}

export const ConversationSchema =
  SchemaFactory.createForClass(
    Conversation,
  );

ConversationSchema.index({
  lastMessageAt: -1,
});

 
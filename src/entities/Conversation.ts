import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'conversation' })
export class Conversation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    senderId: number;

    @Column({ default: null })
    receiverId: number;

    @Column({ default: null })
    conversationId: string;

}

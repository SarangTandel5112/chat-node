import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'chat' })
export class Chat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    senderConId: number;

    @Column({ default: null })
    receiverConId: number;

    @Column({ default: null })
    senderId: number;

    @Column({ default: null })
    receiverId: number;

    @Column({ default: null })
    message: string;

    @Column({ default: null })
    isSeen: boolean;

}

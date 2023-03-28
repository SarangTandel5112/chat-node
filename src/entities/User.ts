import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', default: null })
    password: string;

    @Column({ type: 'varchar', length: 250, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 250, default: null })
    profilePic: string;

    @Column({ default: null })
    msgCount: number;

}

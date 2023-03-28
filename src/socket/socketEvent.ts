import { AppDataSource } from "../db/db.config";
import { Chat } from "../entities/Chat";
import { Redis } from "../helpers/redis";


export class SocketEvent {

    public io: any;
    public socket: any;
    public adminId: any;
    private redis = new Redis().client;

    constructor(io: any, socket: any, admin: any) {
        this.io = io;
        this.socket = socket;
        this.adminId = admin;
        this.onReceiveMsg()
    }

    private async onReceiveMsg() {
        this.socket.on("send-message", async (data) => {
            console.log(data, '-------data-------');
            const socketUser = await this.redis.hGet("appsocket4", String(data.receiverId))
            console.log(socketUser, '-----socketUser-------');
            const chat = AppDataSource.getRepository(Chat);
            await chat.save(data)
            console.log(socketUser, '--------socketUser----------'), data;

            this.socket.to(socketUser).emit('receive-msg', data)
        })
    }

}
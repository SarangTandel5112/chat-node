import { Server } from "socket.io";
import { Jwt } from "../helpers/jwt";
import { Redis } from "../helpers/redis";
import { SocketEvent } from "./socketEvent";

export class AppSocket {

    public adminId: any = [];
    public redis = new Redis().client

    public init() {

        let token: any;
        const io = new Server({
            cors: {
                origin: "http://localhost:3000"
            }
        });

        io.use(async (socket: any, next) => {

            // this.redis.flushdb((err, success) => {
            //     if (err) {
            //         throw new Error(err);
            //     }
            //     console.log(success); // will be true if successfull
            // });

            if (socket.handshake.headers.authorization) {
                token = socket.handshake.headers.authorization;
            } else if (socket.handshake.query.authorization) {
                token = socket.handshake.query.authorization;
            }

            if (token) {
                try {
                    const payload = await this.getSocketUser(token) as any;
                    const user = payload.user.payload
                    if (user?.id) {
                        socket.user = user;
                        if (!this.adminId.includes(user?.id)) {
                            this.adminId.push(user?.id);
                        }
                    }
                    next();
                } catch (error) {
                    console.log(error, '----------error----------------');
                }
            }
            else {
                next()
            }
        }).on("connection", async (socket: any) => {
            try {
                console.log('Socket client connected with id', socket.id);
                if (token) {
                    await this.redis.hset("appsocket4", String(socket?.user?.id), String(socket.id))
                    console.log('Socket client user id ', socket?.user?.id);
                }
                new SocketEvent(io, socket, this.adminId)
                // new SocketEvents(io, socket, this.adminId);
            } catch (err) {
                console.log(err, '--------err--------');
            }
        })
        io.listen(4100)
    }

    public async getSocketUser(token: string) {
        const tokenInfo = Jwt.decodeAuthToken(token);
        if (tokenInfo) {
            const user = tokenInfo;
            if (user) {
                const data = {
                    user,
                };
                return data
            } else {
                return "user not found"
            }
        }
    }

}
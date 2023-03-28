import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import { Chat } from "../../entities/Chat";
import { User } from "../../entities/User";
import { Jwt } from "../../helpers/jwt";
import { PasswordDecryptor } from "../../helpers/passwordDecryptor";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class UserService {
    private passWordDecrypt: PasswordDecryptor;
    constructor() {
        this.passWordDecrypt = new PasswordDecryptor();
    }

    public async login(email: string, password: string) {

        try {
            const agentRepo = AppDataSource.getRepository(User);
            const agent = await agentRepo.findOne({
                where: {
                    email: email
                }
            });
            if (!agent) {
                throw ResponseBuilder.badRequest('Invalid credentials')
            }
            const userObj = {
                email: agent.email,
                id: agent.id,
            }

            if (password !== agent?.password) {
                throw ResponseBuilder.badRequest("Invalid credentials")

            } else {
                return ResponseBuilder.data({
                    token: Jwt.getAuthToken({ email: agent.email, id: agent.id }),
                    email: agent.email,
                    id: agent.id,
                })

            }
        } catch (error) {
            console.log(error, '------err-----------');
            throw error;
        }


    }

    public async getList(req) {

        try {
            const agentRepo = AppDataSource.getRepository(User);

            const { payload } = Jwt.decodeAuthToken(req?.headers?.authorization)

            const currentUser = await agentRepo.findOne({
                where: {
                    id: payload.id
                }
            })

            const listUser = await agentRepo.find({})

            return ResponseBuilder.data({
                currentUser,
                listUser
            })

        } catch (error) {
            console.log(error, '------err-----------');
            throw error;
        }


    }

    public async getuserById(req) {

        try {

            const { payload } = Jwt.decodeAuthToken(req?.headers?.authorization)
            console.log(payload, '------payload--------');


            const { id } = req.params

            const agentRepo = AppDataSource.getRepository(User);
            const chat = AppDataSource.getRepository(Chat);

            const chatDetails = await chat.find({
                where: [{
                    senderId: payload.id,
                    receiverId: id
                }, {
                    senderId: id,
                    receiverId: payload.id
                }]
            })

            const receiverUser = await agentRepo.findOne({
                where: {
                    id: id
                }
            })

            const senderUser = await agentRepo.findOne({
                where: {
                    id: payload.id
                }
            })

            return ResponseBuilder.data({
                receiverUser,
                chatDetails,
                senderUser
            })

        } catch (error) {
            console.log(error, '------err-----------');
            throw error;
        }


    }
}
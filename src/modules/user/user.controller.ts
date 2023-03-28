import { Request, Response } from 'express';
import { UserService } from './user.service';


export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    public login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await this.userService.login(email, password)
            return res.status(data.code).json(data);

        } catch (error) {
            return res.status(error.code).json(error);
        }

    }

    public getUser = async (req, res) => {
        try {
            const data: any = await this.userService.getList(req)
            return res.status(data.code).json(data);

        } catch (error) {
            return res.status(error.code).json(error);
        }

    }

    public getUserById = async (req, res) => {
        try {
            const data: any = await this.userService.getuserById(req)
            return res.status(data.code).json(data);

        } catch (error) {
            return res.status(error.code).json(error);
        }

    }
}
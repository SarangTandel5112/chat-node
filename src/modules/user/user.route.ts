import { Router } from "express";
import { USER_ROUTES } from "../../config/routes";
import { UserController } from "./user.controller";


// Assign router to the express.Router() instance
const router: Router = Router();
const userController: UserController = new UserController()


//Signup
router.post(USER_ROUTES.LOGIN, userController.login);
router.get(USER_ROUTES.GETUSER, userController.getUser);
router.get(USER_ROUTES.GETUSERBYID, userController.getUserById);
export const UserRoute: Router = router;

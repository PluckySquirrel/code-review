import { Get, JsonController } from "routing-controllers"
import { AppDataSource } from "@src/config/data-source";
import { User } from "@src/entity/user.entity";

@JsonController()
export class UserController {
    @Get("/users")
    getAll(){
        return AppDataSource.manager.find(User);
    }
}

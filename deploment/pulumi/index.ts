import * as path from "path";
import createAwsUser from "./create-aws-user";


const envFilePath = path.join(__dirname, "../../.env");
const user = createAwsUser(envFilePath) 

export const createdUser = user;


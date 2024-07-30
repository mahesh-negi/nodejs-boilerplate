import UserModel from "../../models/user";
import { generatePasswordHash } from "../../utils/helper";
import dotenv from 'dotenv';

dotenv.config();

export const AdminSeeder = async () => {
    try {


        const isAdminExist = await UserModel.findOne({
            role: 'admin'
        });

        if (!isAdminExist) {

            if (process.env.adminPassword) {
                const adminInfo = {
                    name: process.env.name,
                    email: process.env.adminEmail,
                    password: generatePasswordHash(process.env.adminPassword),
                    role: 'admin'
                };
                const admin = await UserModel.create(adminInfo)
                console.log(`admin created successfully`, admin)
            } else {
                // Handle the case when process.env.adminPassword is undefined
                console.log('adminPassword is not defined');
            }
        }
    } catch (error) {
        console.log('error while create admin seeder', error)
    }
}
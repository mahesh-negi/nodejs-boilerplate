import { requestHandler, responseHandler } from "../utils";
import Joi from "joi"
import { haveValue } from "../utils/common";
import { loginUser } from "../utils/user";
import Boom from "boom"
import UserModel from "../models/user";
import { RESPONSE_MESSAGE } from "../constants/responseMessage";

export default {
    login: async (req: any, res: any, next: any) => {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
            });

            await requestHandler.validateRequest(req.body, schema);

            const { email, password } = req.body;

            let user = await UserModel.findOne({ email });

            if (user) {
                let loginUserResponse = await loginUser(user, req, { password });

                if (loginUserResponse && loginUserResponse.token) {
                    return responseHandler.handleSuccess(res, {
                        message: RESPONSE_MESSAGE.SUCCESS,
                        data: {
                            token: loginUserResponse.token,
                            name: user.name,
                            email: user.email
                        },
                    });

                } else {
                    throw Boom.badRequest(RESPONSE_MESSAGE.INVALIDEMAILORPASSWORD);
                }
            } else {
                throw Boom.badRequest(RESPONSE_MESSAGE.NO_LOGIN_ACCOUNT);
            }
        }
        catch (error) {
            console.log(error);
            return responseHandler.handleError(res, error);
        }
    },

}
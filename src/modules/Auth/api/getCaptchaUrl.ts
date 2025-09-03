import axios from "axios";
import { baseURL } from "../../../constants/constants.ts";

type CaptchaResponse = {
    url: string
}

export const getCaptchaUrl = async () => {
    const response = await axios.get<CaptchaResponse>(`${baseURL}/security/get-captcha-url`);
    return response.data
}
import Joi from "joi";

export default Joi.object({
    first_name: Joi.string()
        .regex(/^[A-Za-z' ]*$/)
        .required(),
    last_name: Joi.string()
        .regex(/^[A-Za-z' ]*$/)
        .required(),
    phone: Joi.string()
        .regex(/^([+]?\d{1,3})\s?(\d{2,3}\s?){2,3}\d{0,3}$/)
        .required(),
    email: Joi.string()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .optional(),
});

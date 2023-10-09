import Joi from "joi";
import id from "../fields/id.js";
import word from "../fields/word.js";

export default Joi.object({
    // id: id.label("ID").required(),
    language: word.required(),
    description: word.optional().allow(""),
    // level: Joi.number().required(),
    // name: Joi.string()
    //     .regex(/^[A-Za-z'_\-+#. 0-9]*$/)
    //     .required(),
});

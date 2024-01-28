import Joi from "joi";

export default Joi.object({
    word: Joi.string()
        .regex(/^[a-z]+$/i)
        .required()
        .error((errors) => {
            console.log(errors[0].code);
            errors[0].message = "invalid word";
            return errors;
        }),
    language: Joi.number()
        .integer()
        .min(1)
        .required()
        .error((errors) => {
            console.log(errors[0].code);
            errors[0].message = "select language";
            return errors;
        }),
    word_group: Joi.number()
        .integer()
        .min(1)
        .required()
        .error((errors) => {
            console.log(errors[0].code);
            errors[0].message = "select word type";
            return errors;
        }),
    definition: Joi.object({
        definition: Joi.string().optional(),
        resource: Joi.string().when("definition", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
        page: Joi.string().when("definition", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
    }).error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "definition is incomplete. fill or remove";
        return errors;
    }),
    example: Joi.object({
        example: Joi.string().optional(),
        resource: Joi.number().when("example", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
        page: Joi.number().when("example", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
    }).error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "example is incomplete. fill or remove";
        return errors;
    }),
    history: Joi.object({
        history: Joi.string().optional(),
        resource: Joi.string().when("history", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
        page: Joi.string().when("history", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
    }).error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "history of origin is incomplete. fill or remove";
        return errors;
    }),
    synonyms: Joi.array()
        .items(Joi.string().regex(/^[a-z' ]+$/i))
        .min(0)
        .required()
        .error((errors) => {
            console.log(errors[0].code);
            errors[0].message = "invalid word in synonyms";
            return errors;
        }),
});

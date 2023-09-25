import bcrypt from "bcrypt";
import knex from "../../db/db.js";
import generate_id from "../../tools/generators/generate_user_id.js";
import generate_password from "../../tools/generators/generate_password.js";
import Joi from "joi";

const user = {};

user.getUsers = async (req, res) => {
    try {
        const users = await knex("users").leftJoin("user_status", "user_status.id", "users.status").select(["users.*", "user_status.status as user_status"]);
        await res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

user.getStatuses = async (req, res) => {
    try {
        const status = await knex("user_status").whereNot({ status: "delete" });
        await res.status(200).json(status);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

user.create = async (req, res) => {
    try {
        // validation
        // check
        const user_id = await generate_id();
        const p = generate_password();
        const salt = await bcrypt.genSalt();
        req.body.user_id = user_id;
        req.body.password = await bcrypt.hash(p, salt);
        await knex("users").insert(req.body);
        await res.status(201).json({ user_id, password: p });
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

user.update = async (req, res) => {
    try {
        const validation = Joi.object({
            id: Joi.number().integer().min(1).required(),
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
            status: Joi.number().integer().min(1).required(),
            user_id: Joi.optional(),
            user_status: Joi.optional(),
            password: Joi.optional(),
            created_date: Joi.optional(),
        }).validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);
        delete req.body.created_date;
        delete req.body.password;
        delete req.body.user_status;
        delete req.body.user_id;

        const status = await knex("user_status").where("id", req.body.status).first();
        if (status.status !== "active" && status.status !== "deactive") return res.status(400).json("status wrong");
        // email, phone - unique
        await knex("users").where({ id: req.body.id }).update(req.body);
        await res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default user;

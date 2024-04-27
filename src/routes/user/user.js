import bcrypt from "bcrypt";
import knex from "../../db/db.js";
import generate_id from "../../generators/generate_user_id.js";
import generate_password from "../../generators/generate_password.js";
import Joi from "joi";
import createUser from "../../validations/models/create-user.js";
import updateUser from "../../validations/models/update-user.js";
import sendEmail from "../../tools/send-email.js";
import { sendSMS } from "../../tools/send-message.js";

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
        const validation = createUser.validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);

        // to-do: check user already exists - by phone or by email

        const user_id = await generate_id();
        const p = generate_password();
        const salt = await bcrypt.genSalt();
        req.body.user_id = user_id;
        req.body.password = await bcrypt.hash(p, salt);

        await knex.transaction(async (trx) => {
            console.log(p);
            await sendSMS({ text: `username: ${user_id}\npassword: ${p}` });
            // await sendEmail({ username: user_id, password: p });
            await knex("users").insert(req.body);
        });

        await res.status(201).json({ user_id, password: p });
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

user.update = async (req, res) => {
    try {
        const validation = updateUser.validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);
        delete req.body.created_date;
        delete req.body.password;
        delete req.body.user_status;
        delete req.body.user_id;

        const status = await knex("user_status").where("id", req.body.status).first();
        if (status.status !== "active" && status.status !== "deactive") return res.status(400).json("status wrong");

        // to-do: email, phone - unique
        await knex("users").where({ id: req.body.id }).update(req.body);
        await res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default user;

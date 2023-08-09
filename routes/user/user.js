import bcrypt from "bcrypt";
import knex from "../../db/db.js";
import generate_id from "../../tools/generate_user_id.js";
import generate_password from "../../tools/generate_password.js";

const user = {};
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

export default user;

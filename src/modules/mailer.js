import * as nodemailer from "nodemailer";
import * as hbs from "nodemailer-express-handlebars";
import path from "path";

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./src/views/mail/"),
    extName: ".html",
  })
);

export { transport };

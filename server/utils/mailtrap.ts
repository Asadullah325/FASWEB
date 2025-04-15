const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAILTRAP_API_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

export default client;
export { sender };

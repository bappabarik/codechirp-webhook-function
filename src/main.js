import { Client, Users } from 'node-appwrite'
import auth from './conf.js';

export default async ({ req, res, log, error }) => {

  if (req.path === "/webhook") {
    const event = req.headers["x-github-event"];
    log(event, req.body);
    return res.send("WebHook Called")
  }

  if (req.path === "/auth") {
    const users = await auth.getUsers()
    log("users: ", users);
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};

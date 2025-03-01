export default async ({ req, res, log, error }) => {

  if (req.path === "/webhook") {
    const event = req.headers["x-github-event"];
    log(event, req.body);
    return res.send("WebHook Called")
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};

import databaseService from './conf.js';
import getGroqChatCompletion from './createPostAi.js';

export default async ({ req, res, log, error }) => {

  if (req.path === "/webhook") {
    const event = req.headers["x-github-event"];
    if (event === 'push') {
      const providerID = req.body.sender.id
      const commits = req.body.commits
      for (const commit of commits) {
        const content = await getGroqChatCompletion(commit.message, "tweet")
        log(content);
        if (!content) {
          error("error occurred during post creation")
        }
        const post = await databaseService.createPost({event, content, providerID, app: "X" })
        if (post) {
          log("post created successfully");
        }

      }
    }
    return res.send("WebHook Called")
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};

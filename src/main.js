import databaseService from './conf.js';
import getGroqChatCompletion from './createPostAi.js';

export default async ({ req, res, log, error }) => {

  if (req.path === "/webhook") {
    const event = req.headers["x-github-event"];
    const data = JSON.parse(req.body)
    const providerID = data.sender.id
    if (event === 'push') {
      const commits = data.commits
      for (const commit of commits) {
        const content = await getGroqChatCompletion(commit.message, "tweet")
        if (!content) {
          error("error occurred during post creation")
        }
        const post = await databaseService.createPost({event, content, providerID, app: "X" })
        if (post) {
          console.log("post created successfully");
          
        }

      }
    }
    log(event, req.body, commits);
    return res.send("WebHook Called")
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};

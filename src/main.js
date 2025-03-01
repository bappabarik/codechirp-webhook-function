import databaseService from './conf.js';
import getGroqChatCompletion from './createPostAi.js';

export default async ({ req, res, log, error }) => {

  if (req.path === "/webhook") {
    const event = req.headers["x-github-event"];
    if (event === 'push') {
      const providerID = String(req.body.sender.id)
      const commits = req.body.commits
      for (const commit of commits) {
        const tweet = await getGroqChatCompletion(commit.message, "tweet")
        const linkedinPost = await getGroqChatCompletion(commit.message, "linkedin-post")
        log("Content1: ", tweet,"Content2: ", linkedinPost);
        if (!tweet && !linkedinPost) {
          error("error occurred during post creation")
        }
        const post = await databaseService.createPost({event, content: tweet, app: "X",  providerID })
        const post2 = await databaseService.createPost({event, content: linkedinPost, app: "linkedin",  providerID })
        if (post && post2) {
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

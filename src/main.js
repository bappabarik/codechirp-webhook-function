import databaseService from './conf.js';
import getGroqChatCompletion from './createPostAi.js';

export default async ({ req, res, log, error }) => {
  if (req.path  === "/test") {
    res.send("test running...")
  }

  if (req.path === "/webhook") {
    const event = req.headers["x-github-event"];
    if (event === 'push') {
      const providerID = String(req.body.sender.id)
      const commits = req.body.commits
      for (const commit of commits) {
        let context = `commit message : ${commit.message}
                      commit url: ${commit.url}
                      add this commit url to the post
                      `
        const tweet = await getGroqChatCompletion(context, "tweet")
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
    } else if(event === "installation"){
      const id = req.body.installation.account.id
      const action = req.body.action
      log(id)
      const isInstallationExist = await databaseService.getGithubAppData(id)
      if (isInstallationExist && action === "deleted") {
          const deleted = await databaseService.deleteInstallation(id)
          log(deleted);
          
          deleted ? log("installation deleted successfully!") : log("Failed to delete installation!!!")
      } else if(!isInstallationExist && action === "created"){
        const created = await databaseService.storeGithubAppData(id, req.body.installation.id)
        created ? log("Github app installed successfully!") : log("Failed to install the github app!!!")
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

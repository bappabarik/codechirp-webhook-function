import databaseService from './conf.js';
import getChatCompletion from './createPostAi.js';
import fetchGitDiff from './gitDiff.js';

export default async ({ req, res, log, error }) => {
  if (req.path  === "/test") {
    res.send("test running...")
  }

  if (req.path === "/webhook") {
    const event = req.headers["x-github-event"];
    if (event === 'push') {
      const owner = req.body.repository.owner.name
      const repo = req.body.repository.name
      const providerID = String(req.body.sender.id)
      const commits = req.body.commits

      for (const commit of commits) {
        let diff = ''
        fetchGitDiff(owner, repo, commit.id)
        .then(data => {
          diff = `${data}` || ''
        })
        // console.log(owner, repo, diff);
        let context = `CONTEXT:
                        Repository: ${repo}
                        Commit message: ${commit.message}
                        Author: ${commit.author.name}
                        Date: ${commit.timestamp}
                        
                        CHANGES:
                        ${diff}
                        `
        const tweet = await getChatCompletion(context, "tweet")
        const linkedinPost = await getChatCompletion(context, "linkedin-post")
        // log("Content1: ", tweet,"Content2: ", linkedinPost);
        log("diff", context)
        if (!tweet && !linkedinPost) {
          error("error occurred during post creation")
        }
        const post = await databaseService.createPost({event, content: tweet, app: "X",  providerID, commitMessage: commit.message })
        const post2 = await databaseService.createPost({event, content: linkedinPost, app: "linkedin",  providerID, commitMessage: commit.message })
        if (post && post2) {
          log("post created successfully");
        }

      }
    } else if(event === "installation"){
      const providerId = String(req.body.installation.account.id)
      const action = req.body.action
      const installationID = String(req.body.installation.id)
      log(typeof providerId, installationID)
      const isInstallationExist = await databaseService.getGithubAppData(providerId)
      if (isInstallationExist && action === "deleted") {
          await databaseService.deleteInstallation(providerId)
          .then(response => {
            response ? log("installation deleted successfully!", response) : log("Failed to delete installation!!!", response)
          })
          .catch(error => {
              error("Failed to delete installation!!!", error)
          })
      } else if(!isInstallationExist && action === "created"){
        await databaseService.storeGithubAppData(providerId, {installationID})
        .then(response => {
          response ? log("Github app installed successfully!") : log("Failed to install the github app!!!")
        })
        .catch(error => {
          error("Failed to install the github app!!!", error)
        })
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

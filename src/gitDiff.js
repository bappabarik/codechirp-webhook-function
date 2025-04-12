export default async function fetchGitDiff(owner, repo, commitSha) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;

    fetch(url, {
    headers: { Accept: "application/vnd.github.v3.diff" },
    })
    .then(res => res.text())
    .then(diffOutput => 
    {
        return diffOutput;
    }
    )
    .catch(err =>{
         console.error("Error:", err)
         return null;
        });
}
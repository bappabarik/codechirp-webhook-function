export default async function fetchGitDiff(owner, repo, commitSha) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;

    try {
        const response = await fetch(url, {
            headers: { Accept: "application/vnd.github.v3.diff" }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }
        
        const diffOutput = await response.text();
        return diffOutput;
    } catch (err) {
        console.error("Error:", err);
        return null;
    }
}
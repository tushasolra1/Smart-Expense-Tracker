const repoOwner = "tushar";
const repoName = "expense-tracker";

const commitsUrl = `http://localhost:3000/api/v1/repos/${repoOwner}/${repoName}/commits`;
const issuesUrl = `http://localhost:3000/api/v1/repos/${repoOwner}/${repoName}/issues`;

async function loadData() {

    try {

        const commitRes = await fetch(commitsUrl);
        const commits = await commitRes.json();

        const commitsList = document.getElementById("commits");

        commits.slice(0,5).forEach(c => {
            const li = document.createElement("li");
            li.textContent = c.commit.message;
            commitsList.appendChild(li);
        });


        const issueRes = await fetch(issuesUrl);
        const issues = await issueRes.json();

        const issuesList = document.getElementById("issues");

        issues.forEach(i => {
            const li = document.createElement("li");
            li.textContent = `${i.title} - ${i.state}`;
            issuesList.appendChild(li);
        });

    }

    catch(error) {
        console.error("Error loading data:", error);
    }

}

loadData();
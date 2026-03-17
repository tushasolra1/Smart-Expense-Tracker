import { useEffect, useState } from "react";

export default function DevDashboard() {
  const [commits, setCommits] = useState([]);
  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [commitRes, issueRes, buildRes] = await Promise.all([
        fetch("http://localhost:3000/api/v1/repos/tushar/expense-tracker/commits"),
        fetch("http://localhost:3000/api/v1/repos/tushar/expense-tracker/issues"),
        fetch("http://localhost:8080/job/ExpenseTrackerPipeline/lastBuild/api/json")
      ]);

      const commitData = await commitRes.json();
      const issueData = await issueRes.json();
      const buildData = await buildRes.json();

      setCommits(commitData.slice(0, 5));
      setIssues(issueData);
      setStatus(buildData.result || "RUNNING");

    } catch (err) {
      console.error(err);
      setStatus("ERROR");
    }
  };

  const statusColor = {
    SUCCESS: "text-green-400",
    FAILURE: "text-red-400",
    RUNNING: "text-yellow-400",
    ERROR: "text-gray-400"
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        🚀 DevOps Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Build Status</h3>
          <h1 className={`text-3xl font-bold ${statusColor[status]}`}>
            {status}
          </h1>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Recent Commits</h3>
          <h1 className="text-3xl font-bold">{commits.length}</h1>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Open Issues</h3>
          <h1 className="text-3xl font-bold">{issues.length}</h1>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Commits */}
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">📊 Recent Commits</h2>
          <div className="space-y-3">
            {commits.map((c, i) => (
              <div key={i} className="bg-gray-700 p-3 rounded">
                ✔ {c.commit.message}
              </div>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">🐞 Issues</h2>
          <div className="space-y-3">
            {issues.length === 0 ? (
              <p className="text-green-400">No issues 🎉</p>
            ) : (
              issues.map((issue, i) => (
                <div key={i} className="bg-gray-700 p-3 rounded">
                  ⚠ {issue.title}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
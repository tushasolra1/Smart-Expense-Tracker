import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [buildStatus, setBuildStatus] = useState("Loading...");
  const [buildNumber, setBuildNumber] = useState("-");
  const [buildUrl, setBuildUrl] = useState("#");
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState(null);
  const [buildHistory, setBuildHistory] = useState([]);
  const [commits, setCommits] = useState([]);
  const [showCommits, setShowCommits] = useState(false);

  // 🔹 FETCH JENKINS DATA
  const fetchData = async () => {
    try {
      // Latest build
      const res = await fetch(
        "/jenkins/job/ExpenseTrackerPipeline/lastBuild/api/json"
      );
      const data = await res.json();

      setBuildStatus(data.result || "IN PROGRESS");
      setBuildNumber(data.number);
      setBuildUrl(data.url);

      // Build history (last 5)
      const historyRes = await fetch(
        "/jenkins/job/ExpenseTrackerPipeline/api/json?tree=builds[number,result,url]{0,5}"
      );
      const historyData = await historyRes.json();

      setBuildHistory(historyData.builds || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Jenkins data");
    }
  };

  // 🔥 TRIGGER BUILD
  const triggerBuild = async () => {
    try {
      setIsBuilding(true);

      await fetch(
        "/jenkins/job/ExpenseTrackerPipeline/build",
        {
          method: "POST",
        }
      );

      setTimeout(fetchData, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to trigger build");
    } finally {
      setIsBuilding(false);
    }
  };

  // 🔥 FETCH COMMITS (GITEA)
  const fetchCommits = async () => {
  try {
    const res = await fetch(
      "/gitea/repos/tushar/expense-tracker/commits",
      {
        headers: {
          Authorization: "token 40d8f8e6fa3193d0adddc44a3b0185c30d6f6f1f",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Unauthorized or failed request");
    }

    const data = await res.json();

    setCommits(data.slice(0, 5));
    setShowCommits(true);

  } catch (err) {
    console.error(err);
    alert("❌ Failed to fetch commits");
  }
};

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (buildStatus === "SUCCESS") return "text-green-400";
    if (buildStatus === "FAILURE") return "text-red-400";
    if (buildStatus === "IN PROGRESS") return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen text-white p-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">⚙️ Admin Panel</h1>

        <button
          onClick={triggerBuild}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
        >
          {isBuilding ? "Triggering..." : "Trigger Build 🚀"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
          <h2 className="text-lg mb-2">Build Status</h2>
          <p className={`text-3xl font-bold ${getStatusColor()}`}>
            {buildStatus}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
          <h2 className="text-lg mb-2">Build Number</h2>
          <p className="text-3xl font-bold">{buildNumber}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl flex flex-col justify-between">
          <h2 className="text-lg mb-2">Jenkins</h2>
          <a
            href={buildUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-center"
          >
            Open Build 🔗
          </a>
        </div>
      </div>

      {/* ADMIN CONTROLS */}
      <div className="mt-10 bg-white/10 p-6 rounded-2xl">
        <h2 className="text-xl mb-4">Admin Controls</h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={fetchData}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Refresh Data 🔄
          </button>

          <button
            onClick={fetchCommits}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
          >
            View Commits 📦
          </button>
        </div>
      </div>

      {/* COMMITS SECTION */}
      {showCommits && (
        <div className="mt-10 bg-white/10 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">📦 Recent Commits</h2>

          <div className="space-y-3">
            {commits.map((commit, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <p className="font-semibold">
                  {commit.commit.message}
                </p>

                <p className="text-sm text-gray-400">
                  👤 {commit.commit.author.name}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(commit.commit.author.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUILD HISTORY */}
      <div className="mt-10 bg-white/10 p-6 rounded-2xl">
        <h2 className="text-xl mb-4">📜 Build History</h2>

        <div className="space-y-3">
          {buildHistory.map((build) => (
            <div
              key={build.number}
              className="flex justify-between items-center bg-white/5 p-4 rounded-lg"
            >
              <div>
                <p className="font-bold">Build #{build.number}</p>
                <p
                  className={`text-sm ${
                    build.result === "SUCCESS"
                      ? "text-green-400"
                      : build.result === "FAILURE"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {build.result || "IN PROGRESS"}
                </p>
              </div>

              <a
                href={build.url}
                target="_blank"
                rel="noreferrer"
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg"
              >
                View 🔗
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-400 text-sm">
        Auto-refresh every 5s • Admin Access Enabled 🔐
      </div>
    </div>
  );
}
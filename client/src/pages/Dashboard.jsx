import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import api from "../api/axios";

function Dashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        api.get("/tasks/stats/summary"),
        api.get("/tasks?limit=5"),
      ]);
      setStats(statsRes.data);
      setRecentTasks(tasksRes.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: "bg-gray-100 text-gray-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status] || colors.todo;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    };
    return colors[priority] || colors.medium;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your tasks today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.total || 0}
              </p>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">To Do</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.todo || 0}
              </p>
            </div>
            <Clock className="h-10 w-10 text-gray-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.inProgress || 0}
              </p>
            </div>
            <AlertCircle className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.completed || 0}
              </p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
          <Link
            to="/tasks"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="divide-y divide-gray-200">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <div key={task._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(task.status)}`}
                      >
                        {task.status}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">
                No tasks yet. Create your first task!
              </p>
              <Link
                to="/tasks"
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


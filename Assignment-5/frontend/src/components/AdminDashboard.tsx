import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

interface Feedback {
  _id: string;
  studentName: string;
  course: string;
  rating: number;
  comments: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load feedback. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const calculateAverage = () => {
    if (feedbacks.length === 0) return 0;
    return (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Admin Dashboard</h2>
          <p className="text-zinc-400 mt-1">Review and analyze student feedback.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-zinc-900/50 border border-zinc-800 px-6 py-4 rounded-2xl text-center shadow-lg backdrop-blur-sm">
            <p className="text-zinc-400 text-sm font-medium mb-1">Total</p>
            <p className="text-3xl font-bold text-white">{feedbacks.length}</p>
          </div>
          <div className="flex-1 md:flex-none bg-zinc-900/50 border border-zinc-800 px-6 py-4 rounded-2xl text-center shadow-lg backdrop-blur-sm">
            <p className="text-zinc-400 text-sm font-medium mb-1">Average</p>
            <p className="text-3xl font-bold flex items-center gap-2 justify-center text-white">
              <FaStar className="text-yellow-400 mb-1" size={20}/> 
              {calculateAverage()}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
         <div className="text-center py-12 text-red-400 bg-red-500/10 rounded-2xl border border-red-500/20">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((f) => (
            <div key={f._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-white mb-0.5">{f.studentName}</h3>
                  <span className="px-2.5 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">{f.course}</span>
                </div>
                <div className="flex gap-0.5 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} className={i < f.rating ? "text-yellow-400 drop-shadow-[0_0_2px_rgba(250,204,21,0.5)]" : "text-zinc-700"} />
                  ))}
                </div>
              </div>
              <p className="text-zinc-300 text-sm mb-6 leading-relaxed flex-1 italic group-hover:text-zinc-100 transition-colors">
                 "{f.comments || "No written comments provided."}"
              </p>
              <div className="text-xs font-mono text-zinc-500 mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
                <span>{new Date(f.createdAt).toLocaleDateString()}</span>
                <span>{new Date(f.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
          {feedbacks.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
              <FaStar className="text-zinc-700 mb-4" size={48} />
              <p className="text-lg font-medium text-zinc-400">No Feedback Yet</p>
              <p className="text-sm">Wait for students to submit their evaluations.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

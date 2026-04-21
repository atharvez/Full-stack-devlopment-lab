import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import AdminDashboard from './components/AdminDashboard';
import { MdDashboard, MdFeedback } from 'react-icons/md';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
        <nav className="bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 p-4 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Nexus Feedback</h1>
            <div className="flex gap-4">
              <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><MdFeedback /> Submit</Link>
              <Link to="/admin" className="flex items-center gap-2 hover:text-indigo-400 transition-colors"><MdDashboard /> Admin</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
          <Routes>
            <Route path="/" element={<FeedbackForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

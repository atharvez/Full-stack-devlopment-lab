import { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ studentName: '', course: '', rating: 0, comments: '' });
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please provide a rating');
      return;
    }
    setStatus('submitting');
    try {
      await axios.post('http://localhost:5000/api/feedback', formData);
      setStatus('success');
      setFormData({ studentName: '', course: '', rating: 0, comments: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl mt-12">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">How was the course?</h2>
        <p className="text-zinc-400 text-sm">Your feedback helps us improve.</p>
      </div>
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center font-medium">
          Feedback submitted successfully! Thank you.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center font-medium">
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Student Name</label>
          <input required type="text" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Course Code or Name</label>
          <input required type="text" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors" placeholder="e.g. CS101" />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1 text-center font-medium">Rating</label>
          <div className="flex justify-center gap-2 my-2">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i} className="cursor-pointer">
                  <input type="radio" className="hidden" value={ratingValue} onClick={() => setFormData({...formData, rating: ratingValue})} />
                  <FaStar 
                    className="transition-colors duration-200" 
                    color={ratingValue <= (hover || formData.rating) ? "#fbbf24" : "#3f3f46"} 
                    size={32} 
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Comments (Optional)</label>
          <textarea rows={4} value={formData.comments} onChange={(e) => setFormData({...formData, comments: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Share your thoughts..."></textarea>
        </div>
        <button disabled={status === 'submitting'} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-500/20">
          {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

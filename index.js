import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [topics, setTopics] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setPlan('');
    try {
      const res = await axios.post('/api/generate', { topics });
      setPlan(res.data.plan);
    } catch (err) {
      console.error(err);
      alert('Error generating study plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center text-black font-bold">
      <h1 className="text-3xl font-extrabold mb-4 text-black">🎯 AI Study Planner</h1>
      <textarea
        className="w-full max-w-md p-4 rounded shadow text-black font-semibold"
        rows="6"
        placeholder="Enter your weak topics or subjects..."
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Study Plan'}
      </button>

      {plan && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-md whitespace-pre-wrap text-black font-medium">
          <h2 className="font-extrabold mb-2 text-black">📝 Your Personalized Plan:</h2>
          {plan}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Bet {
  determination: string;
  // Add other properties of Bet if needed
}

const Statistics = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [stats, setStats] = useState({
    totalBets: 0,
    wonBets: 0,
    lostBets: 0,
    yield: 0,
    units: 0
  });

  useEffect(() => {
    const fetchBets = async () => {
      const response = await axios.get<Bet[]>('https://api.example.com/bets');
      setBets(response.data);
      calculateStats(response.data);
    };

    fetchBets();
  }, []);

  const calculateStats = (bets: Bet[]) => {
    const totalBets = bets.length;
    const wonBets = bets.filter(bet => bet.determination === 'GANADA').length;
    const lostBets = bets.filter(bet => bet.determination === 'PERDIDA').length;
    const yieldPercentage = (wonBets - lostBets) / totalBets * 100;
    const units = wonBets - lostBets;

    setStats({ totalBets, wonBets, lostBets, yield: yieldPercentage, units });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Betting Statistics</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Bets</h2>
          <p className="text-2xl">{stats.totalBets}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Won Bets</h2>
          <p className="text-2xl">{stats.wonBets}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Lost Bets</h2>
          <p className="text-2xl">{stats.lostBets}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Yield</h2>
          <p className="text-2xl">{stats.yield.toFixed(2)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Units</h2>
          <p className="text-2xl">{stats.units}</p>
        </div>
      </div>
      {/* Aquí puedes agregar una gráfica usando una librería como Chart.js */}
    </div>
  );
};

export default Statistics;
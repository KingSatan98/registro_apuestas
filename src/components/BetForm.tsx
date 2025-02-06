import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { BetFormData, Bet } from '../types';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Tesseract from 'tesseract.js';

const userTypes = ['Staker', 'Tipster', 'Betburger'];

const BetForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [recentBets, setRecentBets] = useState<Bet[]>([]);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<BetFormData>();

  const onSubmit = async (data: BetFormData) => {
    try {
      const formattedData: Bet = {
        match: data.match.trim(),
        bet_type: data.bet_type.trim(),
        odds: Number(data.odds),
        bank: Number(data.bank),
        type: data.type,
        determination: data.determination // Nuevo campo
      };

      const response = await axios.post('https://hook.eu2.make.com/r0sd56dn2exc4akaprmpwqf3a9cs5nru', formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setRecentBets(prev => [formattedData, ...prev].slice(0, 5));
      setSubmitStatus('success');
      reset();

      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = await Tesseract.recognize(reader.result as string, 'eng');
        const text = result.data.text;
        // Aquí puedes agregar lógica para extraer las variables del texto
        // Por ejemplo:
        const match = text.match(/Match: (.+)/)?.[1];
        const bet_type = text.match(/Bet Type: (.+)/)?.[1];
        const odds = text.match(/Odds: (.+)/)?.[1];
        const bank = text.match(/Bank: (.+)/)?.[1];
        const type = text.match(/Type: (.+)/)?.[1];
        const determination = text.match(/Determination: (.+)/)?.[1];

        if (match) setValue('match', match);
        if (bet_type) setValue('bet_type', bet_type);
        if (odds) setValue('odds', Number(odds));
        if (bank) setValue('bank', Number(bank));
        if (type) setValue('type', type);
        if (determination) setValue('determination', determination);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo para subir la captura de pantalla */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Screenshot</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        {/* Campos del formulario */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Match</label>
          <input
            type="text"
            {...register('match', { required: 'Match is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="Example FC vs Demo United"
          />
          {errors.match && (
            <p className="mt-1 text-sm text-red-600">{errors.match.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bet Type</label>
          <input
            type="text"
            {...register('bet_type', { required: 'Bet type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="Enter your bet type"
          />
          {errors.bet_type && (
            <p className="mt-1 text-sm text-red-600">{errors.bet_type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Odds</label>
          <input
            type="number"
            step="0.01"
            {...register('odds', {
              required: 'Odds are required',
              min: { value: 1, message: 'Odds must be greater than 1' },
              pattern: { value: /^\d*\.?\d*$/, message: 'Please enter a valid number' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="2.35"
          />
          {errors.odds && (
            <p className="mt-1 text-sm text-red-600">{errors.odds.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bank</label>
          <input
            type="number"
            {...register('bank', {
              required: 'Bank is required',
              min: { value: 1, message: 'Bank must be greater than 0' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="100"
          />
          {errors.bank && (
            <p className="mt-1 text-sm text-red-600">{errors.bank.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            {...register('type', { required: 'Type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          >
            <option value="">Select type</option>
            {userTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Determination</label>
          <select
            {...register('determination', { required: 'Determination is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          >
            <option value="GANADA">GANADA</option>
            <option value="PERDIDA">PERDIDA</option>
            <option value="NULA">NULA</option>
            <option value="PENDIENTE">PENDIENTE</option>
          </select>
          {errors.determination && (
            <p className="mt-1 text-sm text-red-600">{errors.determination.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Bet
        </button>

        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircleIcon className="h-5 w-5" />
            <span>Bet successfully sent!</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600">
            <ExclamationCircleIcon className="h-5 w-5" />
            <span>Error submitting bet. Please try again.</span>
          </div>
        )}
      </form>

      {recentBets.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Bets</h2>
          <div className="space-y-4">
            {recentBets.map((bet, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{bet.match}</p>
                <div className="mt-1 text-sm text-gray-500">
                  <p>Type: {bet.type} | Bet Type: {bet.bet_type}</p>
                  <p>Odds: {bet.odds} | Bank: {bet.bank}</p>
                  <p>Determination: {bet.determination}</p> {/* Mostrar determinación */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BetForm;

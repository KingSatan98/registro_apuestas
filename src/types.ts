export interface Bet {
  match: string;
  bet_type: string;
  odds: number;
  bank: number;
  type: string;
}

export interface BetFormData {
  match: string;
  bet_type: string;
  odds: string;
  bank: string;
  type: string;
}
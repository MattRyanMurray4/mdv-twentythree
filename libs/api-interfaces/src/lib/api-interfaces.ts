export interface Pokemon {
  id: string;
  name: string;
  url?: string;
  height: number;
  weight: number;
  base_experience: string;
}

export interface User {
  email: string;
  password: string;
}

export const emptyPokemon = {
  id: '',
  name: '',
  url: '',
  height: 0,
  weight: 0,
  base_experience: '',
};

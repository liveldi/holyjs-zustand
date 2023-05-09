import { Movie, GetMovieResponse, Status } from '@/types';
import { create } from 'zustand';
import { fetchRequest } from '@/helpers/fetch-request';
import { persist, devtools } from 'zustand/middleware';
;
export interface MovieStore {
  movie?: Movie;
  status: Status;
  loadMovie: (id: number) => void;
};

export const useMovie = create<MovieStore>()(
  devtools(
    (set, _get) => ({
      movie: undefined,
      status: 'default',
      loadMovie: async (id) => {
        set({ status: 'loading' });

        try {
          const data = await fetchRequest<GetMovieResponse>(`/api/movie?id=${id}`);
          set({
            status: 'success',
            movie: data
          });
        } catch (err) {
          set({ status: 'error' });
        }
      },
    }),
    { name: "Movie" }
  ));
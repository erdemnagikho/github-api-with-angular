import { IUser } from './user';

export interface ISearch {
  total_count: number;
  incomplete_results: boolean;
  items: IUser[];
}

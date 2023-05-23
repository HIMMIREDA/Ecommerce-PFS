export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: { id: string; username: string };
}

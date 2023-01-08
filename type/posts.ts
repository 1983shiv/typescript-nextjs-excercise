export interface PostProps {
  id?: string,
  post: {
    userId?: number;
    id?: string;
    title?: string;
    body?: string;
  }
}
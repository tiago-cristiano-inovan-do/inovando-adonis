export interface ResponseDTO<T> {
  pagination: {
    page: number;
    firstPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
  data: [T];
}

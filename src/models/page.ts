export default interface Page<T> {
  content: Array<T>;
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  first?: boolean;
  sort?: {
    sorted?: boolean;
    unsorted?: boolean;
    empty?: boolean;
  };
  numberOfElements: number;
  size?: number;
  number: number;
  empty?: boolean;
}

export default interface Page<T> {
  content: Array<T>;
  pageable?: {
    sort?: {
      sorted?: boolean;
      unsorted?: boolean;
      empty?: boolean;
    };
    pageNumber?: number;
    pageSize?: number;
    offset?: number;
    unpaged?: boolean;
    paged?: boolean;
  };
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  first?: boolean;
  sort?: {
    sorted?: boolean;
    unsorted?: boolean;
    empty?: boolean;
  };
  numberOfElements?: number;
  size?: number;
  number?: number;
  empty?: boolean;
}

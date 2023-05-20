export enum MediaItemFilterType {
  LANGUAGE,
  YEAR_OF_RELEASE,
}

export interface MediaItemFilter {
  name: string;
  type: MediaItemFilterType;
  filterValue: string;
}

export interface BaseEntity {
  id: string | null;
  title?: string | null;
}

export interface Trip extends BaseEntity {
  title: string;
  description: string;
  date: string;
  destinations?: Destination[];
}

export interface Destination extends BaseEntity {
  title: string;
  description: string;
  date: string;
  tripId: any;
}

export interface Position {
  latitude: number;
  longitude: number;
  speed: number | null;
}

export type PositionToShowOption = 'current' | 'lastAccess';

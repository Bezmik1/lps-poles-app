export type PoleType =
  | 'anchor'
  | 'intermediate'
  | 'angle'
  | 'transposition'
  | 'branch';

export type PoleMaterial =
  | 'wood'
  | 'concrete'
  | 'steel'
  | 'reinforced_concrete';

export type PoleCondition =
  | 'good'
  | 'needs_repair'
  | 'critical'
  | 'unknown';

export interface PolePhoto {
  id: string;
  imageUrl: string;
  fileName: string;
  poleType: PoleType;
  material: PoleMaterial;
  condition: PoleCondition;
  confidence: number;
  latitude?: number;
  longitude?: number;
  comment?: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
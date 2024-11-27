export const CATEGORIES = [
  'sofa',
  'chair',
  'stool',
  'table',
  'desk',
  'kitchen',
  'vanitory',
  'matress',
  'mirror',
  'wardrove',
  'lamp',
  'tv table',
  'garden',
] as const;

export const WOOD_TYPES = [
  'walnut',
  'maple',
  'oak',
  'pine',
  'eucalyptus',
  'bamboo',
  'teak',
  'cedar',
] as const;

export const FINISHES = ['dark', 'medium', 'light', 'natural'] as const;

export type Category = (typeof CATEGORIES)[number];
export type WoodType = (typeof WOOD_TYPES)[number];
export type Finish = (typeof FINISHES)[number];

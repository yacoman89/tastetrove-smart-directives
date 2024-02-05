import { Color } from './colors.model';

export const TagLinkTemplate = '/api/tags?id={id}';
export const TagLinkRegex = /\{id\}/;
export interface DbTag {
  id: number;
  title: string;
  color: Color;
}

export type Tag = DbTag;

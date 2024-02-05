export const UsersLinkTemplate = '/api/users?id={id}';
export const UsersLinkRegex = /\{id\}/;
export interface DbUser {
  id: number;
  name: string;
}

export type User = DbUser;

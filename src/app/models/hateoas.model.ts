export interface Link {
  href: string;
  title?: string;
}

export interface SelfLinkRelation {
  self: Link;
};

export type LinkRelations<Relations extends string> = {
  [rel in Relations]: Link;
}

export interface HateoasObject<Relations extends SelfLinkRelation> {
  _links: Relations;
}

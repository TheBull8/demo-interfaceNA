export interface ITrees {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface IUsers {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sid: string;
  sub: string;
  updated_at: Date;
}
export interface IItems {
  id: string;
  blockchain: string;
  collection: string;
  contract: string;
  tokenId: string;
  creators: [];
  lazySupply: string;
  pending: [];
  bestSellOrder?: IBestSellOrder;
  mintedAt: Date;
  meta: IMeta;
  lastUpdatedAt: Date;
  supply: string;
  deleted: boolean;
  originOrders: [];
  ammOrders: {};
  auctions: [];
  totalStock: string;
  sellers: number;
  suspicious: boolean;
}

export interface IMeta {
  name: string;
  description: string;
  tags: [];
  genres: [];
  externalUri: string;
  originalMetaUri: string;
  attributes: IAttributes[];
  content: IContent[];
  restrictions: [];
}
export interface IAttributes {
  key: string;
  value: string;
}
export interface IContent {
  type: string;
  url: string;
  representation: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
}
export interface IBestSellOrder {
  id: string;
  fill: string;
  platform: string;
  status: string;
  makeStock: string;
  cancelled: boolean;
  optionalRoyalties: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
  dbUpdatedAt: Date;
  makePrice: number;
  makePriceUsd: number;
  maker: string;
  make: {};
  take: {};
  salt: string;
  signature: string;
  data: {};
}

export interface INftItems {
  item: IItems;
  ownership: IItemsOwnership;
}

export interface IItemsOwnership {
  id: string;
  blockchain: string;
  collection: string;
  owner: string;
  value: string;
  createdAt: string;
  creators: [];
  lazyValue: string;
}

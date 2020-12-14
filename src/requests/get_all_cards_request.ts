import { BASE_POKEDEX_URL } from '../config';
import { CardModel, isCardModel } from '../model/card_model';
import { BaseAPIConfig, ContentType, HttpMethod } from './base_http_request';
import { GenericHTTPRequest } from './generic_http_request';

const DEFAULT_LIMIT = '20';

export interface Params {
  name?: string;
  type?: string;
}

export class GetAllCardsRequest extends GenericHTTPRequest<CardModel[]> {
  constructor(args?: Params) {
    //TODO: add args to request

    const config: BaseAPIConfig = {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      baseURL: BASE_POKEDEX_URL,
      url: `/cards`,
      params: {
        limit: DEFAULT_LIMIT,
      },
    };
    super(config, isGetAllCardResponse);
  }
}

export function isGetAllCardResponse(obj: unknown): obj is CardModel[] {
  const result = obj as CardModel[];

  const isArray = Array.isArray(result);
  if (isArray && result.length > 0) {
    return isCardModel(result[0]);
  }

  return isArray;
}

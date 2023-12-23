import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Dictionary } from '../shared/models/dictionary';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  private getBaseUrl = () => ConfigService.config.api.gatewayUrl + '/api';

  public root = (): Root => new Root(this.httpClient, this.getBaseUrl());

  public collection = (name: string): Collection =>
    new Collection(this.httpClient, this.getBaseUrl(), name);

  static addQueryParameters(
    query: string,
    queryParameters: Dictionary<string>,
  ) {
    let url = '';

    if (queryParameters) {
      for (const key of Object.keys(queryParameters)) {
        url += key + '=' + queryParameters[key] + '&';
      }
      url = url.substring(0, url.length - 1);
    }

    if (!query) {
      query = '';
    }
    if (url) {
      if (query.length > 1 && query.startsWith('?')) {
        query += '&' + url;
      } else {
        query = '?' + url;
      }
    }
    return query;
  }
}

class Root {
  constructor(
    private httpClient: HttpClient,
    private baseUrl: string,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  public function = (name: string): Function =>
    new Function(this.httpClient, this.baseUrl, name);

  public action = (name: string): Action =>
    new Action(this.httpClient, this.baseUrl, name);
}

class Action {
  url: string;

  constructor(
    private httpClient: HttpClient,
    url: string,
    name: string,
  ) {
    this.url = url + '/' + name;
  }

  public execute<T>(
    body?: unknown,
    queryParams?: Dictionary<string>,
  ): Observable<T> {
    let query = '';

    if (queryParams) {
      query = DataService.addQueryParameters(query, queryParams);
    }

    return this.httpClient.post<T>(this.url + query, body);
  }
}

class Function {
  private readonly functionUrl: string;
  constructor(
    private httpClient: HttpClient,
    url: string,
    name: string,
  ) {
    this.functionUrl = url + '/' + name;
  }

  public execute<T>(queryParams?: Dictionary<string>): Observable<T> {
    let query = '';

    if (queryParams) {
      query = DataService.addQueryParameters(query, queryParams);
    }

    return this.httpClient.get<T>(this.functionUrl + query);
  }
}

class Collection {
  private readonly collectionUrl: string;
  constructor(
    private httpClient: HttpClient,
    baseUrl: string,
    name: string,
  ) {
    this.collectionUrl = baseUrl + '/' + name;
  }

  public get<T>(queryParameters?: Dictionary<string>) {
    let query = '';

    if (queryParameters) {
      query = DataService.addQueryParameters(query, queryParameters);
    }
    return this.httpClient.get<T>(this.collectionUrl + query);
  }

  public entity = (entityId: string) =>
    new Entity(this.httpClient, this.collectionUrl, entityId);

  // eslint-disable-next-line @typescript-eslint/ban-types
  public function = (name: string): Function =>
    new Function(this.httpClient, this.collectionUrl, name);

  public action = (name: string): Action =>
    new Action(this.httpClient, this.collectionUrl, name);
}

class Entity {
  entityUrl: string;
  constructor(
    private httpClient: HttpClient,
    collectionUrl: string,
    entityId?: string,
  ) {
    this.entityUrl = entityId ? collectionUrl + '/' + entityId : collectionUrl;
  }

  public get<T>(queryParameters?: Dictionary<string>) {
    let query = '';
    if (queryParameters) {
      query = DataService.addQueryParameters(query, queryParameters);
    }
    return this.httpClient.get<T>(this.entityUrl + query);
  }

  public delete() {
    return this.httpClient.delete(this.entityUrl);
  }

  public patch(body: unknown) {
    return this.httpClient.patch(this.entityUrl, body);
  }

  public put(body: unknown) {
    return this.httpClient.put(this.entityUrl, body);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public function = (name: string): Function =>
    new Function(this.httpClient, this.entityUrl, name);

  public action = (name: string): Action =>
    new Action(this.httpClient, this.entityUrl, name);
}

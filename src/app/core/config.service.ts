import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import configData from '../../../config.json';
import { Config } from '../shared/models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  static config: Config = configData;
}

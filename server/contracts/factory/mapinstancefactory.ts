import { IMapInstance } from '..';
import { MapType } from '../../common';

export interface IMapInstanceFactory {
  create(maptype: MapType): IMapInstance;
}

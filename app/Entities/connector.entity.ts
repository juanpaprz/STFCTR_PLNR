import { Element } from '../Entities/element.entity';

export class Connector extends Element {
  inputs: number = 0;
  outputs: number = 0;
}

export const CONNECTORS: Connector[] = [
  { name: 'Merger', id: 0, inputs: 3, outputs: 1 },
  { name: 'Splitter', id: 0, inputs: 1, outputs: 3 },
];

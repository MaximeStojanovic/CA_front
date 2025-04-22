export enum PartnerType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

export enum Direction {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

export enum ProcessedFlowType {
  FILE = 'FILE',
  MESSAGE = 'MESSAGE',
  API = 'API'
}

export interface Partner {
  id: string;
  alias: string;
  type: PartnerType;
  direction: Direction;
  application: string;
  processedFlowType: ProcessedFlowType;
  description: string;
} 
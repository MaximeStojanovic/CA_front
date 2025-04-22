export interface JmsMessage {
  content: string;
  destination: string;
  properties?: {
    [key: string]: string;
  };
} 

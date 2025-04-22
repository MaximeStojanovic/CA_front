export interface Message {
  id: string;
  status: string;
  type: string;
  content: string;
  createdAt: Date;
  timestamp: Date;
  queueName: string;
  metadata?: {
    [key: string]: any;
  };
} 
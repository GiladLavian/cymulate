export interface Message {
  id: string;
  createdAt: Date;
  recipient: string;
  sender: string;
  subject: string;
  body: string;
  messageType: string
  status: "pending" | "sent" | "failed";
}

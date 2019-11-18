import { Moment } from "moment";

export class Recommended {
  id: number;
  title: string;
  description: string;
  audit: {
    createdAt: Moment;
    updatedAt: Moment;
    deleted: number;
    enabled: number;
  };
}

import { Moment } from "moment";

export class Audit {
  deleted: boolean;
  enabled: boolean;
  createdAt: Moment;
  updatedAt: Moment;

  constructor() {}
}

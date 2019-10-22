import { Moment } from "moment";
import { Audit } from "@app/_models/audit";
import { User } from "@app/_models/user";

export class Coupon {
  id: number;
  title: string;
  startsAt: Moment;
  endsAt: Moment;
  description: string;
  type: CouponType;
  code: string;
  imageUrl: string;
  audit: Audit;
  user: User;

  constructor() {}
}

export class CouponType {
  id: number;
  description: string;
  audit?: Audit;
}

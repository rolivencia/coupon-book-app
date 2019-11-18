import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Recommended} from "@app/_models/recommended";

@Injectable({
  providedIn: "root"
})
export class RecommendedService {
  constructor() {}

  get(): Observable<Recommended[]> {
    return null;
  }
}

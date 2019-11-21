import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { RecommendedService } from "@app/_services/recommended.service";
import { Recommended } from "@app/_models/recommended";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecommendedResolverService implements Resolve<Observable<Recommended[]>> {
  constructor(private recommendedService: RecommendedService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.recommendedService.get(false, false);
  }
}

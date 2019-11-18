import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recommended } from "@app/_models/recommended";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecommendedService {

  recommended = [];

  constructor(private http: HttpClient) {}

  public get = (): Observable<Recommended[]> => {
    return this.http
      .get<Recommended[]>(`${environment.apiUrl}/recommended/get`)
      .pipe(
        map(recommendations =>
          recommendations.map(recommendation => ({
            ...recommendation,
            audit: {
              ...recommendation.audit,
              createdAt: moment(recommendation.audit.createdAt),
              updatedAt: moment(recommendation.audit.updatedAt)
            }
          }))
        )
      );
  };
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "@app/_models/customer";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${environment.apiUrl}/customer/getById/${id}`
    );
  }

  getByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(
        `${environment.apiUrl}/customer/getByEmail/${email}`
    );
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.apiUrl}/customer/create`,
      {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        uidFirebase: customer.uidFirebase,
        imageUrl: customer.imageUrl
      }
    );
  }

  async logInSqlDatabase(result, loggedWith: string, userInfo?: any) {
    const customer: Customer = {
      // firstName: result.additionalUserInfo.profile.first_name
      //   ? result.additionalUserInfo.profile.first_name
      //   : result.additionalUserInfo.profile.given_name,
      // lastName: result.additionalUserInfo.profile.last_name
      //   ? result.additionalUserInfo.profile.last_name
      //   : result.additionalUserInfo.profile.family_name,
      // imageUrl: result.additionalUserInfo.profile.picture.data
      //   ? result.additionalUserInfo.profile.picture.data.url
      //   : result.additionalUserInfo.profile.picture,
      // uidFirebase: result.additionalUserInfo.profile.id
      //   ? result.additionalUserInfo.profile.id
      //   : result.additionalUserInfo.profile.sub,
      // email: result.additionalUserInfo.profile.email
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      imageUrl: "",
      uidFirebase: "",
      email: userInfo.email
    };
    const sqlUser = await this.create(customer).toPromise();
    localStorage.setItem("customer", JSON.stringify(sqlUser));
    return sqlUser;
  }
}

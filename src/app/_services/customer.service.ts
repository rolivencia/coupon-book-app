import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@app/_models/customer';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    getById(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${environment.apiUrl}/customer/getById/${id}`);
    }

    getByEmail(email: string): Observable<Customer> {
        return this.http.get<Customer>(`${environment.apiUrl}/customer/getByEmail/${email}`);
    }

    login(email: string, idDevice: string): Observable<Customer> {
        if (idDevice) {
            return this.http.get<Customer>(`${environment.apiUrl}/customer/login/${email}/${idDevice}`);
        } else {
            return this.http.get<Customer>(`${environment.apiUrl}/customer/login/${email}`);
        }
    }

    create(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${environment.apiUrl}/customer/create`, {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            idDevice: customer.idDevice,
            imageUrl: customer.imageUrl
        });
    }

    async logInSqlDatabase(result, loggedWith: string, userInfo?: any) {
        const customer: Customer = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            imageUrl: '',
            idDevice: userInfo.idDevice,
            email: userInfo.email
        };
        const sqlUser = await this.create(customer).toPromise();
        localStorage.setItem('customer', JSON.stringify(sqlUser));
        return sqlUser;
    }

    async getFromSqlDatabase(result, loggedWith: string, userInfo?: any) {
        const sqlUser = await this.login(userInfo.email, userInfo.idDevice).toPromise();
        localStorage.setItem('customer', JSON.stringify(sqlUser));
        return sqlUser;
    }
}

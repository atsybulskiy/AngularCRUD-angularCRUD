import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Employee} from './employee.model';

@Injectable()
export class EmployeeService {
  selectedEmployee: Employee;
  public employeeList: Employee[];

  constructor(private http: Http) {
  }

  postEmployee(emp: Employee) {
    const body = JSON.stringify(emp);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post('http://localhost:9301/api/Employee', body, requestOptions).map(x => x.json());
  }

  putEmployee(id, emp) {
    const body = JSON.stringify(emp);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
    return this.http.put('http://localhost:9301/api/Employee/' + id,
      body,
      requestOptions).map(res => res.json());
  }

  getEmployeeList() {
    this.http.get('http://localhost:9301/api/Employee')
      .map((data: Response) => {
        return data.json() as Employee[];
      }).toPromise().then(x => {
      this.employeeList = x;
    });
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:9301/api/Employee/' + id).map(res => res.json());
  }
}
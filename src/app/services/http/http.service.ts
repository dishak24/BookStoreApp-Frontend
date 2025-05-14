import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService 
{

  constructor( private http: HttpClient) { }

  BASE_URL  = 'https://localhost:44301';


  getApi(endpoint: string, headers: HttpHeaders = new HttpHeaders())
  {
    return this.http.get(this.BASE_URL + endpoint, { headers });
  }
  
  postApi(endpoint: string, payload: any, headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }))
  {
    return this.http.post(this.BASE_URL + endpoint, payload, { headers });
  }

  putApi(endpoint: string, payload: any, headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }))
  {
    return this.http.put(this.BASE_URL + endpoint, payload, { headers });
  }

  deleteApi(endpoint: string, headers: HttpHeaders = new HttpHeaders()) 
  {
    return this.http.delete(this.BASE_URL + endpoint, { headers });
  }

}

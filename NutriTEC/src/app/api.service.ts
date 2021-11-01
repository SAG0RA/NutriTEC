import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http:HttpClient) { }

  public GET(url:string){
    return this.http.get(url);
  }

  public POST(url:string,body: any){
    return this.http.post(url,body)
  }

  public DELETE(url:string){
    return this.http.delete(url)
  }
}

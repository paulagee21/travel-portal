import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Tour {
  id: number,
  destination: string,
  description: string,
  start_date: string,
  end_date: string,
  mode: string,
  status: string,
  conveyance: string,
  hotel: number,
  ticket: number,
  airport_cab_home: number,
  airport_cab_destination: number,
  supporting_documents?: Array<any>,
  created_by: string,
  created_at: string,
  approved_by?: string,
  rejected_by?: string,
};

@Injectable({
  providedIn: 'root'
})
export class TourService {
  API_URL = `${environment.api_url}/tours`;
  headers;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.API_URL);
  }

  getById(id) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  submit(id, data) {
    //
  }

  create(data) {
    return this.http.post(this.API_URL, data);
  }

  update(id, data) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }
}

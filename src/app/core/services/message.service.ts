import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = '/messages';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  getMessage(id: string): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }

  markAsRead(id: string): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/${id}/read`, {});
  }
} 
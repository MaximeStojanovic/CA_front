import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JmsMessage } from '../../shared/models/jms-message.model';
import { Message } from '../../shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class JmsService {
  private apiUrl = '/jms';

  constructor(private http: HttpClient) {
    console.log('JmsService initialized');
  }

  sendMessage(message: JmsMessage): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, message);
  }

  receiveMessages(): Observable<Message[]> {
    const url = `${this.apiUrl}/receive`;
    console.log('Making request to:', url);
    return this.http.get<Message[]>(url).pipe(
      tap(response => console.log('JmsService response:', response)),
      catchError(error => {
        console.error('JmsService error:', error);
        return of([]);
      })
    );
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>('/messages');
  }
} 
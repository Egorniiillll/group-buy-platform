import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Participant } from '../../../shared/models/participant.model';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private readonly apiUrl = 'http://localhost:3000/participants';

  constructor(private http: HttpClient) {}

  getByOrderId(orderId: string): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl).pipe(
      map((participants) =>
        participants.filter((participant) => String(participant.orderId) === orderId),
      ),
    );
  }

  create(participant: Omit<Participant, 'id'>): Observable<Participant> {
    return this.http.post<Participant>(this.apiUrl, participant);
  }

  updateRating(participant: Participant, rating: number): Observable<Participant> {
    return this.http.patch<Participant>(`${this.apiUrl}/${participant.id}`, {
      rating,
    });
  }

  updatePaymentStatus(
    participant: Participant,
    paid: boolean,
  ): Observable<Participant> {
    return this.http.patch<Participant>(`${this.apiUrl}/${participant.id}`, {
      paid,
    });
  }
}

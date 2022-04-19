import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private router: Router, private _zone: NgZone) {
  }

  getVotes(): Observable<string> {
    return new Observable<string>(obs => {
      const es = new EventSource('/api/votes');
      es.addEventListener('message', (evt) => {
        console.log(evt.data);
        obs.next(evt.data);
      });
      return () => es.close();
    });
  }

  public saveVote(id: string): Observable<any> {
    return this.http.post('/api/vote/' + id, {});
  }

}

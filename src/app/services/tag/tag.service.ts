import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DbTag, Tag } from '../../models/tag.model';
import { ApiLoadError } from '../../models/errors.model';

@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(private http: HttpClient) {}

  fetchTags(url: string): Observable<Tag[]> {
    return this.http.get<DbTag[]>(url).pipe(
      catchError((error) => throwError(() => new ApiLoadError('Failed to load tags', error)))
    )
  }

  fetchTag(url: string): Observable<Tag> {
    return this.http.get<DbTag>(url).pipe(
      catchError((error) => throwError(() => new ApiLoadError('Failed to load tag', error)))
    );
  }
}

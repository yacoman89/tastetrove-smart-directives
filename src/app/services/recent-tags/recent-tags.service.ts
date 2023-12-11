import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

export class RecentTagsError extends Error {
  override readonly name = 'RecentTagsError';
  constructor(public override message: string, public originalError: Error) {
    super();
  }
}

export interface RecentTagsModel {
  tags: string[];
  addLink: string;
}

@Injectable({ providedIn: 'root' })
export class RecentTagsService {
  constructor(private http: HttpClient) {}

  fetchRecent(link: string): Observable<string[]> {
    return this.http.get<string[]>(link).pipe(
      catchError((error) => throwError(() => new RecentTagsError('Failed to fetch recent tags', error)))
    );
  }

  addTag(tagName: string, link: string): Observable<void> {
    return this.http.post<void>(link, { tagName }).pipe(
      catchError((error) => throwError(() => new RecentTagsError('Failed to fetch recent tags', error)))
    );
  }
}
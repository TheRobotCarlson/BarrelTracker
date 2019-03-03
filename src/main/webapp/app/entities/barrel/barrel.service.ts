import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBarrel } from 'app/shared/model/barrel.model';

type EntityResponseType = HttpResponse<IBarrel>;
type EntityArrayResponseType = HttpResponse<IBarrel[]>;

@Injectable({ providedIn: 'root' })
export class BarrelService {
    private resourceUrl = SERVER_API_URL + 'api/barrels';

    constructor(private http: HttpClient) {}

    create(barrel: IBarrel): Observable<EntityResponseType> {
        return this.http.post<IBarrel>(this.resourceUrl, barrel, { observe: 'response' });
    }

    update(barrel: IBarrel): Observable<EntityResponseType> {
        return this.http.put<IBarrel>(this.resourceUrl, barrel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBarrel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBarrel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

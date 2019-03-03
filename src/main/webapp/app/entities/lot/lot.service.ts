import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILot } from 'app/shared/model/lot.model';

type EntityResponseType = HttpResponse<ILot>;
type EntityArrayResponseType = HttpResponse<ILot[]>;

@Injectable({ providedIn: 'root' })
export class LotService {
    private resourceUrl = SERVER_API_URL + 'api/lots';

    constructor(private http: HttpClient) {}

    create(lot: ILot): Observable<EntityResponseType> {
        return this.http.post<ILot>(this.resourceUrl, lot, { observe: 'response' });
    }

    update(lot: ILot): Observable<EntityResponseType> {
        return this.http.put<ILot>(this.resourceUrl, lot, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

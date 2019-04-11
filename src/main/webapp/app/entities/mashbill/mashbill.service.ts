import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMashbill } from 'app/shared/model/mashbill.model';

type EntityResponseType = HttpResponse<IMashbill>;
type EntityArrayResponseType = HttpResponse<IMashbill[]>;

@Injectable({ providedIn: 'root' })
export class MashbillService {
    private resourceUrl = SERVER_API_URL + 'api/mashbills';

    constructor(private http: HttpClient) {}

    create(mashbill: IMashbill): Observable<EntityResponseType> {
        return this.http.post<IMashbill>(this.resourceUrl, mashbill, { observe: 'response' });
    }

    update(mashbill: IMashbill): Observable<EntityResponseType> {
        return this.http.put<IMashbill>(this.resourceUrl, mashbill, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMashbill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMashbill[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    queryByName(name: string): Observable<IMashbill> {
        return this.http.get<IMashbill>(`${this.resourceUrl}/mashbills/byName/${name}`);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

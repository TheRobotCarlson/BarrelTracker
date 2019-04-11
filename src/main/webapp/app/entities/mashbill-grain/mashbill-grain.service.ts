import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';

type EntityResponseType = HttpResponse<IMashbillGrain>;
type EntityArrayResponseType = HttpResponse<IMashbillGrain[]>;

@Injectable({ providedIn: 'root' })
export class MashbillGrainService {
    private resourceUrl = SERVER_API_URL + 'api/mashbill-grains';

    constructor(private http: HttpClient) {}

    create(mashbillGrain: IMashbillGrain): Observable<EntityResponseType> {
        console.log(mashbillGrain.grain.grainName);
        console.log(mashbillGrain.grain.id);
        console.log(mashbillGrain.id);
        console.log(mashbillGrain.quantity);
        console.log(mashbillGrain.mashbill.id);
        return this.http.post<IMashbillGrain>(this.resourceUrl, mashbillGrain, { observe: 'response' });
    }

    update(mashbillGrain: IMashbillGrain): Observable<EntityResponseType> {
        return this.http.put<IMashbillGrain>(this.resourceUrl, mashbillGrain, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMashbillGrain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    queryByOwner(ownerId: number): Observable<IMashbillGrain[]> {
        return this.http.get<IMashbillGrain[]>(`${this.resourceUrl}/mashbills/${ownerId}`);
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMashbillGrain[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

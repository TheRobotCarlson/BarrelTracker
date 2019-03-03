import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBatch } from 'app/shared/model/batch.model';

type EntityResponseType = HttpResponse<IBatch>;
type EntityArrayResponseType = HttpResponse<IBatch[]>;

@Injectable({ providedIn: 'root' })
export class BatchService {
    private resourceUrl = SERVER_API_URL + 'api/batches';

    constructor(private http: HttpClient) {}

    create(batch: IBatch): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(batch);
        return this.http
            .post<IBatch>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(batch: IBatch): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(batch);
        return this.http
            .put<IBatch>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBatch>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBatch[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(batch: IBatch): IBatch {
        const copy: IBatch = Object.assign({}, batch, {
            date: batch.date != null && batch.date.isValid() ? batch.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((batch: IBatch) => {
            batch.date = batch.date != null ? moment(batch.date) : null;
        });
        return res;
    }
}

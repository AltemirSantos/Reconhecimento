import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from 'src/models/Candidate';

@Injectable()
export class DateManagement {

    baseUrl = '';
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    public getData(): Observable<Candidate[]> {

        return this.http.get<Candidate[]>(this.baseUrl + 'candidate');
        /*
        this.data = [
            { name: "Altemir Urias"},
            { name: "Augusto Matos"},
            { name: "Bruna Lopes"},
            { name: "Carlos Paiva"},
            { name: "Carlos Renato"},
            { name: "Daniel Avanzi"},
            { name: "Evandro Gomes"},
            { name: "Giann Bueno"},
            { name: "Jean Ribeiro"},
            { name: "Joel Restorf"},
            { name: "Juliana Souza"},
            { name: "Julio Znalizione"},
            { name: "Kalebe Alcantra"},      
            { name: "Luana  Piva"},
            { name: "Mayara"},
            { name: "Marconi Pacheco"},
            { name: "Matheus Macarini"},
            { name: "Mauricio Hernaski"},
            { name: "Valdecir Belin"},
            { name: "Victor Teixeira"},
         ]
        return this.data;*/
    }

    public add(name: string): Observable<Candidate[]> {
       const item =  { name: name };
       return this.http.post<Candidate[]>(this.baseUrl + 'candidate', JSON.stringify(item), this.httpOptions);
    }

    public remove(item: Candidate) : Observable<Candidate[]> {
       return this.http.get<Candidate[]>(this.baseUrl + 'candidate/' + item.id);
    }
}
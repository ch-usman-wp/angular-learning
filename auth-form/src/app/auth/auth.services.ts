import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    kind: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new Subject<User>();


    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq12s7-vq32DVbkpF3lXyQUN8BrsoRewA',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                
            }));
    }
    login(email: string, password: string){
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCq12s7-vq32DVbkpF3lXyQUN8BrsoRewA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError));
        }

        private handleAuthentication(email: string, userId:string, token: string, expiresIn: number ){
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new User(
                email, 
                userId, 
                token,
                expirationDate
                );
                this.user.next(user);   
        }



        private handleError(errorRes: HttpErrorResponse){
            let errorMessage = 'An unknown error occurred';

            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                        debugger
                        errorMessage = 'This email already exists';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This Email Does not exist';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'Inavlid Password';
                        break;
                }
                return throwError(errorMessage);
            }

        }
        


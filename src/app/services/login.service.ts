import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private data: { email: string, valid: boolean } = {
    email: "",
    valid: false
  }

  public set email(email: string) {
    this.data.email = email;
  }

  public set valid(isValid: boolean) {
    this.data.valid = isValid;
  }

  public get user() {
    return this.data;
  }
}

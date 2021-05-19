import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  appUser$: Observable<boolean> = this.auth.appUser$.pipe(map((x) => !!x));

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}

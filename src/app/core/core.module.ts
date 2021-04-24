import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsNavbarComponent } from '@core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from '@core/components/home/home.component';
import { LoginComponent } from '@core/components/login/login.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [BsNavbarComponent, HomeComponent, LoginComponent],
  imports: [SharedModule, RouterModule.forChild([])],
  exports: [BsNavbarComponent],
})
export class CoreModule {}

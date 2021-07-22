import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';
import { HeaderComponent } from './root-components/header/header.component';
import { FooterComponent } from './root-components/footer/footer.component';
import { ContactUsComponent } from './root-components/contact-us/contact-us.component';
import { AboutComponent } from './root-components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ContactUsComponent, AboutComponent],
  imports: [BrowserModule,AppRoutingModule,AdminModule,UsersModule,FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

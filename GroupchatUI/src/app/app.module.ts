import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarGroupComponent } from './components/sidebar-group/sidebar-group.component';
import { MessageHolderComponent } from './components/messageholder/messageholder.component';
import { SingleMessageComponent } from './components/singlemessage/singlemessage.component';
import { MessageboxComponent } from './components/messagebox/messagebox.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginboxComponent } from './components/loginbox/loginbox.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { GroupModalComponent } from './components/group-modal/group-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarGroupComponent,
    MessageHolderComponent,
    SingleMessageComponent,
    MessageboxComponent,
    IndexComponent,
    AuthComponent,
    LoginboxComponent,
    SettingsModalComponent,
    GroupModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

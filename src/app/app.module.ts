import { SongsModalPageModule } from './songs-modal/songs-modal.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NotimagePipe } from './pipes/notimage.pipe';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent, NotimagePipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SongsModalPageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfiJ7neOdTfNbxMAxJX4VeyEmq2wv2HNM'
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { NgaModule } from './theme/nga.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { Pages } from './pages/pages.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { ENV_PROVIDERS } from './environment';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  imports: [BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AboutModule,
    HomeModule,
    SharedModule.forRoot(),
    PagesModule,
    NgaModule.forRoot()],
  declarations: [AppComponent, Pages],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },   ENV_PROVIDERS,
    APP_PROVIDERS],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

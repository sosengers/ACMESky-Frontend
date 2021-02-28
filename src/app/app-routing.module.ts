import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyOfferRoute } from './routes/buy-offer/buy-offer.component';
import { HomeRoute } from './routes/home/home.component';
import { RegisterInterestRoute } from './routes/register-interest/register-interest.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeRoute
  },
  {
    path: 'register-interest',
    component: RegisterInterestRoute
  },
  {
    path: 'buy-offer',
    component: BuyOfferRoute
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

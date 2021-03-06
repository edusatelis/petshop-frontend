import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/pages/home', pathMatch: 'full'},
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module')
        .then(a => a.PagesModule)
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

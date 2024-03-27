import { NotfoundComponent } from './Global Componnent/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/course/course.module').then((m) => m.CourseModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/places/places.module').then((m) => m.PlacesModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

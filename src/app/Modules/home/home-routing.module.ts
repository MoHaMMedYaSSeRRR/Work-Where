import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
{path: '', redirectTo: '/home' , pathMatch:'full'},
{path: 'home', component: HomeComponent },
{path: 'aboutus',component: AboutusComponent},
{path:'contactus' , component:ContactusComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

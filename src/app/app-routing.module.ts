import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { GameComponent } from './pages/game/game.component';
import { GamesComponent } from './pages/games/games.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:"games"},
  {path:'',component:LayoutComponent,children:[
    {path:'games',component:GamesComponent},
  ]},
  {path:'game/:appName',component:GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

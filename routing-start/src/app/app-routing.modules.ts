import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router";

import { UserComponent } from "./users/user/user.component";
import { HomeComponent } from "./home/home.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.services";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UserComponent, children: [
        {path: ':id/:name', component: UserComponent}]},

    {path: 'users/:id/:name', component: UserComponent},
    {path: 'servers', component: ServerComponent},
    {path: 'servers', canActivate: [AuthGuard] ,component: ServersComponent},
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
    ];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}
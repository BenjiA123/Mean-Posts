import { PostListComponent } from './posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';

const appRoutes: Routes = [
  { path: "", component: PostListComponent },
  { path: "create", component: PostCreateComponent },
  { path: "edit/:postId", component: PostCreateComponent },
  { path: "**", redirectTo: "/register", pathMatch: "full" }
];


@NgModule({

  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { FormUserPostComponent } from './form-user-post/form-user-post.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
} from '@angular/material';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PostsComponent,
    PostComponent,
    FormUserPostComponent,
    ConfirmModalComponent,
  ],
  exports: [
    PostsComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    FormUserPostComponent
  ]
})
export class PostsModule { }

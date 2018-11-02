import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Post } from '../shared/model/post.model';
import { HandlerErrorService } from '../shared/services/handler-error.service';

@Component({
  selector: 'app-form-user-post',
  templateUrl: './form-user-post.component.html',
  styleUrls: ['./form-user-post.component.scss']
})
export class FormUserPostComponent implements OnInit {
  public formPost: FormGroup;
  public isEditMode = false;
  constructor(private fb: FormBuilder,
              private handlerError: HandlerErrorService,
              public dialogRef: MatDialogRef<FormUserPostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.handlerMode();
    this.createForm();
    this.handlerPatchForm();
  }

  public createForm() {
    this.formPost = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
      body: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
  }

  public handlerPatchForm() {
    if (this.isEditMode) {
      this.patchForm();
    }
  }

  public patchForm() {
    this.formPost.patchValue({
      ...this.data.post
    });
  }

  handlerMode() {
    this.isEditMode = this.data;
  }

  onSubmit() {
    if (this.formPost.invalid) {
      return;
    }
    this.isEditMode ? this.updatePost() : this.addNewPost();
  }

  updatePost() {
    const post = {
      ...this.data.post,
      ...this.formPost.value
    };
    this.dialogRef.close(post);
  }

  addNewPost() {
    const post: Post = {
      ...this.formPost.value,
      userId: 1
    };
    this.dialogRef.close(post);
  }

  public getErrorMessage(control: FormControl) {
    return this.handlerError.getError(control);
  }
}

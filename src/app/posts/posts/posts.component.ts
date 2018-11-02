import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataPostService } from '../shared/services/data-post.service';
import { Post } from '../shared/model/post.model';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { filter, mergeMap, switchMap, takeWhile } from 'rxjs/internal/operators';
import { FormUserPostComponent } from '../form-user-post/form-user-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: Post[];
  private componentActive = true;
  constructor(private postService: DataPostService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  getPosts(): void {
    this.postService.getAllPosts()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  openConfirmModal(post: Post): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '320px',
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.componentActive),
        filter(v => v),
        switchMap(() => this.postService.deletePost(post.id))
      )
      .subscribe(result => {
        this.posts = this.postService.filterPosts(this.posts, post);
    });
  }

  addPost(): void {
    const dialogRef = this.dialog.open(FormUserPostComponent, {
      minWidth: '320px',
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.componentActive),
        filter(post => post),
        mergeMap((post: Post) => {
          return this.postService.addNewPost(post);
        })
      )
      .subscribe((post: Post) => {
        this.posts = this.postService.pushNewPost(this.posts, post);
      });
  }

  editPost(currentPost: Post): void {
    const dialogRef = this.dialog.open(FormUserPostComponent, {
      minWidth: '320px',
      data: {
        post: currentPost
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.componentActive),
        filter(data => data),
        mergeMap((post: Post) => {
          return this.postService.updatePost(post);
        })
      )
      .subscribe((post: Post) => {
        this.posts = this.postService.updateCurrentPost(this.posts, post);
      });
  }

}

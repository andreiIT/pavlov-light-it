import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../shared/model/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() deletePost = new EventEmitter<Post>();
  @Output() editPost = new EventEmitter<Post>();
  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editPost.emit(this.post);
  }

  onDelete(): void {
    this.deletePost.emit(this.post);
  }

}

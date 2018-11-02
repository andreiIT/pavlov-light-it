import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Post } from '../model/post.model';
import { ConfigService } from '../../../core/config.service';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class DataPostService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
     return this.http.get(ConfigService.postsPath)
        .pipe(
          map((posts: any) => {
            return posts.map(post => new Post(post));
          })
        );
  }

  deletePost(id: number): Observable<any> {
    return  this.http.delete(`${ConfigService.postsPath}${id}`);
  }

  updatePost(data) {
    return this.http.patch(`${ConfigService.postsPath}${data.id}`, data)
      .pipe(
        map(post =>  new Post(post))
      );
  }

  addNewPost(data) {
    return this.http.post(`${ConfigService.postsPath}`, data)
      .pipe(
        map(post =>  new Post(post))
      );
  }

  updateCurrentPost(posts: Post[], post: Post) {
    return posts.map(item => {
      return (item.id !== post.id) ? item : post;
    });
  }

  pushNewPost(posts: Post[], post: Post) {
    return [...posts, post];
  }

  filterPosts(posts: Post[], post: Post) {
    return posts.filter(item => item.id !== post.id);
  }
}

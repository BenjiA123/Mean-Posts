import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnDestroy, OnInit {
  posts: Post[] = []
  constructor(public postService: PostService) {
  }
  postsSub: Subscription
  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts
    });
  }

  
  onDelete(postId:String){
    this.postService.deletePost(postId)
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();

  }
}

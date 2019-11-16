import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postService: PostService, public route: ActivatedRoute) { }
  enteredTitle = '';
  enteredContent = '';

  post: Post
  public mode = "create"
  private postId: string
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content)
      form.resetForm()
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
      form.resetForm()
    }


  }
  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit'
          this.postId = paramMap.get('postId')
          this.postService.getPost(this.postId)
            .subscribe(postData => {
              this.post = { _id: postData._id, title: postData.title, content: postData.content }
            })
        } else {
          this.mode = 'create'
          this.postId = null
        }
      }
    )
  }

}

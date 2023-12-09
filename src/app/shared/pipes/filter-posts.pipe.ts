import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../models/post';

@Pipe({
  name: 'filterPosts'
})
export class FilterPostsPipe implements PipeTransform {

  transform(posts: IPost[], search: string): IPost[] {
    if (search.length === 0) return posts;
    return posts.filter(p => p.body.toLowerCase().includes(search.toLowerCase()));
  }

}

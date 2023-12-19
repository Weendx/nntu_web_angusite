import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../models';

@Pipe({
  name: 'filterPosts'
})
export class FilterPostsPipe implements PipeTransform {

  transform(posts: IPost[], search: string): IPost[] {
    if (search.length === 0) return posts;
    return posts.filter(p => 
      p.body.toLowerCase().includes(search.toLowerCase()) 
      || p.title.toLowerCase().includes(search.toLowerCase())
      || p.bodyPreview.toLowerCase().includes(search.toLowerCase())
    );
  }

}

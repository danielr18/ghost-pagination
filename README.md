# Ghost - Handlebars Pagination Helper
Custom Handlebars Helper to improve Pagination in Ghost. Based on [Handlebars Paginate](https://github.com/olalonde/handlebars-paginate).

![preview](https://github.com/danielr18/ghost-pagination/raw/master/preview.jpg)

##Install
```
npm install ghost-pagination
```
##Usage
Ghost config.js
```javascript
  /* ... */  
  var pagination = require('ghost-pagination');
  var hbs = require('express-hbs');
  /* ... */
  hbs.registerHelper('paginate', pagination);
  /* ... */  
```

partials/pagination.hbs

```html
<div class="pagination center">
  <ul>      
      {{#paginate page pages limit="5"}}
          {{#if first}}
              <li {{#if active}} class="active" {{/if}}><a href="{{page_url n}}">{{n}}</a></li>
              {{#if ellipsis}}
                  <li class="pagination-ellipsis"><i class="material-icons">more_horiz</i></li>
              {{/if}}
          {{/if}}
          {{#if middle}}
              <li {{#if active}} class="active" {{/if}}><a href="{{page_url n}}">{{n}}</a></li>
          {{/if}}
          {{#if last}}
              {{#if ellipsis}}
                  <li class="pagination-ellipsis"><i class="material-icons">more_horiz</i></li>
              {{/if}}
              <li {{#if active}} class="active" {{/if}}><a href="{{page_url n}}">{{n}}</a></li>
          {{/if}}
      {{/paginate}}
  </ul>
</div>
```

Include limit attribute if you wish to restrict the number of pages, that appear between the first one and last one.

You can easily include previous and next links with Ghost built-in Pagination attributes. Refer to [Handlebars Template Example](examples/pagination.hbs).

## License

MIT License

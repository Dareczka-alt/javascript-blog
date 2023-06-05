
'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  const span = ('span');
  sourceCapabilities: InputDeviceCapabilities;
  srcElement: span;
  target: span;
  timeStamp: 15021.600000143051;
  toElement: span;
  type: "click";

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /*add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');


}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = '') {
  console.log('done');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('optArticleSelector + customSelector:', optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeEnd', linkHTML);
    console.log(titleList);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;

}
function calculateTagClass(count, params = { max: '0', min: '999999' }) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return (optCloudClassPrefix + classNumber);

}
calculateTagClass();


function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log('allTags:', allTags);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTag:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('linkHTML:', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html:', html);
      /* check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('beforeEnd', html);
    console.log('tagWrapper:');
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log('tagList:', tagList);

  /*create variable for all links HTML code*/
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  /*START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /*generate code of link and add it into allTagsHTML*/
    allTagsHTML += '<li><a href="#' + tag + '"  class="' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + tag + '</span></a></li>';
    console.log('allTagsHTML:', allTagsHTML);
    /* END LOOP: for each tag in allTags: */
  }
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const span = ('span');
  const clickedElement = this;
  sourceCapabilities: InputDeviceCapabilities;
  srcElement: span;
  target: span;
  timeStamp: 13399.200000047684;
  toElement: span;
  type: "click";
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  console.log('clickedElement:', clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag:', tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    console.log(activeTag);
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks:', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    console.log('tagLink:', tagLink);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor:', articleAuthor);
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
    console.log('linkHTML:');

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log('html:', html);
    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('beforeEnd', linkHTML);
    console.log('authorWrapper:');
  }

}

generateAuthors();


function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const span = ('span');
  const clickedElement = this;
  sourceCapabilities: InputDeviceCapabilities;
  target: span;
  timeStamp: 4363.299999952316;
  toElement: span;
  type: "click";
  console.log('clickedElement:', clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author:', author);
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthors);
  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
    console.log(activeAuthor);
    /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks:', authorLinks);
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    console.log('authorLink:', authorLink);
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');


}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();














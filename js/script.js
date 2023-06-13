
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

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
  clickedElement.classList.add('active');

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');


}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = ' .tags',
  optCloudClassCount = '4',
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = ' .authors';


function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('customSelector:', customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;


    /* create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);



    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeEnd', linkHTML);
    console.log('titleList:', titleList);

    /* insert link into html variable */
    html = html + linkHTML;

  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' };
  for (let tag in tags) {
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
  /* create a new variable allTags with an empty object */
  let allTags = {};
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

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTMLData = { id: 'tag-' + tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);


      /* add generated code to html variable */
      html = html + linkHTML;

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

    /* END LOOP: for every article: */
  }
  /* find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /*create variable for all links HTML code*/
  const tagsParams = calculateTagsParams(allTags);

  const allTagsData = { tags: [] };
  /*START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /*generate code of link and add it into allTagsHTML*/
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    /* END LOOP: for each tag in allTags: */
  }
  /* add html from allTags to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href:', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');

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

function addClickListenersToCloudTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToCloudTags();


function calculateAuthorParams(articleAuthors) {
  const params = { max: '0', min: '999999' };
  for (let articleAuthor in articleAuthors) {

    if (articleAuthors[articleAuthor] > params.max) {
      params.max = articleAuthors[articleAuthor];
    }
    if (articleAuthors[articleAuthor] < params.min) {
      params.min = articleAuthors[articleAuthor];
    }
  }
  return params;

}
function calculateAuthorClass(count, params = { max: '0', min: '999999' }) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return (optCloudClassPrefix + classNumber);

}
calculateTagClass();

function generateAuthors() {
  /*create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);


    /* add generated code to html variable */
    html = html + linkHTML;

    /* check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* add generated code to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* insert HTML of all the links into the authors wrapper */
    authorWrapper.insertAdjacentHTML('beforeEnd', linkHTML);

  }
  const authorList = document.querySelector(optAuthorListSelector);


  /*create variable for all links HTML code*/
  const authorParams = calculateAuthorParams(allAuthors);

  const allAuthorsData = { articleAuthors: [] };

  for (let articleAuthor in allAuthors) {
    /*generate code of link and add it into allAuthorsHTML*/
    allAuthorsData.articleAuthors.push({
      articleAuthor: articleAuthor,
      className: calculateAuthorClass(allAuthors[articleAuthor], authorParams)
    });

    /* END LOOP: for each tag in allTags: */
  }

  /* add html from allAuthors to authorList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);


}

generateAuthors();


function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */


  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');

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

function addClickListenersToCloudAuthors() {
  const authorLinks = document.querySelectorAll('.authors a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToCloudAuthors();









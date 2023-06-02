
'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');


  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post a.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

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
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  console.log('done');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);

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
}
generateTitleLinks();




const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}



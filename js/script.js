var projectsControl = document.querySelector('.nav-list__link_projects');
var projectsContent = document.querySelector('.nav-content_projects');

projectsControl.addEventListener('click', function (evt) {
  evt.preventDefault();
  projectsContent.classList.toggle('nav-content_projects-active');
});

projectsControl.addEventListener('blur', function () {
  setTimeout(function () {
   projectsContent.classList.remove('nav-content_projects-active')}, 160);
});

// The menu itself is pure CSS (a checkbox). The only thing CSS cannot do is close
// the overlay after a link inside it is followed, so do that here.
document.querySelectorAll('.navigation__link').forEach(function (link) {
    link.addEventListener('click', function () {
        document.getElementById('navi-toggle').checked = false;
    });
});

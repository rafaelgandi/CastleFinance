
function routeTo(pageId, data = null) {
    document.querySelectorAll('.page').forEach((page) => {
        page.classList.add('page--hide');
    });
    const $page = byId(pageId);

    if (pageId === 'front-page') {
        document.body.style.backgroundColor = 'var(--body-bg-color)';
    }
    else {
        document.body.style.backgroundColor = '#000';
    }

    //console.log($page.children[0].tagName);
    window.scrollTo(0, 0);
    triggerEvent($page.children[0], 'onPageShow', data);
    $page.classList.remove('page--hide');
}
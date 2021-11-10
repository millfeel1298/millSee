(() => {

  // lnb tab
  document.querySelector('.bl_lnb_list').addEventListener('click', function (e) {
    const target = e.target;
    const children = this.children;

    if (!target.parentElement.classList.contains('is_active')) { // 클릭한 요소에 is_active가 없는 경우
      for (let i = 0; i < children.length; i++) { // 클릭시 모든 is_active 삭제
        children[i].classList.remove('is_active');
        if (children[i].firstElementChild.classList.contains('bl_lnb_link__icoR_arr')) { //depth가 있는 경우 style 설정
          children[i].lastElementChild.style.height = 0;
          children[i].lastElementChild.style.padding = 0;
          children[i].lastElementChild.style.display = 'none';
        }
      }

      if (target.classList.contains('bl_lnb_link')) {
        target.parentElement.classList.add('is_active');

        if (target.classList.contains('bl_lnb_link__icoR_arr')) { //depth가 있는 경우 style 설정
          target.nextElementSibling.style.display = 'block';
          target.nextElementSibling.style.height = 'auto';
          target.nextElementSibling.style.padding = '1.2rem 0';
        }
      }

    } else { // 클릭한 요소에 is_active가 있는 경우
      target.parentElement.classList.remove('is_active');
      if (target.classList.contains('bl_lnb_link__icoR_arr')) { //depth가 있는 경우 
        target.nextElementSibling.style.height = 0;
        target.nextElementSibling.style.padding = 0;
        target.nextElementSibling.style.display = 'none';
      }
    }
  })
})();
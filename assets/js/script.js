const edit_schedule = document.querySelector('#edit-schedule');
edit_schedule.addEventListener('click', function () {
  const modal = document.querySelector('#modal');
  modal.classList.remove('modal-hidden');
  modal.classList.add('modal-visible');
});

const close_modal = document.querySelector('#modal-close');
close_modal.addEventListener('click', function () {
  const modal = document.querySelector('#modal');
  modal.classList.remove('modal-visible');
  modal.classList.add('modal-hidden');
});




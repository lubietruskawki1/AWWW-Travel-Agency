const form = document.getElementsByClassName('form_user')[0];

const modal = document.getElementsByClassName('modal')[0];

function showModal() {
  modal.style.display = 'block';

  setTimeout(() => {
    modal.style.display = 'none';
  }, 15000);

  const labels = form.getElementsByClassName('label_name');
  const inputs = form.getElementsByTagName('input');
  let modal_elements_content = '';
  for (let i = 0; i < inputs.length; i += 1) {
    const label = labels[i].innerHTML;
    let { value } = inputs[i];
    if (inputs[i].value === '') {
      value = '-';
    }
    modal_elements_content += '<div class="modal_element">';
    modal_elements_content += '<div class="modal_label">';
    modal_elements_content += label;
    modal_elements_content += '</div><div class="modal_input">';
    modal_elements_content += value;
    modal_elements_content += '</div></div>';
  }

  const modal_elements = document.getElementsByClassName('modal_elements')[0];
  modal_elements.innerHTML = modal_elements_content;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  showModal();
});

const modal_submit = document.getElementsByClassName('modal_submit')[0];

modal_submit.addEventListener('click', () => {
  form.submit();
});

const close = document.getElementsByClassName('close')[0];

close.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

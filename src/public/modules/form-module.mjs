const form = document.getElementsByClassName('form_user')[0];

const first_name = document.getElementById('first_name');
const firstNameError = document.querySelector('#first_name + span.error');

const surname = document.getElementById('surname');
const surnameError = document.querySelector('#surname + span.error');

const date_of_birth = document.getElementById('date_of_birth');
const dateOfBirthError = document.querySelector('#date_of_birth + span.error');

const postal_code = document.getElementById('postal_code');
const postalCodeError = document.querySelector('#postal_code + span.error');

const phone = document.getElementById('phone');
const phoneError = document.querySelector('#phone + span.error');

const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

function get_age(date_of_birth_parameter) {
  const birthday = new Date(date_of_birth_parameter.value);
  const year_in_ms = 24 * 60 * 60 * 365.25 * 1000;
  const age = ((Date.now() - birthday) / year_in_ms);
  return age;
}

function showError() {
  firstNameError.className = 'error active';
  if (first_name.validity.valueMissing) {
    firstNameError.textContent = 'Pole jest wymagane.';
  } else if (first_name.value.length > 40) {
    firstNameError.textContent = `Imię nie może być dłuższe niż 40 znaków; wpisano ${first_name.value.length}.`;
  } else {
    firstNameError.className = 'error';
  }

  surnameError.className = 'error active';
  if (surname.validity.valueMissing) {
    surnameError.textContent = 'Pole jest wymagane.';
  } else if (surname.value.length > 40) {
    surnameError.textContent = `Nazwisko nie może być dłuższe niż 40 znaków; wpisano ${surname.value.length}.`;
  } else {
    surnameError.className = 'error';
  }

  dateOfBirthError.className = 'error active';
  const age = get_age(date_of_birth);
  if (date_of_birth.validity.valueMissing) {
    dateOfBirthError.textContent = 'Pole jest wymagane.';
  } else if (age < 18) {
    dateOfBirthError.textContent = 'Rezerwacji mogą dokonać tylko osoby pełnoletnie.';
  } else {
    dateOfBirthError.className = 'error';
  }

  postalCodeError.className = 'error active';
  if (postal_code.validity.patternMismatch) {
    postalCodeError.textContent = 'Wpisana wartość musi być poprawnym kodem pocztowym w formacie 12-345.';
  } else {
    postalCodeError.className = 'error';
  }

  phoneError.className = 'error active';
  if (phone.validity.valueMissing) {
    phoneError.textContent = 'Pole jest wymagane.';
  } else if (phone.validity.patternMismatch) {
    phoneError.textContent = 'Wpisana wartość musi być poprawnym numerem telefonu w formacie 123-456-789 lub 123456789.';
  } else {
    phoneError.className = 'error';
  }

  emailError.className = 'error active';
  if (email.validity.valueMissing) {
    emailError.textContent = 'Pole jest wymagane.';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Wpisana wartość musi być poprawnym adresem e-mail.';
  } else {
    emailError.className = 'error';
  }
}

first_name.addEventListener('input', () => {
  if (first_name.validity.valid && first_name.value.length <= 40) {
    firstNameError.innerHTML = '';
    firstNameError.className = 'error';
  } else {
    showError();
  }
});

surname.addEventListener('input', () => {
  if (surname.validity.valid && surname.value.length <= 40) {
    surnameError.innerHTML = '';
    surnameError.className = 'error';
  } else {
    showError();
  }
});

date_of_birth.addEventListener('input', () => {
  const age = get_age(date_of_birth);
  if (date_of_birth.validity.valid && age >= 18) {
    dateOfBirthError.innerHTML = '';
    dateOfBirthError.className = 'error';
  } else {
    showError();
  }
});

postal_code.addEventListener('input', () => {
  if (postal_code.validity.valid) {
    postalCodeError.innerHTML = '';
    postalCodeError.className = 'error';
  } else {
    showError();
  }
});

phone.addEventListener('input', () => {
  if (phone.validity.valid) {
    phoneError.innerHTML = '';
    phoneError.className = 'error';
  } else {
    showError();
  }
});

email.addEventListener('input', () => {
  if (email.validity.valid) {
    emailError.innerHTML = '';
    emailError.className = 'error';
  } else {
    showError();
  }
});

form.querySelectorAll('input').forEach((item) => {
  item.addEventListener('focus', () => {
    const item_reference = item;
    item_reference.style.borderColor = 'blueviolet';
  });
});

form.querySelectorAll('input').forEach((item) => {
  item.addEventListener('blur', () => {
    if (item.validity.valid) {
      const item_reference = item;
      item_reference.style.borderColor = 'black';
    } else {
      const item_reference = item;
      item_reference.style.borderColor = '#E43E3E';
    }
  });
});

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
    if (inputs[i].type === 'date') {
      const date = new Date(inputs[i].value);

      let yyyy = date.getFullYear();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();

      dd = String(dd).padStart(2, '0');
      mm = String(mm).padStart(2, '0');
      yyyy = String(yyyy).padStart(4, '0');

      value = `${dd}-${mm}-${yyyy}`;
    }
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

  const registrations_value = document.getElementsByClassName('registrations_value')[0];
  modal_elements_content += '<div class="modal_element">';
  modal_elements_content += '<div class="modal_label">';
  modal_elements_content += 'Liczba zgłoszeń:';
  modal_elements_content += '</div><div class="modal_input">';
  modal_elements_content += registrations_value.textContent;
  modal_elements_content += '</div></div>';

  const modal_elements = document.getElementsByClassName('modal_elements')[0];
  modal_elements.innerHTML = modal_elements_content;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const age = get_age(date_of_birth);
  const registrations_value = document.getElementsByClassName('registrations_value')[0];
  if (!first_name.validity.valid || !surname.validity.valid
        || !date_of_birth.validity.valid || !postal_code.validity.valid
        || !phone.validity.valid || !email.validity.valid
        || first_name.value.length > 40 || surname.value.length > 40
        || age < 18 || registrations_value.textContent == 0) {
    showError();
  } else {
    showModal();
  }
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

const prices = {
  adult: 0,
  student: 0,
  child: 0,
};

const tickets = ['adult', 'student', 'child'];

tickets.forEach((ticket) => {
  const id_name = `${ticket}_price`;
  const price = document.getElementById(id_name);
  prices[ticket] = price.textContent;
});

const form_trip = document.getElementsByClassName('form_trip')[0];

form_trip.addEventListener('submit', (event) => {
  event.preventDefault();
  const trip_type = document.querySelector('input[name="trip"]:checked');
  const amount = document.getElementById('amount');
  if (trip_type.validity.valid && amount.validity.valid) {
    let new_row = '';
    new_row += '<tr><td>';
    new_row += document.getElementById(`${trip_type.value}_label`).textContent;
    new_row += '</td><td>';
    new_row += amount.value;
    new_row += '</td><td>';
    new_row += amount.value * prices[trip_type.value];
    new_row += '</td></tr>';

    const summary_table = document.getElementsByClassName('summary_table')[0];
    summary_table.innerHTML += new_row;

    const sum_value = document.getElementsByClassName('sum_value')[0];
    sum_value.textContent = parseInt(sum_value.textContent, 10)
                            + amount.value * prices[trip_type.value];

    const registrations_value = document.getElementsByClassName('registrations_value')[0];
    registrations_value.textContent = parseInt(registrations_value.textContent, 10)
                            + parseInt(amount.value, 10);

    trip_type.checked = false;
    amount.value = '';
  }
});

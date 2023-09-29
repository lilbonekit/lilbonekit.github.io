document.addEventListener('DOMContentLoaded', () => {
    const APIKEY = 'Creeper500 ';
    const login = prompt('Введите пароль');
    const container = document.querySelector('.container');
    let lastFocusedElement = 0;
    let focusableElements;
  
    if(login === APIKEY) {
  
      // Обработчик события для клика мышью
      container.addEventListener('click', (event) => {
        if (event.target.classList.contains('phone-number')) {
          copyToClipboard(event.target.innerText.trim());
          changeStyle(event);
          lastFocusedElement = +event.target.getAttribute('tabindex') - 2;
        }
      });
  
      // Обработчик события для нажатия пробела
      container.addEventListener('keydown', (event) => {
        if (event.key === ' ' && event.target.classList.contains('phone-number')) {
          event.preventDefault();
          copyToClipboard(event.target.innerText.trim());
        }
  
        changeStyle(event);
      });
  
      function changeStyle(event) {
        if (event.target.classList.contains('phone-number') && (event.type === "click" || event.key === ' ')) {
            const parent = event.target.closest('tr');
            parent.style.background = '#E7E7E7';
            event.target.style.background = 'grey';
        }
      }
  
      function copyToClipboard(text) {
        const dummyInput = document.createElement('input');
        dummyInput.style.position = 'fixed';
        dummyInput.style.opacity = 0;
        dummyInput.value = text;
        document.body.appendChild(dummyInput);
        dummyInput.select();
        document.execCommand('copy');
        document.body.removeChild(dummyInput);
      }
  
      const textArea = document.querySelector('#textarea');
      const generatetBtn = document.querySelector('#generate');
  
      function generateList() {
        function getArray() {
          const arrSplited = textArea.value.split('\n');
          const arrTrimmed = arrSplited.map(el => {
            return el = el.trim()
          })
          return arrTrimmed;
        }
  
        function generateTableMarkupFromArray(dataArray) {
          lastFocusedElement = -1;
          let tableMarkup = '<table>\n';
          tableMarkup += '<tr>\n  <th>Номер</th>\n  <th>Компания</th>\n  <th>Телефон</th>\n</tr>\n';
  
          dataArray.forEach(function (data, index) {
            const parts = data.split(' ');
            const company = parts.slice(0, -2).join(' ').trim();
            const phoneNumber = parts[parts.length - 1].replace(/[^\d]/g, '').trim().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  
            const rowMarkup = `<tr>\n  <td>${index + 1}</td>\n  <td>${company}</td>\n  <td><span class="phone-number" tabindex=${index + 1}>${phoneNumber}</span></td>\n</tr>\n`;
            tableMarkup += rowMarkup;
          });
  
          tableMarkup += '</table>';
  
          return tableMarkup;
        }
  
        const dataArray = getArray();
        const tableMarkup = generateTableMarkupFromArray(dataArray);
  
        // Очищаем содержимое элемента .container
        container.innerHTML = '';
  
        // Добавляем новую разметку таблицы в .container
        container.innerHTML = tableMarkup;
  
        focusableElements = Array.from(document.querySelectorAll('.phone-number')); // Присваиваем переменной значение здесь
      }
  
      generatetBtn.addEventListener('click', generateList);
  
      // Удаляем предыдущий обработчик события для клавиши "Tab"
      document.removeEventListener('keydown', handleTabKey);
  
      // Добавляем новый обработчик события для клавиши "Tab"
      document.addEventListener('keydown', handleTabKey);
  
      function handleTabKey(event) {
        if (event.key === 'Tab') {
          // Предотвращаем стандартное поведение Tab
          event.preventDefault();

  
          // Определяем следующий элемент для фокуса
          let nextIndex = lastFocusedElement + 1;
  
          // Если достигнут конец списка элементов, переходим к первому элементу
          if (nextIndex >= focusableElements.length) {
            nextIndex = 0;
          }
  
          // Устанавливаем фокус на следующем элементе
          focusableElements[nextIndex].focus();
          lastFocusedElement = nextIndex;
        }
      }
    }
  
    if (login !== APIKEY) {
      document.querySelector('#generate').addEventListener('click', () => {
        alert('хуй соси блять')
      })
    }
  });
  
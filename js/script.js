document.addEventListener('DOMContentLoaded', function() {
  const APIKEY = 'Creeper500 ';
  // const login = prompt('Введите пароль');
  let lastFocusedElement = -2;
  const container = document.querySelector('.container');


  /* if(login !== APIKEY) */ {


    // Обработчик события для клик    а мышью
    container.addEventListener('click', (event) => {
      if (event.target.classList.contains('phone-number')) {
        copyToClipboard(event.target.innerText.trim());
      }

      changeStyle(event)
      lastFocusedElement = +event.target.getAttribute('tabindex') - 3;
      console.log(lastFocusedElement)
    });

    // Обработчик события для нажатия пробела
    container.addEventListener('keydown', (event) => {
      if (event.key === ' ' && event.target.classList.contains('phone-number')) {
        event.preventDefault();
        copyToClipboard(event.target.innerText.trim());
      }

      changeStyle(event)
    });

    function changeStyle(event) {
      if(event.key === 'Tab') {
        return
      }
      const parent = event.target.closest('tr');
      parent.style.background = '#E7E7E7';
      event.target.style.background = 'grey'
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
        lastFocusedElement = -2;
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

      const focusableElements = Array.from(document.querySelectorAll('[tabindex]'));
        // Удаляем предыдущий обработчик события для клавиши "Tab"

      
  
      // Обработчик события для нажатия клавиши Tab
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          // Предотвращаем стандартное поведение Tab
          event.preventDefault();
  
          // Определяем текущий индекс активного элемента
          if(focusableElements.indexOf(document.activeElement) != -1) {
            lastFocusedElement = focusableElements.indexOf(document.activeElement);
          } else {
            lastFocusedElement++
          }
  
          // Определяем следующий элемент для фокуса
          let nextIndex = lastFocusedElement + 1;
  
          // Если достигнут конец списка элементов, переходим к первому элементу
          if (nextIndex >= focusableElements.length) {
            nextIndex = 0;
          }
  
          // Устанавливаем фокус на следующем элементе
          focusableElements[nextIndex].focus();
        }
      });
    }
    
    generatetBtn.addEventListener('click', generateList);
    
  }
  
  if(login !== APIKEY) {
    document.querySelector('#generate').addEventListener('click', () => {
      alert('хуй соси блять')
    })
  }
});

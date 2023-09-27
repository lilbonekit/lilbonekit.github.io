document.addEventListener('DOMContentLoaded', function() {

  const APIKEY = 'Creeper500 ';
  const login = prompt('Введите пароль');

  if(login === APIKEY) {
    console.log(login)

    document.querySelector('.container').addEventListener('click', (event) => {
      if (event.target.classList.contains('phone-number')) {
        var phoneNumber = event.target.innerText.trim();
        copyToClipboard(phoneNumber);
      }

      function copyToClipboard(text) {
        var dummyInput = document.createElement('input');
        dummyInput.style.position = 'fixed';
        dummyInput.style.opacity = 0;
        dummyInput.value = text;
        document.body.appendChild(dummyInput);
        dummyInput.select();
        document.execCommand('copy');
        document.body.removeChild(dummyInput);
      }
      
      if (event.target.classList.contains('phone-number')) {
          event.target.style.backgroundColor = 'rgb(119, 119, 119)';
          event.target.parentNode.parentNode.style.backgroundColor = 'rgb(230, 230, 230)';
      }

    })

    //Создание нормального массива
    const textArea = document.querySelector('#textarea');
    const generatetBtn = document.querySelector('#generate');
    const container = document.querySelector('.container');
    
    function generateList() {
      function getArray() {
        const arrSplited = textArea.value.split('\n');
        const arrTrimmed = arrSplited.map(el => {
            return el = el.trim()
        })

        console.log(arrTrimmed)

        return arrTrimmed
      }
    
      function generateTableMarkupFromArray(dataArray) {
        var tableMarkup = '<table>\n';
        tableMarkup += '<tr>\n  <th>Номер</th>\n  <th>Компания</th>\n  <th>Телефон</th>\n</tr>\n';
      
        dataArray.forEach(function (data, index) {
          var parts = data.split(' ');
          var company = parts.slice(0, -2).join(' ').trim();
          var phoneNumber = parts[parts.length - 1].trim();
      
          var rowMarkup = `<tr>\n  <td>${index + 1}</td>\n  <td>${company}</td>\n  <td><span class="phone-number">${phoneNumber}</span></td>\n</tr>\n`;
          tableMarkup += rowMarkup;
        });
      
        tableMarkup += '</table>';
      
        return tableMarkup;
      }
    
      const dataArray = getArray();
      const tableMarkup = generateTableMarkupFromArray(dataArray);

      console.log(dataArray)
    
      // Очищаем содержимое элемента .container
      container.innerHTML = '';
    
      // Добавляем новую разметку таблицы в .container
      container.innerHTML = tableMarkup;
    }
    
    generatetBtn.addEventListener('click', generateList);
  }
  
  if(login !== APIKEY) {
    document.querySelector('#generate').addEventListener('click', () => {
      alert('хуй соси блять')
    })
  }
});
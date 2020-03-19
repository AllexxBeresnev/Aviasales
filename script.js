const formSearch = document.querySelector(".form-search"),
    inputCitiesFrom = document.querySelector(".input__cities-from"),
    inputCitiesTo = document.querySelector(".input__cities-to"),
    dropdownCitiesFrom = document.querySelector(".dropdown__cities-from"),
    dropdownCitiesTo = document.querySelector(".dropdown__cities-to"),
    inputDateDepart = document.querySelector(".input__date-depart-to");

    const city = ['Москва','Санкт-Петербург','Екатеринбург','Самара','Челябинск','Минск','Барнаул','Новосибирск','Кемерово','Нижний Новгород','Пенза'];

    const getData = (url, callback) => {
        const request = new XMLHttpRequest;

        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;

            if (request.status === 200) {
//                console.log(request.response);
                callback(request.response);

            } else {
                console.error(request.status);
            }

        });


        request.send();
//        .then(response => response.json())
//        .then(json => console.log(json)));
    }


    const showCity = (input, list) => {
        list.textContent = '';

        if (input.value !== ''){
            const filterCity = city.filter((item) => {
                const fixItem = item.toLowerCase();
                return fixItem.includes(input.value.toLowerCase());
            });
            filterCity.forEach((item) => {
                const li = document.createElement('li');
                li.classList.add("dropdown__city");
                li.textContent = item;
                list.append(li);
    //          console.log(li);
            });      
        }
    };
  
    const selectCity = (event,input, list) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'li') {
            input.value = target.textContent;
            list.textContent = '';
//            console.log(target.textContent);
        }
    }
  
    inputCitiesFrom.addEventListener('input', () => {
        showCity(inputCitiesFrom,dropdownCitiesFrom); 
        }
    );

    inputCitiesTo.addEventListener('input', () => {
        showCity(inputCitiesTo,dropdownCitiesTo); 
        }
    );


    dropdownCitiesFrom.addEventListener('click',() => {
        selectCity(event,inputCitiesFrom,dropdownCitiesFrom);
    });

    dropdownCitiesTo.addEventListener('click',() => {
        selectCity(event,inputCitiesTo,dropdownCitiesTo);
    });

    // Вызовы функций
    getData();

 //   console.log(formSearch,inputCitiesFrom);
//    console.log(inputCitiesTo,dropdownCitiesFrom);
//    console.log(dropdownCitiesTo);
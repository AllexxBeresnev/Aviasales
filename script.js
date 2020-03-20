const formSearch = document.querySelector(".form-search"),
    inputCitiesFrom = document.querySelector(".input__cities-from"),
    inputCitiesTo = document.querySelector(".input__cities-to"),
    dropdownCitiesFrom = document.querySelector(".dropdown__cities-from"),
    dropdownCitiesTo = document.querySelector(".dropdown__cities-to"),
    inputDateDepart = document.querySelector(".input__date-depart");

    // Данные
    //const city = ['Москва','Санкт-Петербург','Екатеринбург','Самара','Челябинск','Минск','Барнаул','Новосибирск','Кемерово','Нижний Новгород','Пенза'];
    
    //const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
        const citiesApi = 'databases/cities.json',
        proxy = 'https://cors-anywhere.herokuapp.com/',
        API_KEY = "cf0691505cfc62b5ee458cf2ac670839",
        calendar = "http://min-prices.aviasales.ru/calendar_preload";

    let city = [];

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

    }


    const showCity = (input, list) => {
        list.textContent = '';

        if (input.value !== ''){
            const filterCity = city.filter((item) => {
                if (item.name !== null) {
                    const fixItem = item.name.toLowerCase();
                    return fixItem.includes(input.value.toLowerCase());
                }
            });
            filterCity.forEach((item) => {
                const li = document.createElement('li');
                li.classList.add("dropdown__city");
                li.textContent = item.name;
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
  
    const renderCheap = (data, date) => {
        const cheapTicketMonth = JSON.parse(data);
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

    formSearch.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            from: city.find((item) => inputCitiesFrom.value === item.name).code,
            to: city.find((item) => inputCitiesTo.value === item.name).code,
            when: inputDateDepart.value
        }
        //?depart_date=2020-05-25&origin=SVX&destination=KGD&one_way=true&token='+
        const requestData = '?depart_date=' + formData.when +
        '&origin=' + formData.from +
        '&destination=' + formData.to +
        '&one_way=true&token=' + API_KEY;

        getData(calendar + requestData,(response) => {
            console.log('123');
            renderCheap(response,formData.then); 
        });
//        console.log(requestData); 
    });

    // Вызовы функций
    //getData(proxy + citiesApi, (data) => {
    getData(citiesApi, (data) => {
        city = JSON.parse(data).filter(item => item.name);
        });

/*getData(


     proxy + calendar + '?depart_date=2020-05-25&origin=SVX&destination=KGD&one_way=true&token='+
    API_KEY, (data) => {
        const cheapTicket = JSON.parse(data).best_prices.filter(item => 
            item.depart_date ==='2020-05-29')
        console.log(cheapTicket);
    } 
);
*/
 //   console.log(formSearch,inputCitiesFrom);
//    console.log(inputCitiesTo,dropdownCitiesFrom);
//    console.log(dropdownCitiesTo);
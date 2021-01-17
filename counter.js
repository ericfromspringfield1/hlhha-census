const latestURL = "https://ericfromspringfield1.github.io/hlhha-census/latest.json"
const postCountURL = "https://ericfromspringfield1.github.io/hlhha-census/census.json"



const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    const isValidValue = element => {
        return (!['checkbox', 'radio'].includes(element.type));
    };
    if (isValidElement(element) && isValidValue(element)) {
        data[element.name] = element.value;
    }
    return data;
}, {});

const displayUpdatedCount = (data) => {
    const dataContainer = document.getElementsByClassName('results__display')[0];
    dataContainer.textContent = JSON.stringify(data);
}



const getPostCount = () => {
fetch(latestURL, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        },
        })
.then(response => response.json())
.then(res => displayUpdatedCount(res));
}

const postCount = (data) => {
 fetch(postCountURL, { 
     method: "PUT",
     headers: {
    "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
     })
     .then(response => response.json())
     .then(() => getPostCount());
    }

const handleFormSubmit = event => {
    event.preventDefault();
    const formToSubmit = event.target;
    const data = formToJSON(formToSubmit);
    postCount(data)
};

const form = document.getElementsByClassName('contact-form')[0];
form.addEventListener('submit', handleFormSubmit);

const isValidElement = element => {
    return element.name && element.value;
}


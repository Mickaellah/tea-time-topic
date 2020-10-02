// Grab the elements that we need.
const endpoint = 'https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json';
const nextTopicList = document.querySelector('.navigation_1__container');
const pastTopicList = document.querySelector('.navigation_2__container');
const topics = [];

// Fetch the data.
async function fetchTopics() {
    const response = await fetch(endpoint);
    console.log(response);
    const data = await response.json();
    return data;
}



// Display the data into html.
async function displayTopic() {
    const topics = await fetchTopics();
    const filteredTopicsNotDiscussed = topics.filter(topic => topic.discussedOn === "");
    const html1 = filteredTopicsNotDiscussed.map(topic => {
        return `
            <li class="list_item">
                <div class="container">
                    <p class="topic_title">${topic.title}</p>
                    <button class="archive" data-id="${topic.id}">
                        <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </button>
                </div>
                <div>
                    <button class="up_vote" data-id="${topic.id}">
                        <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                    </button>
                    <button class="down_vote" data-id="${topic.id}">
                        <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path></svg>
                    </button>
                </div>
            </li>
        `
    }).join("");
    nextTopicList.insertAdjacentHTML('beforebegin', html1);

    const filteredTopicDiscussedOn = topics.filter(topic => topic.discussedOn !== "");
    const html2 = filteredTopicDiscussedOn.map(topic => {
        const timeStamp = new Date(topic.discussedOn * 1000).getTime();
        const todate = new Date(timeStamp).getDate();
        const toMonth = new Date(timeStamp).getMonth()+1;
        const toYear = new Date(timeStamp).getFullYear();
        const original_date = todate + '/' + toMonth + '/' + toYear;


        return `
            <li class="list_item">
                <div class="container">
                    <p class="topic_title">${topic.title}</p>
                    <button class="archive" data-id="${topic.id}">
                        <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </button>
                </div>
                <div>
                    <button class="up_vote" data-id="${topic.id}">
                        <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                    </button>
                    <button class="down_vote" data-id="${topic.id}">
                        <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path></svg>
                    </button>
                </div>
                <div class="date">
                    <p>Descussed on ${original_date}</p>
                </div>
            </li>
        `
    }).join("");
    pastTopicList.insertAdjacentHTML('beforebegin', html2);
}
displayTopic();
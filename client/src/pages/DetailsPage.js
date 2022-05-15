import React, { useRef, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ClapButton from 'react-clap-button';
import { Progress } from 'semantic-ui-react';
import moment from 'moment';
let gapi = window.gapi;
let DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
];
let SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const DetailsPage = () => {
  let momentToday = new Date();
  const [toggled, setToggled] = useState(false);
  const [fundraiser, setFundraiser] = useState(false);
  const [fundraiserComments, setFundraiserComments] = useState(false);
  const [previousDonations, setPreviousDonations] = useState(false);
  const [likes, setLikes] = useState();

  function toggle() {
    toggled ? setToggled(false) : setToggled(true);
  }

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5200/fundraiser/find/${id}`)
      .then((response) => response.json())
      .then((actualResponse) => setFundraiser(actualResponse));

    fetch(`http://localhost:5200/fundraiser/comment/get/${id}`)
      .then((response) => response.json())
      .then((actualResponse) => setFundraiserComments(actualResponse));

    fetch(`http://localhost:5200/fundraiser/prevDonation/get/${id}`)
      .then((response) => response.json())
      .then((actualResponse) => setPreviousDonations(actualResponse));

    fetch(`http://localhost:5200/fundraiser/like/amount/${id}`)
      .then((response) => response.json())
      .then((actualResponse) => setLikes(actualResponse));

    try {
      fetch(`http://localhost:5200/fundraiser/view/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        views: {
          views: 1,
        },
      }),
    }).then((response) => response.json());
  } catch (e) {
    console.error(e);
  }
  }, []);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  const dollarDonationAmount = useRef(0);

  const stripeTestPromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

  const getName = JSON.parse(localStorage.getItem('userInfo'));

  const commentTextArea = useRef();

  let fundraiserBackgroundImage = `url("${fundraiser.image}")`;

  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L',
  };

  if (!likes) {
    return <>Loading fundraiser details...</>;
  }

  // const addCalendarEvent = () => {
  //   gapi.load('client:auth2', () => {
  //     gapi.client.init({
  //       apiKey: process.env.REACT_APP_API_KEY,
  //       clientId: process.env.REACT_APP_CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES,
  //     });

  //     gapi.client.load('calendar', 'v3');
  //     //time zone list:
  //     // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  //     let timeZone = 'Europe/Berlin';
  //     let duration = '00:30:00'; //duration of each event, here 30 minuts

  //     //event start time - im passing datepicker time, and making it match      //with the duration time, you can just put iso strings:
  //     //2020-06-28T09:00:00-07:00'

  //     let startDate = new Date(momentToday);
  //     let msDuration =
  //       (Number(duration.split(':')[0]) * 60 * 60 +
  //         Number(duration.split(':')[1]) * 60 +
  //         Number(duration.split(':')[2])) *
  //       1000;
  //     let endDate = new Date(startDate.getTime() + msDuration);
  //     let isoStartDate = new Date(
  //       startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  //     )
  //       .toISOString()
  //       .split('.')[0];
  //     let isoEndDate = new Date(
  //       endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  //     )
  //       .toISOString()
  //       .split('.')[0];

  //     //sign in with pop up window
  //     gapi.auth2
  //       .getAuthInstance()
  //       .signIn()
  //       .then(() => {
  //         let event = {
  //           summary: fundraiser.title, // or event name
  //           location: 'Testing for now', //where it would happen
  //           start: {
  //             dateTime: isoStartDate,
  //             timeZone: timeZone,
  //           },
  //           end: {
  //             dateTime: isoEndDate,
  //             timeZone: timeZone,
  //           },
  //           recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
  //           reminders: {
  //             useDefault: false,
  //             overrides: [{ method: 'popup', minutes: 20 }],
  //           },
  //         };

  //         //if you need to list your events than keep it
  //         gapi.client.calendar.events
  //           .list({
  //             calendarId: 'primary',
  //             timeMin: new Date().toISOString(),
  //             showDeleted: false,
  //             singleEvents: true,
  //             maxResults: 10,
  //             orderBy: 'startTime',
  //           })
  //           .then((response) => {
  //             const events = response.result.items;
  //             console.log('EVENTS: ', events);
  //           });

  //         //end of event listing

  //         let request = gapi.client.calendar.events.insert({
  //           calendarId: 'primary',
  //           resource: event,
  //         });

  //         request.execute((event) => {
  //           console.log(event);
  //           window.open(event.htmlLink);
  //         });
  //       });
  //   });
  // };

  return (
    <>
      <h1 className="fundraiserTitle">{fundraiser.title}</h1>
      <div className="container">
        <div
          className="fundraiserImage"
          style={{ backgroundImage: fundraiserBackgroundImage }}
        >
          <ClapButton
            onCountChange={async () => {
              await fetch(`http://localhost:5200/fundraiser/like/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  likes: likes + 1,
                }),
              }).then((response) => response.json());
              fetch(`http://localhost:5200/fundraiser/like/amount/${id}`)
                .then((response) => response.json())
                .then((actualResponse) => setLikes(actualResponse));
              console.log(likes);
            }}
            countTotal={likes - 1}
            isClicked={false}
          />
        </div>
        <div className="fundraiserDonation">
          <div className="donationContainer">
            <div>
              {fundraiser.currentAmount}$<br></br>
              <p className="fundraiserDonationDescription">
                of {fundraiser.targetAmount}$ raised
              </p>
            </div>
            <div>
              {fundraiser.backers}
              <br></br>
              <p className="fundraiserDonationDescription">total backers</p>
            </div>
            <div>
              {Math.floor(
                (Date.parse(fundraiser.deadlineDate) - Date.parse(today)) /
                  86400000
              )}
              <br></br>
              <p className="fundraiserDonationDescription">days left</p>
            </div>
          </div>

          {/* <div class="ui progress">
            <div class="bar">
              <div class="progress"></div>
            </div>
          </div> */}

          <Progress
            indicating
            color="purple"
            percent={
              fundraiser.currentAmount
                ? (fundraiser.currentAmount / fundraiser.targetAmount) * 100
                : 0
            }
            progress
            style={{ margin: '0 2rem 2rem 2rem', height: '2rem' }}
            content="Raised"
          />

          <div className="inputContainer">
            <input
              ref={dollarDonationAmount}
              placeholder="Enter $ for Donation"
              type="text"
            ></input>

            <button className="payButton" onClick={toggle}>
              Submit Payment
            </button>
          </div>
          {toggled === true && (
            <Elements stripe={stripeTestPromise}>
              <PaymentForm
                price={dollarDonationAmount.current.value}
                id={id}
                currentAmount={fundraiser.currentAmount}
                backers={fundraiser.backers}
                setFundraiser={setFundraiser}
                setPreviousDonations={setPreviousDonations}
                previousDonations={previousDonations}
                name={getName.name}
              />
            </Elements>
          )}
          <h3 className="previous-donations">Previous Donations:</h3>
          {previousDonations.length > 0 ? (
            previousDonations.map(({ sender, amount, date }) => {
              return (
                <>
                  <div className="previous-donations">
                    {sender} {amount}$ -{moment(date).fromNow()}
                  </div>
                </>
              );
            })
          ) : (
            <div className="previous-donations">No previous donations</div>
          )}
        </div>
      </div>
      <div className="fundraiserDescription">{fundraiser.description}</div>

      <div class="ui comments" style={{ marginLeft: 150, marginTop: 100 }}>
        <h3 className="ui dividing header">
          Comments - Writer: {fundraiser.writer}
        </h3>
        {fundraiserComments.length > 0 &&
          fundraiserComments.map(({ name, textfield, date }) => {
            return (
              <>
                <div class="comment">
                  <a class="avatar">
                    <img src="/images/avatar/small/elliot.jpg"></img>
                  </a>
                  <div class="content">
                    <a class="author">{name}</a>
                    <div class="metadata">
                      <span class="date">
                        <Moment calendar={calendarStrings}>{date}</Moment>
                      </span>
                    </div>
                    <div class="text">
                      <p>{textfield}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

        <form class="ui reply form">
          <div class="field">
            <textarea ref={commentTextArea}></textarea>
          </div>
          <div
            class="ui blue labeled submit icon button"
            style={{ marginBottom: 100 }}
            onClick={async () => {
              await fetch(
                `http://localhost:5200/fundraiser/comment/add/${id}`,
                {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    comments: [
                      ...fundraiserComments,
                      {
                        name: getName.name,
                        textfield: commentTextArea.current.value,
                        date: momentToday,
                      },
                    ],
                  }),
                }
              ).then((response) => response.json());
              commentTextArea.current.value = '';
              fetch(`http://localhost:5200/fundraiser/comment/get/${id}`)
                .then((response) => response.json())
                .then((actualResponse) =>
                  setFundraiserComments(actualResponse)
                );
            }}
          >
            <i class="icon edit"></i> Add Reply
          </div>
        </form>
      </div>
    </>
  );
};

export default DetailsPage;

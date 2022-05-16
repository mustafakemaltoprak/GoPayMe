import React, { useRef, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ClapButton from 'react-clap-button';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';

import { Image, Label, Progress } from 'semantic-ui-react';
import moment from 'moment';
import { GoogleOAuthProvider } from '@react-oauth/google';

// let gapi = window.gapi;
let DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
let SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const DetailsPage = () => {
   const { t } = useTranslation();

   function handleClick(lang) {
     i18next.changeLanguage(lang);
   }

  const [toggled, setToggled] = useState(false);
  const [fundraiser, setFundraiser] = useState(false);
  const [fundraiserComments, setFundraiserComments] = useState(false);
  const [previousDonations, setPreviousDonations] = useState(false);
  const [likes, setLikes] = useState();

  function toggle() {
    toggled ? setToggled(false) : setToggled(true);
  }

  //  const responseGoogle = (response) => {
  //    console.log('fired', response);

  //    let codee;
  //    window.addEventListener('message', ({ data }) => {
  //      //  console.log('the data', data);
  //      const { authResult } = data;
  //      console.log('the data', authResult.authResult);
  //    });
  //  };

   

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

    fetch(`http://localhost:5200/fundraiser/view/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        views: 1,
      }),
    }).then((response) => response.json());
  }, []);

  let today = new Date();
  let momentToday = new Date();
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
  
  //  useEffect(() => {
  //    window.gapi.load('client:auth2', () => {
  //      window.gapi.client.init({
  //        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //        scope: 'email',
  //      });
  //    });
  //  }, []);

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
  

 
  const responseError = (error) => {
    console.log('error', error);
  };



  // console.log('token', process.env.REACT_APP_GOOGLE_CLIENT_ID);
  return (
    <>
      <h1 className="fundraiserTitle">{fundraiser.title}</h1>
      <div className="container">
        {/* <div
          className="fundraiserImage"
          style={{ backgroundImage: fundraiserBackgroundImage }}
        ></div> */}
        <div>
          <Image src={fundraiser.image} style={{ height: '20rem' }} />
          <p>{fundraiser.description}</p>
          {/* <button onClick={() => handleClick('en')}>English</button>
          <button onClick={() => handleClick('chi')}>Chinese</button>
          <p>
            <h3>{t('Thanks.1')}</h3> <h3>{t('Why.1')}</h3>
          </p> */}
          {/* <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in and authorize calendar"
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={'single_host_origin'}
            responseType="code"
            accessType="offline"
            scope="openid email profile https://www.googleapis.com/auth/calendar"
          /> */}
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log('resp',credentialResponse);
            }}
            buttonText='google'
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ClapButton
            className="fundraiserImage"
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
          <Label>calendar event</Label>
        </div>

        <div className="fundraiserDonation">
          <div className="donationContainer">
            <div>
              {fundraiser.currentAmount}$<br></br>
              <p className="fundraiserDonationDescription">of {fundraiser.targetAmount}$ raised</p>
            </div>
            <div>
              {fundraiser.backers}
              <br></br>
              <p className="fundraiserDonationDescription">total backers</p>
            </div>
            <div>
              {Math.floor((Date.parse(fundraiser.deadlineDate) - Date.parse(today)) / 86400000)}
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
                writer={fundraiser.writer}
              />
            </Elements>
          )}
          <h3 className="previous-donations">Latest Donations:</h3>
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

      <div className="ui comments" style={{ marginLeft: 150, marginTop: 100 }}>
        <h3 className="ui dividing header">Comments</h3>
        {fundraiserComments.length > 0 &&
          fundraiserComments.map(({ name, textfield, date }) => {
            return (
              <>
                <div className="comment">
                  <div className="content" style={{ display: 'flex' }}>
                    <img src="/images/avatar/small/elliot.jpg" alt="" />
                    <strong style={{ paddingLeft: '2rem' }}>{name}</strong>
                    <div class="metadata"></div>
                    <span style={{ color: 'gray' }}>
                      <Moment calendar={calendarStrings}>{date}</Moment>
                    </span>
                  </div>
                  <div class="text">
                    <p>{textfield}</p>
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
              await fetch(`http://localhost:5200/fundraiser/comment/add/${id}`, {
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
              }).then((response) => response.json());
              commentTextArea.current.value = '';
              fetch(`http://localhost:5200/fundraiser/comment/get/${id}`)
                .then((response) => response.json())
                .then((actualResponse) => setFundraiserComments(actualResponse));
            }}
          >
            <i className="icon edit"></i> Add Reply
          </div>
        </form>
      </div>
    </>
  );
};

export default DetailsPage;

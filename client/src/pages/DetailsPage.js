import React, { useRef, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ClapButton from 'react-clap-button';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useSelector, useDispatch } from 'react-redux';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';

import {
  Button,
  Grid,
  GridColumn,
  GridRow,
  Icon,
  Image,
  Input,
  Label,
  Progress,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import moment from 'moment';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserButton from '../components/UserButton';
import Timer from '../components/Timer';
import { createBookMark } from '../services/user-services';
import { updateUserDetails } from '../redux/actions/userActions';

// let gapi = window.gapi;
let DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
let SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { loginSuccess } = useSelector((state) => state.user);
  // function handleClick(lang) {
  //   i18next.changeLanguage(lang);
  // }

  let momentToday = new Date();
  const [toggled, setToggled] = useState(false);
  const [fundraiser, setFundraiser] = useState(false);
  const [bookMarked, setBookMarked] = useState(false);
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

  const handleClick = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:5200/fundraiser/comment/add/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comments: [
          ...fundraiserComments,
          {
            name: getName.name,
            textfield: commentTextArea.current.value,
            image: loginSuccess.image,
            date: momentToday,
          },
        ],
      }),
    }).then((response) => response.json());
    commentTextArea.current.value = '';
    fetch(`http://localhost:5200/fundraiser/comment/get/${id}`)
      .then((response) => response.json())
      .then((actualResponse) => setFundraiserComments(actualResponse));
  };

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

  console.log('token', fundraiser);
  return (
    <>
      <div className="details">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '0 2rem'
          }}
        >
          <Image src={fundraiser.image} style={{ height: '20rem' }} />
          <div style={{ display: 'flex' }}>
            <h2>Description</h2>
          </div>
          <div>
            {' '}
            <Label
              // size="tiny"

              onClick={async () => {
                const response = await createBookMark({ _id: fundraiser._id });
                if (response) {
                  setBookMarked(true);
                  dispatch(updateUserDetails(response));
                }
              }}
            >
              <Icon name="bookmark" />
              {bookMarked || loginSuccess.bookmarked.find((item) => item._id === fundraiser._id)
                ? 'Bookmarked'
                : 'Bookmark'}
            </Label>
            <Label
              style={{ cursor: 'pointer' }}
              onClick={async () => {
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
            >
              {' '}
              <Icon name="handshake" /> Approve
            </Label>
            <Label icon="eye"></Label>
          </div>

          <p>{fundraiser.description}</p>
          <div>
            Fundraiser created by <UserButton dataObj={fundraiser} />
          </div>
          <h2>Comments</h2>
          <form style={{ display: 'flex' }}>
            <TextArea ref={commentTextArea} />
            <Button type="submit" icon="edit" onClick={(e) => handleClick(e)}>
              Submit
            </Button>
          </form>

          {fundraiserComments.length > 0 &&
            fundraiserComments.map(({ name, textfield, date, image }) => {
              return (
                <>
                  <div className="comment" style={{ display: 'flex' }}>
                    <div>
                      <Image
                        circular
                        style={{ height: '1.5rem', padding: 0, display: 'flex' }}
                        src={image ? image : ''}
                      />
                    </div>
                    <div>{name}</div>
                    <div>
                      <span style={{ color: 'gray' }}>
                        <Moment calendar={calendarStrings}>{date}</Moment>
                      </span>
                    </div>
                  </div>
                  <div className="comment-message">
                    <p></p>
                    <i>- {textfield}</i>
                  </div>
                </>
              );
            })}

          {/* <TextArea />
          <Button>Submit</Button> */}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            
            alignContent: 'center',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>{fundraiser.title}</h1>
          <Timer countdownTimestampMs={new Date(fundraiser.deadlineDate).getTime()} />
          <div>
            {/* <div
          className="fundraiserImage"
          style={{ backgroundImage: fundraiserBackgroundImage }}
        ></div> */}

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

            <div
              style={{
                border: '1px solid black',
                background: '#eee',
                borderRadius: 15,
                padding: '2rem',
                marginTop: '1rem'
              }}
            >
              <div className="metics">
                <div
                  width={5}
                  style={{ borderRight: '1px solid gainsboro', textAlign: 'center' }}
                  className="metrics-text"
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: 600 }}>
                    ${fundraiser.currentAmount}
                  </div>
                  <br></br>
                  <p>${fundraiser.targetAmount} raised</p>
                </div>
                <div
                  width={5}
                  style={{ borderRight: '1px solid gainsboro', textAlign: 'center' }}
                  className="metrics-text"
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: 600 }}>{fundraiser.backers}</div>
                  <br></br>
                  <p>donators so far</p>
                </div>
                <div>
                  {Math.floor(
                    (Date.parse(fundraiser.deadlineDate) - Date.parse(today)) / 86400000,
                  ) > 0 ? (
                    <>
                      <div
                        style={{
                          fontSize: '2.5rem',
                          fontWeight: 600,
                          textAlign: 'center',
                        }}
                        className="metrics-text"
                      >
                        {Math.floor(
                          (Date.parse(fundraiser.deadlineDate) - Date.parse(today)) / 86400000,
                        )}
                      </div>
                      <br></br>
                      <p style={{}}>Days Left</p>
                    </>
                  ) : (
                    <>
                      <h3 style={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center' }}>
                        Expired
                      </h3>

                      <p style={{ textAlign: 'center' }}>donation open</p>
                    </>
                  )}
                </div>
              </div>

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

              {/* <Button.Group size="tiny"> */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'center',
                  maxWidth: '100%',
                  gap: '1rem',
                  // border: '1px yellow solid',
                }}
              >
                <Button toggle circular size="tiny">
                  $10
                </Button>
                <Button toggle circular size="tiny">
                  $20
                </Button>
                <Button toggle circular size="tiny">
                  $50
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'center',
                  maxWidth: '100%',
                  // border: '1px yellow solid',
                }}
              >
                <p>or</p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'center',
                  paddingBottom: '1rem',
                  maxWidth: '100%',
                  // border: '1px yellow solid',
                }}
              >
                <input type='number' ref={dollarDonationAmount} placeholder="Enter $ for Donation"  style={{padding: '0.5rem', border:  'none'}}/>

                <Button className="payButton" onClick={toggle}>
                  Submit Payment
                </Button>
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

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  maxHeight: '10rem',
                  paddingBottom: '1rem',
                  maxWidth: '100%',
                  // border: '1px yellow solid',
                }}
              >
                {' '}
                <h3>Latest Donations:</h3>
                {previousDonations.length > 0 ? (
                  <div
                    style={{
                      overflow: 'scroll',

                      // border: '1px yellow solid',
                    }}
                  >
                    {previousDonations.map(({ sender, amount, date }) => {
                      return (
                        <div>
                          {sender} {amount}$ -{moment(date).fromNow()}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="previous-donations">No previous donations</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;

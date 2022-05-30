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

import { motion }from 'framer-motion';

// let gapi = window.gapi;
let DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
let SCOPES = 'https://www.googleapis.com/auth/calendar.events';

// test

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { loginSuccess } = useSelector((state) => state.user);

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

  const [categories, setCategories] = useState({
    10: false,
    20: false,
    50: false,
  });

   const handleCategories = (arg) => {
     // setCategories(prev => {...prev, egef: !categories[arg]})
     setCategories((prev) => {
       return { ...prev, [arg]: !categories[arg] };
     });
   };

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

  const handleClick = async (e) => {
    e.preventDefault();
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

  const responseError = (error) => {
    console.log('error', error);
  };

  console.log('token', fundraiser);
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className="details">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '0 2rem',
          }}
          className="details-col1"
        >
          <h1 style={{ textAlign: 'center' }}>{fundraiser.title}</h1>
          <Image src={fundraiser.image} style={{ height: '20rem' }} />
          <div style={{ display: 'flex' }}>
            <h2>Description</h2>
          </div>
          <div>
            {' '}
            <Label
              // size="tiny"
              style={{ cursor: 'pointer', color: 'black' }}
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
              style={{ cursor: 'pointer', color: 'black' }}
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
              <Icon name="thumbs up outline" /> Like {likes ?? fundraiser.likes}
            </Label>
            <Label icon="eye">
              <Icon name="eye" />
              {fundraiser.views}
            </Label>
          </div>

          <p>{fundraiser.description}</p>
          <i>
            This Fundraiser was created by <UserButton dataObj={fundraiser} />
          </i>
          <h2>Comments</h2>
          <form style={{ display: 'flex' }} autoComplete='off'>
            <textarea ref={commentTextArea} />
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
                    <strong>{name}</strong>
                    <div>
                      <span style={{ color: 'gray', fontSize: '1rem' }}>
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
            alignContent: 'center',
          }}
        >
          <Timer countdownTimestampMs={new Date(fundraiser.deadlineDate).getTime()} />
          <div>
            <div
              className="payments-dashboard"
              style={{
                border: 'none',
                background: '#fff',
                borderRadius: 15,
                padding: '2rem',
                marginTop: '1rem',
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
                  <p>donors so far</p>
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
                      <p
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        Days Left
                      </p>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'center' }}>
                        Expired
                      </div>
                      <br></br>
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
                    ? Math.floor((fundraiser.currentAmount / fundraiser.targetAmount) * 100)
                    : 0
                }
                progress
                style={{ margin: '1rem 2rem 2rem 2rem', height: '2rem' }}
                content="Raised"
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'center',
                  maxWidth: '100%',
                  gap: '1rem',
                }}
              >
                <Button
                  toggle
                  circular
                  size="tiny"
                  className={`${categories['10'] && 'toggle-btn'}`}
                  onClick={() => handleCategories('10')}
                >
                  $10
                </Button>
                <Button
                  toggle
                  circular
                  size="tiny"
                  onClick={() => handleCategories('20')}
                  className={`${categories['20'] && 'toggle-btn'}`}
                >
                  $20
                </Button>
                <Button
                  toggle
                  circular
                  size="tiny"
                  onClick={() => handleCategories('50')}
                  className={`${categories['50'] && 'toggle-btn'}`}
                >
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
                }}
              >
                <input
                  type="number"
                  ref={dollarDonationAmount}
                  placeholder="Enter $ for Donation"
                  style={{ padding: '0.5rem', border: 'none', background: 'white' }}
                />

                <Button className="payments-button" onClick={toggle}>
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
                  maxHeight: '15rem',
                  paddingBottom: '1rem',
                  maxWidth: '100%',
                }}
              >
                {' '}
                <h3 style={{marginTop: "10px"}}>Latest Donations:</h3>
                {previousDonations.length > 0 ? (
                  <div
                    style={{
                      overflowY: 'scroll',
                    }}
                  >
                    {previousDonations.map(({ sender, amount, date }) => {
                      return (
                        <div
                          style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
                        >
                          <span>
                            {sender} donated ${amount} - {moment(date).fromNow()}
                          </span>
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
    </motion.div>
  );
};

export default DetailsPage;

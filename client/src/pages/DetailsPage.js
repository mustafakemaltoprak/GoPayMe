import React, { useRef, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ClapButton from 'react-clap-button';

const DetailsPage = () => {
  const [toggled, setToggled] = useState(false);
  const [fundraiser, setFundraiser] = useState(false);
  const [fundraiserComments, setFundraiserComments] = useState(false);
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

    fetch(`http://localhost:5200/fundraiser/like/amount/${id}`)
      .then((response) => response.json())
      .then((actualResponse) => setLikes(actualResponse));
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

  if (!likes) {
    return <>Loading fundraiser details...</>;
  }

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

          <div class="ui progress">
            <div class="bar">
              <div class="progress"></div>
            </div>
          </div>

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
              />
            </Elements>
          )}
        </div>
      </div>
      <div className="fundraiserDescription">{fundraiser.description}</div>

      <div class="ui comments" style={{ marginLeft: 150, marginTop: 100 }}>
        <h3 class="ui dividing header">Comments</h3>
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

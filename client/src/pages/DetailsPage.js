import React, { useRef, useState, useEffect } from 'react';
// import '../styles/fundraiserDtl.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router-dom';

const DetailsPage = () =>{
  let testFundraiser = {
    name: 'Tina',
    target_amount: 15000,
    current_amount: 2400,
    deadline_date: '07/13/2022',
    title: 'BiteMe',
    short_descriptions: 'Game to play with your friends all day, snake multiplayer.',
    backers: 20,
    imgUrl: "url('../mockdata/pictures/kidneys.jpg')",
  };

  const [toggled, setToggled] = useState(false);
  const [fundraiser, setFundraiser] = useState(testFundraiser);

  function toggle() {
    toggled ? setToggled(false) : setToggled(true);
  }

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5200/fundraiser/find/${id}`)
      .then((response) => response.json())
      .then((actualResponse) => setFundraiser(actualResponse));
  }, []);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  const dollarDonationAmount = useRef(0);

  const stripeTestPromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

  return (
    <>
      <h1 className="fundraiserTitle">{fundraiser.title}</h1>
      <div className="container">
        <div className="fundraiserImage" style={{ backgroundImage: fundraiser.image }}>
          Image goes here, test for params id: {id}
        </div>
        <div className="fundraiserDonation">
          <div className="donationContainer">
            <div>
              {fundraiser.currentAmount}$<br></br>
              <p className="fundraiserDonationDescription">of {fundraiser.targetAmount} raised</p>
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
              <PaymentForm price={dollarDonationAmount.current.value} />
            </Elements>
          )}
        </div>
      </div>
      <div className="fundraiserDescription">{fundraiser.description}</div>

      <div class="ui comments" style={{ marginLeft: 150, marginTop: 100 }}>
        <h3 class="ui dividing header">Comments</h3>
        <div class="comment">
          <a class="avatar">
            <img src="/images/avatar/small/matt.jpg"></img>
          </a>
          <div class="content">
            <a class="author">Matt</a>
            <div class="metadata">
              <span class="date">Today at 5:42PM</span>
            </div>
            <div class="text">How artistic!</div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
        </div>
        <div class="comment">
          <a class="avatar">
            <img src="/images/avatar/small/elliot.jpg"></img>
          </a>
          <div class="content">
            <a class="author">Elliot Fu</a>
            <div class="metadata">
              <span class="date">Yesterday at 12:30AM</span>
            </div>
            <div class="text">
              <p>This has been very useful for my research. Thanks as well!</p>
            </div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
          <div class="comments">
            <div class="comment">
              <a class="avatar">
                <img src="/images/avatar/small/jenny.jpg"></img>
              </a>
              <div class="content">
                <a class="author">Jenny Hess</a>
                <div class="metadata">
                  <span class="date">Just now</span>
                </div>
                <div class="text">Elliot you are always so right :)</div>
                <div class="actions">
                  <a class="reply">Reply</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment">
          <a class="avatar">
            <img src="/images/avatar/small/joe.jpg"></img>
          </a>
          <div class="content">
            <a class="author">Joe Henderson</a>
            <div class="metadata">
              <span class="date">5 days ago</span>
            </div>
            <div class="text">Dude, this is awesome. Thanks so much</div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
        </div>
        <form class="ui reply form">
          <div class="field">
            <textarea></textarea>
          </div>
          <div class="ui blue labeled submit icon button" style={{ marginBottom: 100 }}>
            <i class="icon edit"></i> Add Reply
          </div>
        </form>
      </div>
    </>
  );
}


export default DetailsPage
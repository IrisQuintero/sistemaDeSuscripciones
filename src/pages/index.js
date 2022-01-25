import React, { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Image from "next/image";
import styled from "styled-components";
import { PaymentForm } from "../components/PaymentForm";
import { Plan } from "../components/Plan";

const Title = styled.h1`
  font-size: 64px;
  font-weight: 500;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
`;

const InfoContainer = styled.div`
  padding-left: 100px;
  padding-right: 100px;

  > ${Title} {
    margin-bottom: 24px;
  }

  > ${Subtitle} {
    margin-bottom: 48px;
  }
`;
const BannerContainer = styled.div`
  > span {
    position: absolute;
    top: 16px;
    right: 0;
  }
`;

const PlanList = styled.div`
  > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  padding-top: 64px;

  > ${BannerContainer} {
    position: relative;
  }
`;

export default function IndexPage() {
  const [plan] = useState([
    {
      name: "standard",
      price: "9.99",
      interval: "month",
      feature: "Listen to a single song",
      stripePriceId: "price_1K6giaC82kvSerfSM6DTfYAS",
    },
    {
      name: "pro",
      price: "19.99",
      interval: "month",
      feature: "Listen to multiple songs",
      stripePriceId: "price_1K6gj6C82kvSerfSec7dBd4w",
    },
  ]);

  const [clientSecret, setClientSecret] = useState(null);

  const [planSelectedForPayment, setPlanSelectedForPayment] = useState(null);

  const stripePromise = useMemo(() => {
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY);
  }, []);

  function onSubscribeClick(priceId) {
    setPlanSelectedForPayment(priceId);

    fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        customerId: "cus_L21ZfedkwH1erx",
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => setClientSecret(jsonResponse.clientSecret));
  }

  return (
    <Elements stripe={stripePromise}>
      <Container>
        <InfoContainer>
          <Title>Discover new music every Day</Title>
          <Subtitle>
            Enjoy ad-free music listening, offline playback and more. Cancel
            anytime.
          </Subtitle>
          <PlanList>
            {plan.map((plan) => {
              return (
                <React.Fragment key={plan.stripePriceId}>
                  <Plan
                    name={plan.name}
                    price={plan.price}
                    interval={plan.interval}
                    feature={plan.feature}
                    onSubscribeClick={() =>
                      onSubscribeClick(plan.stripePriceId)
                    }
                  />
                  {clientSecret &&
                    planSelectedForPayment === plan.stripePriceId && 
                      <PaymentForm clientSecret={clientSecret} />
                    }
                </React.Fragment>
              );
            })}
          </PlanList>
        </InfoContainer>
        <BannerContainer>
          <span>
            <Image src="/img/image 3.png" width="611px" height="798px" alt="" />
          </span>
        </BannerContainer>
      </Container>
    </Elements>
  );
}

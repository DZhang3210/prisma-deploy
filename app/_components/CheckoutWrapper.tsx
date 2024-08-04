"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { CheckoutForm } from "./CheckoutForm";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);
type CheckoutWrapperProps = {
  product: {
    id: string;
    title: string;
    desc: string;
    pricePaidInCents: number;
    createdAt: Date;
    updatedAt: Date;
    ownerID: string | null;
  };
};
const CheckoutWrapper = ({ product }: CheckoutWrapperProps) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: Number(product?.pricePaidInCents || 0), //cents
        currency: "usd",
      }}
    >
      <CheckoutForm product={product} />
    </Elements>
  );
};

export default CheckoutWrapper;

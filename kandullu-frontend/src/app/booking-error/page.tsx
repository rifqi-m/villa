"use client"; // This is a client component

import { useSearchParams } from "next/navigation";
import StartRating from "@/components/StartRating";
import React, { FC, useEffect } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { useCreateBookingError } from "./queries";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import Link from "next/link";

export interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => {
  const searchParams = useSearchParams();
  const { mutate, isPending } = useCreateBookingError();

  const bookingId = searchParams.get("bookingId");
  useEffect(() => {
    mutate(
      { booking_id: bookingId },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          displayErrorMessage(error);
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Opps</h2>
        <p className="text-lg mb-6">Payment is unsuccessful!</p>
        <Link href="/">
          <ButtonPrimary>Return to Home Page</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

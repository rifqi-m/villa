"use client"; // This is a client component

import { useSearchParams } from "next/navigation";
import StartRating from "@/components/StartRating";
import React, { FC, useEffect } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { useCreateBookingSuccess } from "./queries";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import Link from "next/link";

export interface SuccessPageProps {}

const SuccessPage: FC<SuccessPageProps> = () => {
  const searchParams = useSearchParams();
  const { mutate, isPending } = useCreateBookingSuccess();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");
  useEffect(() => {
    mutate(
      { session_id: sessionId, booking_id: bookingId },
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
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
          Congratulations 🎉
        </h2>
        <p className="text-lg mb-6">Payment is successful!</p>
        <Link href="/">
          <ButtonPrimary>Return to Home Page</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;

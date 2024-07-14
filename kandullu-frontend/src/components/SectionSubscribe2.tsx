"use client";
import rightImg from "@/images/SVG-subcribe2.png";
import ButtonCircle from "@/shared/ButtonCircle";
import Input from "@/shared/Input";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { notification } from "antd";
import Image from "next/image";
import { FC, useState } from "react";
import { useCreateNewsLetter } from "./queries";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError, error } =
    useCreateNewsLetter();
  const handleSubmit = () => {
    mutate(
      { email },
      {
        onSuccess: () => {
          notification.success({ message: "Subscribed" });
          setEmail("");
        },
        onError: (error) => {
          displayErrorMessage(error);
        },
      }
    );
  };
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our newsletter 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Receive the latest offers and promos without spam. You can cancel
          anytime.
        </span>

        <div className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3"
          />
          <ButtonCircle
            type="button"
            className="absolute transform top-1/2 -translate-y-1/2 right-1.5"
            size="w-10 h-10"
            onClick={handleSubmit}
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </div>
        {isPending && <p className="mt-2 text-gray-500">Submitting...</p>}
      </div>
      <div className="flex-grow">
        <Image alt="" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;

"use client";
import React, { FC, Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import { useCheckAvailability } from "./listing-villa-detail/[id]/queries";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { notification } from "antd";

const SectionDateRange = ({ title, id }: { title: string; id: string }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const { mutate, isPending } = useCheckAvailability();
  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleSubmit = () => {
    const values = {
      property_id: id,
      rent_start: startDate as Date,
      rent_end: endDate as Date,
    };
    mutate(values, {
      onSuccess: (data) => {
        notification.success({
          message: data.data.available ? "Available" : "Not Available",
        });
      },
      onError: (error) => {
        displayErrorMessage(error);
      },
    });
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {`Experience the ultimate in comfort and convenience. Check
            availability for ${title} and ensure your stay is nothing short
            of perfect. Contact us for any special requests or additional
            information. Our team is here to assist you.`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            renderDayContents={(day, date) => (
              <DatePickerCustomDay dayOfMonth={day} date={date} />
            )}
          />
        </div>
        <div className="flex items-center justify-end">
          <ButtonPrimary onClick={handleSubmit} loading={isPending}>
            Apply
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;

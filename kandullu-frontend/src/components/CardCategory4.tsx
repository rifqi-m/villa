import Image from "next/image";
import { FC } from "react";

export interface CardCategory4Props {
  className?: string;
  taxonomy: {
    image: string;
    title: string;
    description: string;
    path: string;
  };
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  taxonomy,
}) => {
  const { description, title, path, image } = taxonomy;
  return (
    <div
      className={`nc-CardCategory4 my-2 flex flex-col ${className}`}
      data-nc-id="CardCategory4"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          src={image || ""}
          className="object-cover w-full h-full rounded-2xl"
          fill
          alt="archive"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="flex flex-col  items-center justify-between mt-4 px-2  text-center">
        <div>
          <h2
            className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
          >
            {title}
          </h2>
          <p
            className={`block mt-2 text-sm text-left text-neutral-6000 dark:text-neutral-400`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardCategory4;

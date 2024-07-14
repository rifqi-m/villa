import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export interface Card12Props {
  className?: string;
  news?: any;
}

const Card12: FC<Card12Props> = ({ className = "h-full", news }) => {
  const { title, id, main_image, subtitle } = news;

  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <Link
        href={`/news/${id}` as any}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
      >
        <Image
          fill
          src={main_image}
          alt={title}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </Link>

      <div className=" mt-8 pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <Link
            href={`/news/${id}` as any}
            className="line-clamp-2"
            title={title}
          >
            {title}
          </Link>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2"> {subtitle}</span>
        </span>
      </div>
    </div>
  );
};

export default Card12;

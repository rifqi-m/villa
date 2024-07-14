import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
export interface Card13Props {
  className?: string;
  news: any;
}

const Card13: FC<Card13Props> = ({ className = "", news }) => {
  const { title, id, subtitle, main_image, createdAt } = news;

  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
      <div className="flex flex-col h-full py-2">
        <h2 className={`nc-card-title block font-semibold text-base`}>
          <Link
            href={`/news/${id}` as any}
            className="line-clamp-2"
            title={title}
          >
            {title}
          </Link>
        </h2>
        <span className="hidden sm:block my-3 text-neutral-500 dark:text-neutral-400 ">
          <span className="line-clamp-2"> {subtitle}</span>
        </span>
        <span className="mt-4 block sm:hidden text-sm text-neutral-500 ">
          {dayjs(createdAt).format("DD/MM/YYYY")}
        </span>
      </div>

      <Link
        href={`/news/${id}` as any}
        className={`block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5`}
      >
        <Image
          fill
          className="object-cover rounded-xl sm:rounded-3xl"
          src={main_image}
          alt={title}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </Link>
    </div>
  );
};

export default Card13;

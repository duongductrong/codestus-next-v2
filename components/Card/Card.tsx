import classNames from "classnames";
import moment from "moment";
import Link from "next/link";
import React, { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import { AtomicComponent } from "../../@types/global/Common";
import { TagI } from "../../core/services/tagService";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";

export interface CardProps extends AtomicComponent {
  title?: string;
  description?: string;
  countViewer?: number;
  slug?: string;
  createdAt?: string;
  tag?: TagI[];
}

const Card: FC<CardProps> = ({ title, description, slug, countViewer = "0", createdAt, tag, className }) => {
  return (
    <article className={classNames("flex flex-wrap", className)}>
      {/* Date of card */}
      <div className="mb-4 md:mb-0 sm:w-3/12 md:w-2/12 pr-4">
        <span className="text-sm text-slate-500 dark:text-slate-500 mb-2 inline-block">
          {moment(createdAt).format("MMM Do YYYY")}
        </span>
      </div>

      <div className="sm:w-9/12 md:w-10/12">
        <div className="space-x-4 mb-2">
          {tag?.map(({ tagId, name, slug }, index) => (
            <Link key={`Card-${tagId}${slug}${index}`} href={`/tags/${slug}`}>
              <a>
                <Badge key={`${tagId}${index}`}>{name}</Badge>
              </a>
            </Link>
          ))}
        </div>

        {/* Card title */}
        <Link href={`/posts/${slug}`}>
          <a>
            <Typography tagName="h2" variant="h4" className="font-semibold mb-2 cursor-pointer">
              {title ?? ""}
            </Typography>
          </a>
        </Link>

        {countViewer && (
          <span className="text-sm text-slate-400 mb-2 inline-block">{countViewer.toString()} lượt xem</span>
        )}

        {/* Card desc */}
        <Typography className="text-slate-500" tagName="p" variant="p">
          <span
            dangerouslySetInnerHTML={{
              __html: description ?? "",
            }}></span>
        </Typography>

        {/* Call to action card */}
        <Link href={`/posts/${slug}`}>
          <a>
            <Button className="mt-4 rounded-full" color="secondary" size="md">
              Read more <FaChevronRight className="ml-2 text-sm" />
            </Button>
          </a>
        </Link>
      </div>
    </article>
  );
};

export default Card;

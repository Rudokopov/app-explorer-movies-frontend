import React from "react";
import styles from "./card.module.scss";
import { Film } from "../../app/films/types";
import { convertToHours } from "../../utils/utils";
import { CreateMovieParams, RemoveMovieParams } from "../../app/api/types";

type CardProps = {
  movieId: string;
  image: string;
  description: string;
  nameRU: string;
  trailerLink: string;
  duration: number;
  myFilmsPage?: boolean;
  addFavoriteMovie?: (params: CreateMovieParams) => Promise<void>;
  removeUserFilm?: (i: number) => Promise<void>;
};

const Card: React.FC<CardProps> = (props) => {
  const {
    movieId,
    image,
    description,
    nameRU,
    duration,
    trailerLink,
    myFilmsPage,
    addFavoriteMovie,
    removeUserFilm,
  } = props;

  const handleAddMovie: React.MouseEventHandler<SVGSVGElement> = () => {
    if (addFavoriteMovie) {
      addFavoriteMovie({
        movieId,
        image,
        description,
        nameRU,
        duration,
        trailerLink,
      });
    }

    return;
  }; // Необходимо что бы это гавно заработало на SVG иконке, другого варианта не нашел

  const handleRemoveMovie: React.MouseEventHandler<SVGSVGElement> = () => {
    if (removeUserFilm) {
      const id = Number(movieId);
      removeUserFilm(id);
    }
  };

  return (
    <div className={styles.container}>
      <a target="_blank" rel="noreferrer" href={trailerLink}>
        <img className={styles.image} src={image} alt={nameRU} />
      </a>
      <div className={styles.content}>
        <h3 className={styles.title}>{nameRU}</h3>
        {!myFilmsPage ? (
          <svg
            onClick={handleAddMovie}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_34856_15477)">
              <rect x="6" y="3" width="16" height="16" rx="8" fill="#313131" />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 17C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5C10.6863 5 8 7.68629 8 11C8 14.3137 10.6863 17 14 17ZM14 19C18.4183 19 22 15.4183 22 11C22 6.58172 18.4183 3 14 3C9.58172 3 6 6.58172 6 11C6 15.4183 9.58172 19 14 19Z"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_34856_15477"
                x="0"
                y="0"
                width="28"
                height="28"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_34856_15477"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_34856_15477"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        ) : (
          <svg
            onClick={handleRemoveMovie}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.99951 8.94287L10.3566 11.2999L11.4172 10.2393L9.06017 7.88221L11.2994 5.64295L10.2388 4.58229L7.99951 6.82155L5.76037 4.58241L4.69971 5.64307L6.93885 7.88221L4.58192 10.2391L5.64258 11.2998L7.99951 8.94287Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <p className={styles.description}>{convertToHours(duration)}</p>
    </div>
  );
};

export default Card;

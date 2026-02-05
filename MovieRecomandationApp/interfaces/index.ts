import { ReactNode } from "react";

// Generic component props
export interface ComponentProps {
  children: ReactNode;
}

export interface ButtonProps {
  title: string;
  action?: () => void;
}

// Movie data for front-end display
export interface MovieProps {
  id: string;
  posterImage: string;
  releaseYear: string;
  title: string;
  onFavoriteChange?: () => void;
}

// Raw API data shapes
export interface PrimaryImage {
  url: string;
}

export interface TitleText {
  text: string;
}

export interface ReleaseYear {
  year: string;
}

export interface MoviesProps {
  id: string;
  primaryImage: PrimaryImage;
  titleText: TitleText;
  releaseYear: ReleaseYear;
}

interface TitleChartRankingResponse {
  data: {
    titleChartRankings: {
      edges: {
        node: {
          item: {
            id: string;
            primaryImage?: { url: string };
            titleText?: { text: string };
            releaseYear?: { year: number };
          };
        };
      }[];
    };
  };
}

interface MovieOverview {
  id: string;
  titleText: {
    text: string;
  };
  primaryImage?: {
    url: string;
  };
  plot?: {
    plotText?: {
      plainText: string;
    };
  };
  ratingsSummary?: {
    aggregateRating: number;
    voteCount: number;
  };
  releaseYear?: {
    year: number;
  };
}




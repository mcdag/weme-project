import React from 'react';
import './styles.scss';

interface IProps {
  title: string;
  subtitle1: string;
  subtitle2: string
}

function TitleAndSubtitle({ title, subtitle1, subtitle2 }: IProps) {
  return (
    <div className="title-subtitle">
      <p className="title">
        {title}
        <p className="subtitle"> 
          {subtitle1}
          <p className="subtitle-2"> 
            {subtitle2}
          </p>
        </p>
      </p>
    </div>
  );
};

export default TitleAndSubtitle;
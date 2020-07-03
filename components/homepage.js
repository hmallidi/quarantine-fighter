import React from 'react';

function HomepageImage() {
  const url = 'https://www.statnews.com/wp-content/uploads/2020/02/Coronavirus-CDC.jpg';
  return (
    <img src={url} style={{width: 650}} alt='COVID FIGHTER' />
  );
}

export default HomepageImage;
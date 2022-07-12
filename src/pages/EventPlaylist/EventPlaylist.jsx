import React from 'react';
import { Column } from '@ant-design/charts';

export default function page() {
  const data = [
    { song: 'a', rank: 3 },
    { song: 'b', rank: 4 },
    { song: 'c', rank: 3.5 },
    { song: 'd', rank: 5 },
    { song: 'e', rank: 4.9 },
    { song: 'f', rank: 6 },
    { song: 'g', rank: 7 },
    { song: 'h', rank: 9 },
    { song: 'i', rank: 13 },
  ];

  const config = {
    data,
    xField: 'song',
    yField: 'rank',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return <Column {...config} />;
};
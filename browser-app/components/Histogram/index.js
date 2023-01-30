import dynamic from 'next/dynamic';

const Histogram = dynamic(() => import('./Histogram'), {
  ssr: false
});

export default Histogram;


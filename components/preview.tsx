'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill/dist/quill.bubble.css';

const Preview = ({ value }: { value: string }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  return <ReactQuill theme="bubble" value={value} readOnly />;
};

export default Preview;

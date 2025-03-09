import React, { useState, useEffect } from 'react';

const TextTyping = () => {
  const texts = [
    "Muhammad Adistia Pratama (X SIJA 2)",
    "Wahyu Andhika Rahadi (XI SIJA 1)"
  ];
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const currentText = texts[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentText.substring(0, text.length + 1));
        if (text === currentText) {
          setIsDeleting(true);
          setSpeed(500); 
        } else {
          setSpeed(100); 
        }
      } else {
        setText(currentText.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((index + 1) % texts.length);
          setSpeed(100);
        } else {
          setSpeed(50);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, index, isDeleting, speed, texts]);

  return (
    <span>
      {text}
      <span className="ml-1 border-r-2 border-gray-800 animate-blink"></span>
    </span>
  );
};

export default TextTyping;
import { useState, useEffect } from 'react';

const facts = [
  "Cats have 32 muscles in each ear.",
  "A group of cats is called a clowder.",
  "Cats sleep for 70% of their lives.",
  "The first cat in space was French.",
  "Cats can make over 100 vocal sounds.",
  "A cat's nose has a unique pattern like a fingerprint.",
  "Cats walk like camels and giraffes (right limbs move together).",
  "Domestic cats spend about 50% of their day grooming.",
  "The oldest known cat lived 38 years.",
  "Cats have whiskers on their legs too.",
];

export const useCatFact = () => {
  const [fact, setFact] = useState('');
  const refreshFact = () => {
    const random = facts[Math.floor(Math.random() * facts.length)];
    setFact(random);
  };
  useEffect(() => {
    refreshFact();
  }, []);
  return { fact, refreshFact };
};
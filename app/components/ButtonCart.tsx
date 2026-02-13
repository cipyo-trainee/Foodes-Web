import React from 'react';
import { Button } from '@heroui/react';
import confetti from 'canvas-confetti';

const CustomButton = () => {
  const handleConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <Button
      disableRipple
       className="rounded-lg border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
      size="lg"
      onPress={handleConfetti}
    >
  appy Coupon
    </Button>
  );
};

export default CustomButton;

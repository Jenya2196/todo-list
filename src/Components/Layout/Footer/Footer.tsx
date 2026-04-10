import { Github } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <div className="h-full w-full text-center">
      <a
        href="https://github.com/Jenya2196"
        className="flex items-end justify-center hover:text-blue-500"
      >
        <Github />
        GitHub
      </a>
    </div>
  );
}

export default Footer;

import { Github } from 'lucide-react';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <div className="w-full h-full text-center">
      <a
        href="https://github.com/Jenya2196"
        className="hover:text-blue-500 flex items-end justify-center"
      >
        <Github />
        GitHub
      </a>
    </div>
  );
}

export default Footer;

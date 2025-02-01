"use client";
import { Rating } from 'semantic-ui-react';

export default function Home() {
  return (
    <div>
      <main>
        <Rating icon='star' defaultRating={3} maxRating={4} />
        main
      </main>
    </div>
  );
}

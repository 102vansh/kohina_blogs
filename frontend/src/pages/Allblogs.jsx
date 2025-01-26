import React from 'react'

export const Allblogs = () => {
  return (
    <div class="p-8 prose dark:prose-invert">
    <h1 class="text-xl font-bold">Couldn't find any HTML, LLM Response:</h1>
    <div class="max-w-xl mx-auto p-4 bg-card rounded-lg shadow-md">
      <div class="flex items-center mb-4">
        <img class="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User Avatar" />
        <div class="ml-3">
          <h2 class="text-lg font-semibold">Holo D. Wisewolf</h2>
          <p class="text-sm text-muted-foreground">Posted 3m ago</p>
        </div>
      </div>
      <p class="text-base text-foreground mb-4">
        I’ve been struggling with severe headaches for years, but recently I’ve found some relief with thanks to Doc Nightingale A.I.! 🎉🎉
        <span class="text-accent">#goodbyeheadache #nightingalerocks</span>
      </p>
      <img class="w-full rounded-lg mb-4" src="https://placehold.co/600x400" alt="Blog Image" />
      <div class="flex justify-between items-center text-muted-foreground">
        <span>5,874 views 🌟</span>
        <span>215 likes 👍</span>
        <span>11 comments 💬</span>
      </div>
      <button class="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded">Save</button>
    </div>
  </div>
  )
}

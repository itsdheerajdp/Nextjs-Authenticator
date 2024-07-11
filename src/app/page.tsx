import React from "react";
export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <div className="m-24">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/login">Login</a>  
            </li>
            <li>
              <a href="/signup">Signup</a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center mb-8">Authorization using Next.js</h1>
      </div>
    </main>
  );
}
     
    
      
    
 

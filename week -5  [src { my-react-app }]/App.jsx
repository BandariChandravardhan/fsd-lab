import { useState } from "react";
 
function App() {
  // 1. Storage for Post 1
  const [title1, setTitle1] = useState("My First Post");
  const [body1, setBody1] = useState("React is easy.");

  // 2. Storage for Post 2
  const [title2, setTitle2] = useState("My Second Post");
  const [body2, setBody2] = useState("Learning is fun.");

  return ( 
    <div>
      {/* BLOG FEED */}
      <h1>My Simple Blog</h1>

      <div>
        <h3>{title1}</h3>
        <p>{body1}</p>
      </div>

      <div>
        <h3>{title2}</h3>
        <p>{body2}</p>
      </div>

      <hr />

      {/* EDITING FORMS */}
      <h2>Change Blog Text:</h2>

      <p>Edit Post 1 Title:</p>
      <input type="text" value={title1} onChange={(e) => setTitle1(e.target.value)} />
      
      <p>Edit Post 1 Content:</p>
      <input type="text" value={body1} onChange={(e) => setBody1(e.target.value)} />

      <p>Edit Post 2 Title:</p>
      <input type="text" value={title2} onChange={(e) => setTitle2(e.target.value)} />
      
      <p>Edit Post 2 Content:</p>
      <input type="text" value={body2} onChange={(e) => setBody2(e.target.value)} />
    </div>
  );
}

export default App;

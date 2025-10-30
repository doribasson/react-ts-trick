// App.tsx
import React from 'react';
import FileTree from './components/FileTree';

const App: React.FC = () => {
  return (
    <div className="p-4 font-mono text-sm">
      <h1 className="text-lg font-bold mb-4">📂 Smart File Tree</h1>
      <FileTree />
    </div>
  );
};

export default App;












// // App.tsx
// import React from 'react';
// import FileTree from './components/FileTree';
// import { NodeData } from './types';

// const root: NodeData = {
//   SH: 'SH1',
//   SHNUM: '000',
//   FILE_TYPE: 'FOLDER',
//   NAME: 'Root',
// };

// const App: React.FC = () => {
//   return (
//     <div className="p-4 font-mono text-sm">
//       <h1 className="text-lg font-bold mb-4">📂 Smart File Tree</h1>
//       <FileTree root={root} />
//     </div>
//   );
// };

// export default App;

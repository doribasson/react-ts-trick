// api.ts
import { NodeData } from './types';

const mockDB: Record<string, NodeData[]> = {
  SH1: [
    { SH: 'SH2', SHNUM: '001', FILE_TYPE: 'FOLDER', NAME: 'src' },
    { SH: 'SH3', SHNUM: '002', FILE_TYPE: 'FILE', NAME: 'readme.md' },
  ],
  SH2: [
    { SH: 'SH4', SHNUM: '003', FILE_TYPE: 'FILE', NAME: 'App.tsx' },
    { SH: 'SH5', SHNUM: '004', FILE_TYPE: 'FOLDER', NAME: 'components' },
  ],
  SH5: [
    { SH: 'SH6', SHNUM: '005', FILE_TYPE: 'FOLDER', NAME: 'antoher Folder' },
  ],
  SH6: [
    { SH: 'SH7', SHNUM: '006', FILE_TYPE: 'FILE', NAME: 'Header.tsx' },
  ]
};

export async function fetchChildren(SH: string): Promise<NodeData[]> {
  console.log(`📡 Fetching children for ${SH}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDB[SH] || []), 500);
  });
}



// // Simulate async API call
// export async function fetchChildren(SH: string): Promise<NodeData[]> {
//   try {
//     console.log(`📡 Fetching children for: ${SH}`);

//     // simulate API delay
//     await new Promise((resolve) => setTimeout(resolve, 600));

//     const data = mockDB[SH];

//     if (!data) {
//       throw new Error(`No data found for key ${SH}`);
//     }

//     return data;
//   } catch (err) {
//     console.error('❌ Error in fetchChildren:', err);
//     throw err; // rethrow so UI can handle
//   }
// }

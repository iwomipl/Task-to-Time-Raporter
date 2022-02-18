/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

// import type {Config} from '@jest/types';
//
// // // Sync object
// // const config: Config.InitialOptions = {
// //     verbose: true,
// // };
// // export default config;
//
// // Or async function
// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     verbose: true,
//   };
// };
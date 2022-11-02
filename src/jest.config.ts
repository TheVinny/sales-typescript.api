import { pathsToModuleNameMapper } from 'ts-jest';
import ts from '../tsconfig.json';

export default {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(ts.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

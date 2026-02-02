import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier';

// 1. 새 플러그인 임포트
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    // 2. extends 부분에 각 플러그인의 권장 설정 추가
    extends: [
      js.configs.recommended,
      reactHooks.configs.recommended, // 최근 버전은 .flat 제외하기도 함
      reactRefresh.configs.vite,
      react.configs.flat.recommended, // react 플러그인 권장 설정
      react.configs.flat['jsx-runtime'], // React 17+ 환경 필수
      jsxA11y.flatConfigs.recommended, // 접근성 권장 설정
      eslintConfigPrettier, // Prettier와 충돌하는 규칙 비활성화
    ],
    // 3. 플러그인 명시 및 설정
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' }, // 4. React 버전 자동 감지 설정
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      
      // 5. import 관련 규칙 직접 추가 (import 플러그인은 아직 flat config 용 extends가 불안정할 수 있음)
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
])
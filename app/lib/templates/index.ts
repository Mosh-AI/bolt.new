export interface Template {
  name: string;
  files: Record<string, string>;
}

export const templates: Record<string, Template> = {
  astro: {
    name: 'Astro',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'astro-app',
          type: 'module',
          scripts: {
            dev: 'astro dev',
            build: 'astro build',
            start: 'node ./dist'
          }
        },
        null,
        2
      ) + '\n',
      'README.md': '# Astro Starter Kit\n'
    }
  },
  nextjs: {
    name: 'Next.js',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'next-app',
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start'
          }
        },
        null,
        2
      ) + '\n',
      'README.md': '# Next.js Starter Kit\n'
    }
  },
  svelte: {
    name: 'Svelte',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'svelte-app',
          scripts: {
            dev: 'svelte-kit dev',
            build: 'svelte-kit build',
            preview: 'svelte-kit preview'
          }
        },
        null,
        2
      ) + '\n',
      'README.md': '# Svelte Starter Kit\n'
    }
  }
};

import { webcontainer } from '../webcontainer';
import { WORK_DIR } from '~/utils/constants';

export async function applyTemplate(name: keyof typeof templates) {
  const template = templates[name];
  if (!template) {
    throw new Error(`Unknown template: ${name}`);
  }

  const wc = await webcontainer;
  for (const [filePath, content] of Object.entries(template.files)) {
    await wc.fs.writeFile(`${WORK_DIR}/${filePath}`, content);
  }
}

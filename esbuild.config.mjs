import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

const isWatch = process.argv.includes('--watch');

const shared = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: isWatch,
    external: ['react', 'react-dom'],
};

const builds = [
    // CJS build
    esbuild.build({
        ...shared,
        format: 'cjs',
        outfile: 'dist/index.js',
    }),
    // ESM build
    esbuild.build({
        ...shared,
        format: 'esm',
        outfile: 'dist/index.mjs',
    }),
    // CSS
    esbuild.build({
        entryPoints: ['src/styles/style.scss'],
        bundle: true,
        minify: true,
        sourcemap: isWatch,
        outdir: 'dist/styles',
        plugins: [sassPlugin()],
    }),
];

if (isWatch) {
    const ctx = await esbuild.context({
        ...shared,
        entryPoints: ['src/styles/style.scss', 'src/index.ts'],
        outdir: 'dist',
        format: 'esm',
        plugins: [sassPlugin()],
    });
    await ctx.watch();
    console.log('Watching for changes...');
} else {
    await Promise.all(builds);
    console.log('Build complete.');
}
